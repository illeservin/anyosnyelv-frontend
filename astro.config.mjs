import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
// Static export + Vercel adapter (simple + fast). Rebuild is triggered via Vercel Build Hook from WordPress.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: process.env.SITE_URL || 'https://example.com',
});
