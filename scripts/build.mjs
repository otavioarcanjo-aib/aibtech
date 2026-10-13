import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderContentPage } from '../worker/content-pages.ts';
import { renderProductPage, productPages } from '../worker/product-pages.ts';
import { applySeo } from '../worker/seo.ts';

const origin = new URL(process.env.SITE_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'aibtech.vercel.app'}`).origin;
const out = resolve('dist');
await mkdir(out, { recursive: true });
await cp('public', out, { recursive: true, filter: source => source !== 'public/aib.html' });
const home = (await readFile('public/aib.html', 'utf8'))
  .replaceAll('__AIB_PHOTO_ANALYSIS__', '/images/aib-analise-tela.webp')
  .replaceAll('__AIB_GRAPHISM__', '/images/aib-grafismo-1-1.png')
  .replaceAll('__SITE_ORIGIN__', origin);
const pages = new Map([['/', home]]);
for (const path of ['/solucoes', '/insights']) pages.set(path, renderContentPage(path, home, origin));
for (const slug of Object.keys(productPages)) pages.set(`/produtos/${slug}`, renderProductPage(slug, origin));
for (const [path, html] of pages) {
  if (!html) throw new Error(`Missing page: ${path}`);
  const target = resolve(out, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  await mkdir(resolve(target, '..'), { recursive: true });
  await writeFile(target, applySeo(html, path, origin));
}
await writeFile(resolve(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.keys()].map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
await writeFile(resolve(out, '404.html'), '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página não encontrada | aiB</title><body style="font-family:Arial,sans-serif;padding:10vh 8vw;color:#10245a;background:#f3f6fb"><h1>Página não encontrada.</h1><p><a href="/">Voltar para o aiB</a></p></body></html>');
console.log(`Built ${pages.size} pages for ${origin}`);
