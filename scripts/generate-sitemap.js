const fs = require('node:fs');
const path = require('node:path');

const generateSitemap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

async function main() {
  const allItems = [];
  const limit = 10000;
  let offset = 0;

  while (true) {
    const apiUrl = `${process.env.API_ROOT}links/?count=${limit}&index=${offset}`;
    const result = await fetch(apiUrl);
    if (!result.ok) throw new Error(`Failed to fetch ${apiUrl}: ${result.statusText}`);
    const data = await result.json();
    allItems.push(...data);
    if (data.length < limit) break;
    offset += data.length;
  }

  const baseUrl = 'https://contemporariesnetwork.com';
  const urls = [
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/dashboard`,
    ...allItems.map(item => `${baseUrl}${item}`)
  ];

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    generateSitemap(urls)
  );

  console.log('Sitemap generated successfully');
}

main();