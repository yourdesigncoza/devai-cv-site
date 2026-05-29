import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const COLLECTIONS = [
  'method',
  'services',
  'case-studies',
  'audiences',
  'skills',
  'projects',
  'decisions',
  'playbooks',
  'influences',
  'notes',
  'open-questions',
  'about',
] as const;

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function resolveHref(target: string): string {
  let t = target.trim().replace(/\\/g, '/').replace(/\.md$/i, '');
  if (t === 'index') return '/';
  if (t.endsWith('/index')) t = t.slice(0, -'/index'.length);
  if (t.endsWith('/')) t = t.slice(0, -1);
  if (!t.startsWith('/')) t = '/' + t;
  return t;
}

export const GET: APIRoute = async () => {
  const nodes: Array<{ id: string; title: string; collection: string; tags: string[] }> = [];
  const seen = new Map<string, (typeof nodes)[number]>();

  const addNode = (n: (typeof nodes)[number]) => {
    if (seen.has(n.id)) return;
    nodes.push(n);
    seen.set(n.id, n);
  };

  addNode({ id: '/', title: 'Home', collection: 'home', tags: ['home'] });

  for (const c of COLLECTIONS) {
    const entries = await getCollection(c as (typeof COLLECTIONS)[number]);
    for (const e of entries) {
      if (e.data.draft) continue;
      const url = e.id === 'index' ? `/${c}` : `/${c}/${e.id}`;
      addNode({
        id: url,
        title: e.data.title,
        collection: c,
        tags: e.data.tags ?? [],
      });
    }
  }

  const sectionIndexes: Array<readonly [string, string]> = [
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['decisions', 'Decisions'],
    ['services', 'Services'],
    ['case-studies', 'Case studies'],
    ['audiences', 'Audiences'],
  ];
  for (const [c, title] of sectionIndexes) {
    addNode({ id: `/${c}`, title, collection: c, tags: [c, 'index'] });
  }

  const links: Array<{ source: string; target: string }> = [];
  const edgeKey = new Set<string>();

  for (const c of COLLECTIONS) {
    const entries = await getCollection(c as (typeof COLLECTIONS)[number]);
    for (const e of entries) {
      if (e.data.draft) continue;
      const sourceUrl = e.id === 'index' ? `/${c}` : `/${c}/${e.id}`;
      const body = (e as { body?: string }).body ?? '';
      WIKILINK_RE.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = WIKILINK_RE.exec(body)) !== null) {
        const targetUrl = resolveHref(m[1]);
        if (!seen.has(targetUrl)) continue;
        if (targetUrl === sourceUrl) continue;
        const key = `${sourceUrl}|${targetUrl}`;
        if (edgeKey.has(key)) continue;
        edgeKey.add(key);
        links.push({ source: sourceUrl, target: targetUrl });
      }
    }
  }

  return new Response(JSON.stringify({ nodes, links }, null, 0), {
    headers: { 'Content-Type': 'application/json' },
  });
};
