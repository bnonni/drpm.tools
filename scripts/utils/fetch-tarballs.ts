import fs from 'fs';
import path from 'path';
import https from 'https';
import packageMetadata from './tool5-npmjs-metadata.json';

interface PackageMetadata {
    [key: string]: any;
    versions: {
        [version: string]: {
        dist: {
            tarball: string;
        };
        };
    };
}

// Mock data, replace this with actual JSON data you receive
const packageJson: PackageMetadata = packageMetadata;

// Create download directory
const downloadDir = './scripts/utils/npks/tool5';
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

// Function to download file
const downloadFile = (url: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

// Iterate over each version and download the tarball
(async () => {
  for (const [version, { dist }] of Object.entries(packageJson.versions)) {
    const tarballUrl = dist.tarball;
    const filename = path.join(downloadDir, `tool5-${version}.tgz`);

    console.log(`Downloading ${tarballUrl}...`);
    try {
      await downloadFile(tarballUrl, filename);
      console.log(`Downloaded ${filename}`);
    } catch (error) {
      console.error(`Failed to download ${tarballUrl}:`, error);
    }
  }
})();
