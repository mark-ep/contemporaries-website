import fs from 'node:fs';
import path from 'node:path';


const generateSitemap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`

export async function getStaticProps({ res }) {
  const allItems = [];
  const limit = 1000;
  let offset = 0;

  while (true) {
    const apiUrl = `${process.env.API_ROOT}links/?count=${limit}&index=${offset}`;
    const result = await fetch(
      apiUrl
    );

    if (!result.ok) throw new Error(`Failed to fetch ${apiUrl}: ${result.statusText}`);

    const data = await result.json();

    allItems.push(...data);

    if (data.length < limit) break;

    offset += data.length;
    console.log(`Fetched ${offset} items...`);
  }

  const baseUrl = 'https://contemporariesnetwork.com'
  // Add all your URLs here
  const urls = [
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/dashboard`,
    ...allItems.map(item => `${baseUrl}/${item}`)
  ]

  const sitemap = generateSitemap(urls)

  // Write to /public so Next.js serves it as a static file
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

  return {
    props: { },
    revalidate: 60 * 60 * 24, // Revalidate once a day
  };
}

export default function Sitemap() { return null }