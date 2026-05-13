// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import remarkWikilinks from './src/lib/remark-wikilinks.mjs';
import remarkExternalLinks from './src/lib/remark-external-links.mjs';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://devai.co.za',
  integrations: [mdx(), sitemap()],
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
