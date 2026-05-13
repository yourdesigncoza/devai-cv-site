import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

type FeedCollection = 'decisions' | 'playbooks' | 'notes' | 'open-questions';

const FEED_COLLECTIONS: FeedCollection[] = [
  'decisions',
  'playbooks',
  'notes',
  'open-questions',
];

export async function GET(context: APIContext) {
  const entriesPerCollection = await Promise.all(
    FEED_COLLECTIONS.map(async (name) => {
      const entries = (await getCollection(name)) as CollectionEntry<FeedCollection>[];
      return entries
        .filter((e) => !e.data.draft)
        .filter((e) => e.id !== 'index')
        .map((entry) => ({
          title: entry.data.title,
          description: entry.data.description ?? '',
          link: `/${name}/${entry.id}/`,
          pubDate: entry.data.date,
        }));
    }),
  );

  const items = entriesPerCollection
    .flat()
    .sort((a, b) => {
      const ad = a.pubDate?.getTime() ?? 0;
      const bd = b.pubDate?.getTime() ?? 0;
      return bd - ad;
    });

  return rss({
    title: 'DevAi: John Montgomery',
    description:
      'Decisions, playbooks, notes, and open questions from the working wiki behind EdenFintech.',
    site: context.site!,
    items,
  });
}
