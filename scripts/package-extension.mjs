import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { zipSync } from 'fflate';

const root = resolve(import.meta.dirname, '..');
const extensionDir = resolve(root, '.output/chrome-mv3');
const distExtension = resolve(root, 'dist/extension');
const downloadsDir = resolve(root, 'site/public/downloads');
const archivePath = resolve(downloadsDir, 'reading-comfort-profiles-chrome.zip');

if (!existsSync(resolve(extensionDir, 'manifest.json'))) {
  throw new Error('Extension build is missing. Run `npm run build:extension` first.');
}

rmSync(distExtension, { recursive: true, force: true });
mkdirSync(resolve(root, 'dist'), { recursive: true });
cpSync(extensionDir, distExtension, { recursive: true });
mkdirSync(downloadsDir, { recursive: true });

const files = {};
for (const path of walk(extensionDir)) {
  const archiveName = relative(extensionDir, path).split(sep).join('/');
  files[archiveName] = new Uint8Array(readFileSync(path));
}
writeFileSync(archivePath, zipSync(files, { level: 9 }));

function* walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = resolve(directory, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}
