import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Energy Tips articles, edited in Keystatic (collection `tips`).
const tips = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/tips' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = { tips };
