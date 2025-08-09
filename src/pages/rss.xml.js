import { getPosts } from '../lib/wp.js';

export async function GET() {
  const site = import.meta.env.SITE_URL || 'https://example.com';
  const name = import.meta.env.SITE_NAME || 'News Site';
  const postsResp = await getPosts({ first: 30 });
  const posts = postsResp.nodes;
  const items = posts.map(p => `
    <item>
      <title>${p.title.replace(/<[^>]+>/g,'')}</title>
      <link>${site}/${p.slug}/</link>
      <guid>${site}/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt || ''}]]></description>
    </item>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${name}</title>
        <link>${site}</link>
        <description>${name} RSS</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
