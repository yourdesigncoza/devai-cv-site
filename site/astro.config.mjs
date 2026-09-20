// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
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
/**
 * Make every redirect tolerate a trailing slash.
 *
 * `@astrojs/vercel` compiles each entry in `redirects` to an anchored regex with no
 * slash, `^/method$`, while this site serves and Google indexed every URL with one.
 * Astro cannot express both forms: registering them collides, and `trailingSlash`
 * makes it worse by adding a 308 that runs before the 301s. So rewrite the compiled
 * output. Only status-301 routes are touched, and the transform is idempotent.
 */
function redirectsTolerateTrailingSlash() {
  const CONFIG = '.vercel/output/config.json';
  return {
    name: 'redirects-tolerate-trailing-slash',
    hooks: {
      'astro:build:done': () => {
        if (!existsSync(CONFIG)) {
          throw new Error(
            `${CONFIG} not found. The Vercel adapter should have written it before this ` +
              'hook; if its build order changed, every redirect here is silently broken.',
          );
        }
        const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
        let patched = 0;
        for (const route of config.routes ?? []) {
          if (
            route.status === 301 &&
            typeof route.src === 'string' &&
            route.src.endsWith('$') &&
            !route.src.endsWith('/?$')
          ) {
            route.src = `${route.src.slice(0, -1)}/?$`;
            patched += 1;
          }
        }
        writeFileSync(CONFIG, JSON.stringify(config));
        console.log(`[redirects] ${patched} redirects now accept a trailing slash`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://devai.co.za',
  /**
   * The writing moved to yourdesign.co.za on 2026-09-20. See
   * ../yourdesigncoza-marketing/seo-content/03-devai-split.md for the reasoning:
   * this site narrows to EdenFintech and the quant work, and the development,
   * method and playbook material belongs where the client work is marketed.
   *
   * Registered without trailing slashes. Do not add the slashed form as well:
   * Astro normalises the two to one route and warns about a collision. The
   * integration below widens the compiled regex instead, which is what actually
   * makes the indexed slashed URLs match.
   */
  redirects: Object.fromEntries(
    Object.entries({
      '/sitemap.xml': '/sitemap-index.xml',

      '/method': 'https://yourdesign.co.za/notes/living-research-graphs/',
      '/method/build-the-harness-not-just-prompts': 'https://yourdesign.co.za/notes/build-the-harness-not-just-prompts/',
      '/method/contradictions-are-findings': 'https://yourdesign.co.za/notes/contradictions-are-findings/',
      '/method/evidence-grade-on-every-claim': 'https://yourdesign.co.za/notes/evidence-grade-on-every-claim/',
      '/method/finds-its-own-blind-spots': 'https://yourdesign.co.za/notes/a-research-tool-that-finds-its-own-blind-spots/',
      '/method/knowing-when-to-stop': 'https://yourdesign.co.za/notes/knowing-when-to-stop/',
      '/method/llms-behind-typed-contracts': 'https://yourdesign.co.za/notes/llms-behind-typed-contracts/',
      '/method/postgres-is-the-spine': 'https://yourdesign.co.za/notes/postgres-is-the-spine/',
      '/method/why-ai-projects-die-after-the-demo': 'https://yourdesign.co.za/notes/why-ai-projects-die-after-the-demo/',
      '/method/wikilinks-are-the-product': 'https://yourdesign.co.za/notes/wikilinks-are-the-product/',

      '/decisions/llms-behind-typed-adapters': 'https://yourdesign.co.za/notes/llms-behind-typed-adapters/',
      '/decisions/postgres-alongside-wordpress': 'https://yourdesign.co.za/notes/postgres-alongside-wordpress/',
      '/decisions/publishing-negative-results': 'https://yourdesign.co.za/notes/publishing-negative-results/',
      '/decisions/ship-the-feedback-loop': 'https://yourdesign.co.za/notes/ship-the-feedback-loop/',

      '/playbooks/adversarial-ai-review': 'https://yourdesign.co.za/notes/adversarial-ai-review/',
      '/playbooks/client-friendly-translations': 'https://yourdesign.co.za/notes/client-friendly-translations/',
      '/playbooks/file-driven-planning': 'https://yourdesign.co.za/notes/file-driven-planning/',
      '/playbooks/knowledge-graph-vault': 'https://yourdesign.co.za/notes/knowledge-graph-vault/',
      '/playbooks/playwright-wordpress': 'https://yourdesign.co.za/notes/playwright-wordpress/',

      // Batch 2, 2026-09-20. These pitched the buyers yourdesign.co.za sells to,
      // which is the muddle the identity rule exists to prevent. Their copy is kept
      // in ../yourdesigncoza-marketing/seo-content/source/2026-09-20-devai-batch2/.
      '/audiences/business-owners': 'https://yourdesign.co.za/services/',
      '/audiences/agencies': 'https://yourdesign.co.za/services/',
      '/services/ai-for-agencies': 'https://yourdesign.co.za/services/',
      '/services/knowledge-portals': 'https://yourdesign.co.za/notes/knowledge-graph-vault/',
      '/services/research-graphs': 'https://yourdesign.co.za/notes/living-research-graphs/',
      '/services/agentic-pipelines': 'https://yourdesign.co.za/notes/llms-behind-typed-contracts/',
    }),
  ),
  integrations: [
    mdx(),
    redirectsTolerateTrailingSlash(),
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
