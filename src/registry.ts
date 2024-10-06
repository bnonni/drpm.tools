import express, { Request, Response } from 'express';
import { fetchDPK } from './dpm.js';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { x } from 'tar';

const app = express();
const port = 2092;
const packagesDir = join(process.cwd(), 'packages'); // Directory to store package tarballs

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  console.log('app.get(/)');
  res.status(200).send({'ok': true});
});
// app.post('/registry', async (req: Request, res: Response) => {
//   const { dpk } = req.body;
//   if (typeof dpk === 'string') {
//     const [did, nameVersion] = dpk.split('/');
//     const [name, version = 'latest'] = nameVersion.split('@');
//     const dpkStream = await fetchDPK(did.replace('@did', ''), name, version);
//     res.setHeader('Content-Type', 'application/gzip');
//     res.setHeader('Content-Disposition', `attachment; filename="${name}.tgz"`);
//     await pipeline(dpkStream, res);
//   } else {
//     res.status(400).send('Invalid body: Expected { dpk: "@did:(dht|web):.*" }');
//   }
// });
app.get('/:scope/:name', async (req: Request, res: Response) => {
  console.log('app.get(/:scope/:name)');
  const { scope, name } = req.params;

  try {
    const packageMetadataPath = join(packagesDir, `@${scope}`, name, 'metadata.json');

    // Check if metadata exists; if not, fetch it
    if (!existsSync(packageMetadataPath)) {
      // Assuming latest version by default for simplicity
      await fetchAndCachePackage(`@${scope}/${name}@latest`);
    }

    const metadata = readFileSync(packageMetadataPath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.parse(metadata));
  } catch (error) {
    console.error('Error fetching package metadata:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Serve package tarball
app.get('/:scope/:name/-/:name-:version.tgz', async (req: Request, res: Response) => {
  const { scope, name, version } = req.params;
  console.log('app.get(/:scope/:name/-/:name-:version.tgz)');
  try {
    const tarballPath = join(packagesDir, `@${scope}`, name, `${name}-${version}.tgz`);

    // Check if tarball exists; if not, fetch it
    if (!existsSync(tarballPath)) {
      await fetchAndCachePackage(`@${scope}/${name}@${version}`);
    }

    if (!existsSync(tarballPath)) {
      return res.status(404).send({ error: 'Package tarball not found' });
    }

    res.setHeader('Content-Type', 'application/gzip');
    const readStream = createReadStream(tarballPath);
    await pipeline(readStream, res);
  } catch (error) {
    console.error('Error fetching package metadata:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// POST /registry endpoint to manually fetch and cache a package
app.post('/registry', async (req: Request, res: Response) => {
  console.log('app.post(/registry)');
  const { dpk } = req.body;

  if (typeof dpk !== 'string') {
    res.status(400).send('Invalid body: Expected { dpk: "@did:(dht|web):.*" }');
    return;
  }

  try {
    await fetchAndCachePackage(dpk);
    res.status(200).send(`Package ${dpk} fetched and cached successfully.`);
  } catch (error) {
    console.error('Error fetching or storing the DPK:', error);
    res.status(500).send('Server error while fetching or storing the DPK.');
  }
});

// Helper function to fetch and cache the package using fetchDPK
async function fetchAndCachePackage(dpk: string) {
  const [_, did, nameVersion] = dpk.split('/');
  const [name, version = 'latest'] = nameVersion.split('@');

  // Fetch the package tarball stream
  const dpkStream = await fetchDPK(did, name, version);

  // Store tarball in the packages directory
  const packageDir = join(packagesDir, '@dpk', did, name);
  mkdirSync(packageDir, { recursive: true });
  const tarballPath = join(packageDir, `${name}-${version}.tgz`);
  await pipeline(dpkStream, createWriteStream(tarballPath));

  const tempExtractPath = join(packageDir, 'temp_extract');
  mkdirSync(tempExtractPath, { recursive: true });
  await x({
    file : tarballPath,
    cwd  : tempExtractPath,
  });
  const packageJsonPath = join(tempExtractPath, 'package', 'package.json');
  if (!existsSync(packageJsonPath)) {
    throw new Error(`Invalid package: package.json is missing in ${dpk}`);
  }
  // Create metadata for the package
  const metadata = {
    name : `@${did}/${name}`,
    version,
    dist : {
      tarball : `http://localhost:${port}/${did}/${name}/-/${name}-${version}.tgz`
    }
  };
  writeFileSync(join(packageDir, 'metadata.json'), JSON.stringify(metadata));
  rmSync(tempExtractPath, { recursive: true, force: true });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
