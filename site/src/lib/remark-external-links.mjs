import { visit } from 'unist-util-visit';

const EXTERNAL_RE = /^https?:\/\//i;

export default function remarkExternalLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (typeof node.url !== 'string' || !EXTERNAL_RE.test(node.url)) return;
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.target = '_blank';
      node.data.hProperties.rel = 'noopener noreferrer';
    });
  };
}
