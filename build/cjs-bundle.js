import esbuild from 'esbuild';
import packageJson from '../package.json' assert { type: 'json' };

// create list of dependencies that we _do not_ want to include in our bundle
const excludeList = [];
for (const dependency in packageJson.dependencies) {
  excludeList.push(dependency);
}

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  external: excludeList,
  format: 'cjs',
  sourcemap: true,
  platform: 'node',
  outfile: 'dist/cjs/index.js',
  allowOverwrite: true
});