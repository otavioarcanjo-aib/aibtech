import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { productPages } from '../worker/product-pages.ts';
const paths = ['index.html', 'solucoes.html', 'insights.html', ...Object.keys(productPages).map(s => `produtos/${s}.html`)];
for (const path of paths) {
  const html = await readFile(resolve('dist', path), 'utf8');
  assert.equal((html.match(/<title>/g) || []).length, 1, path);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, path);
  assert.ok(html.includes('og-aib-share-v3.jpg'), path);
  assert.ok(!/__AIB_|__SITE_ORIGIN__/.test(html), `Unresolved placeholder in ${path}`);
  assert.ok(!html.includes('pdi@aiacontext.com'), `Stale contact in ${path}`);
  for (const match of html.matchAll(/(?:src|poster|href)=["'](\/[^"'#?]*)["']/g)) {
    const ref = match[1];
    if (ref === '/' || ref.startsWith('//')) continue;
    await access(resolve('dist', ref.slice(1) + (/\.[a-z0-9]+$/i.test(ref) ? '' : '.html')));
  }
}
console.log(`Verified metadata and local links/assets on ${paths.length} pages.`);
