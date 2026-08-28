import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { relative, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist/site');
const workerPath = resolve(dist, 'sw.js');

const files = [...walk(dist)]
  .map((path) => `/${relative(dist, path).split(sep).join('/')}`)
  .filter((path) => path !== '/sw.js' && path !== '/staticwebapp.config.json' && !path.startsWith('/downloads/'))
  .sort();

const routeAliases = ['/demo/', '/privacy/', '/terms/'];
const precache = [...new Set(['/', ...routeAliases, ...files])];
const source = readFileSync(workerPath, 'utf8');
if (!source.includes('__PRECACHE_MANIFEST__')) throw new Error('Service-worker manifest token is missing.');
if (!source.includes('__CACHE_VERSION__')) throw new Error('Service-worker cache token is missing.');
const cacheVersion = createHash('sha256').update(JSON.stringify(precache)).digest('hex').slice(0, 12);
writeFileSync(workerPath, source
  .replace('__PRECACHE_MANIFEST__', JSON.stringify(precache))
  .replace('__CACHE_VERSION__', cacheVersion));

function* walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = resolve(directory, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}
