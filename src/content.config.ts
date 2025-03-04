// content.config.ts

import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { rssSchema } from '@astrojs/rss'

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      thumbnail: image(),
      date: z.coerce.date(),
      excerpt: z.string().optional(),
    }),
});

const rss = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/posts" }),
  schema: rssSchema,
});

export const collections = { posts, rss };
