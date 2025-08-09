import { getPosts } from '../lib/wp.js';

export async function GET() {
  const site = import.meta.env.SITE_URL || 'https://example.com';
  const postsResp = await getPosts({ first: 100 });
  const posts = postsResp.nodes;
  const urls = posts.map(p => `<url><loc>${site}/${p.slug}/</loc><changefreq>hourly</changefreq></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${site}/</loc><changefreq>hourly</changefreq></url>
      ${urls}
    </urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
