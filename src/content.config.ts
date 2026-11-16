import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    period: z.string(),
    featured: z.boolean().default(true),
    order: z.number().default(10),
    metrics: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    architectureSummary: z.string(),
    coverImage: z.string(),
    coverAlt: z.string(),
  }),
});

export const collections = { projects };
