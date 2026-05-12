import { visit } from 'unist-util-visit';

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function resolveHref(target) {
  let t = target.trim().replace(/\\/g, '/').replace(/\.md$/i, '');
  if (t === 'index') return '/';
  if (t.endsWith('/index')) t = t.slice(0, -'/index'.length);
  if (t.endsWith('/')) t = t.slice(0, -1);
  if (!t.startsWith('/')) t = '/' + t;
  return t;
}

function defaultLabel(target) {
  const t = target.trim().replace(/\.md$/i, '').replace(/\/$/, '').replace(/\/index$/, '');
  const last = t.split('/').pop();
  return last || t;
}

export default function remarkWikilinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const value = node.value;
      if (!value.includes('[[')) return;

      const newChildren = [];
      let lastIndex = 0;
      let match;
      WIKILINK_RE.lastIndex = 0;
      while ((match = WIKILINK_RE.exec(value)) !== null) {
        const [full, target, label] = match;
        if (match.index > lastIndex) {
          newChildren.push({ type: 'text', value: value.slice(lastIndex, match.index) });
        }
        const href = resolveHref(target);
        const text = (label ?? defaultLabel(target)).trim();
        newChildren.push({
          type: 'link',
          url: href,
          children: [{ type: 'text', value: text }],
        });
        lastIndex = match.index + full.length;
      }
      if (newChildren.length === 0) return;
      if (lastIndex < value.length) {
        newChildren.push({ type: 'text', value: value.slice(lastIndex) });
      }
      parent.children.splice(index, 1, ...newChildren);
      return index + newChildren.length;
    });
  };
}
