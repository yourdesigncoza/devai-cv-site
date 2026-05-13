// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import remarkWikilinks from './src/lib/remark-wikilinks.mjs';
import remarkExternalLinks from './src/lib/remark-external-links.mjs';

import sitemap from '@astrojs/sitemap';

function buildLastmodMap() {
  const base = path.resolve('./src/content');
  const map = new Map();
  const entries = readdirSync(base, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const fullPath = path.join(entry.parentPath ?? entry.path, entry.name);
    const content = readFileSync(fullPath, 'utf-8');
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    let date = null;
    if (fmMatch) {
      const dateMatch = fmMatch[1].match(/^date:\s*(.+)$/m);
      if (dateMatch) {
        const parsed = new Date(dateMatch[1].trim().replace(/^["']|["']$/g, ''));
        if (!Number.isNaN(parsed.getTime())) date = parsed;
      }
    }
    const lastmod = date ?? statSync(fullPath).mtime;
    const rel = path.relative(base, fullPath).replace(/\.md$/, '').replace(/\\/g, '/');
    let pathname;
    if (rel === 'index') pathname = '/';
    else if (rel.endsWith('/index')) pathname = '/' + rel.slice(0, -'index'.length);
    else pathname = '/' + rel + '/';
    map.set(pathname, lastmod);
  }

  const sectionLatest = new Map();
  for (const [pathname, lm] of map.entries()) {
    const m = pathname.match(/^(\/[^/]+\/)/);
    if (!m) continue;
    const prefix = m[1];
    if (prefix === pathname) continue;
    const existing = sectionLatest.get(prefix);
    if (!existing || lm > existing) sectionLatest.set(prefix, lm);
  }
  for (const [prefix, lm] of sectionLatest) {
    if (!map.has(prefix)) map.set(prefix, lm);
  }

  return map;
}

const lastmodByPath = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://devai.co.za',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        const lm = lastmodByPath.get(url.pathname);
        if (lm) item.lastmod = lm.toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkWikilinks, remarkExternalLinks],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
