import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wikiSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  status: z.string().optional(),
  date: z.coerce.date().optional(),
  order: z.number().optional(),
});

const makeCollection = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
    schema: wikiSchema,
  });

export const collections = {
  method: makeCollection('method'),
  services: makeCollection('services'),
  'case-studies': makeCollection('case-studies'),
  audiences: makeCollection('audiences'),
  skills: makeCollection('skills'),
  projects: makeCollection('projects'),
  decisions: makeCollection('decisions'),
  playbooks: makeCollection('playbooks'),
  influences: makeCollection('influences'),
  notes: makeCollection('notes'),
  'open-questions': makeCollection('open-questions'),
  about: makeCollection('about'),
};
