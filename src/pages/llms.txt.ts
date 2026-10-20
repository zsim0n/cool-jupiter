import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const lines = posts.map((p) => {
    const url = new URL(`blog/${p.id}`, site).href;
    return `- [${p.data.title}](${url})${p.data.excerpt ? `: ${p.data.excerpt}` : ''}`;
  });
  const body = `# Zoltan Simon – Things

> Architecture writing by Zoltan Simon: just-enough architecture, platforms and data mesh in regulated environments, and the architect as leader.

- [About](${new URL('me', site).href})

## Posts

${lines.join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
