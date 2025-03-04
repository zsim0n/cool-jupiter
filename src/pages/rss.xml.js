import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection("posts")).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return  rss({
    title: 'Things',
    description: 'Latest posts from zoltansimon.me',
    site: context.site?.toString() ? context.site?.toString() : "http://acme.org",
    items: posts.map((post) => ({
      link: `/blog/${post.id}`,
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt ? post.data.excerpt : "",
    })),
  })
}


