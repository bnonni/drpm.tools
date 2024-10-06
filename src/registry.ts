import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { fetchDPK } from './dpm.js';
import { pipeline } from 'stream/promises';

const app = express();
const port = 2092;

app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({'ok': true});
});
app.post('/registry', async (req: Request, res: Response) => {
  const { dpk } = req.body;
  if (typeof dpk === 'string') {
    const [did, nameVersion] = dpk.split('/');
    const [name, version = 'latest'] = nameVersion.split('@');
    const dpkStream = await fetchDPK(did.replace('@did', ''), name, version);
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', `attachment; filename="${name}.tgz"`);
    await pipeline(dpkStream, res);
  } else {
    res.status(400).send('Invalid body: Expected { dpk: "@did:(dht|web):.*" }');
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
