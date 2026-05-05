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

export async function getServerSideProps({ res }) {
  const allItems = [];
  const limit = 1000;
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

  const sitemap = generateSitemap(urls);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() { return null; }