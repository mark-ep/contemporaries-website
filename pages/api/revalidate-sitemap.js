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

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const allItems = [];
  const limit = 10000;
  let offset = 0;

  while (true) {
    const apiUrl = `${process.env.API_ROOT}links/?count=${limit}&index=${offset}`;
    const result = await fetch(apiUrl);
    if (!result.ok) throw new Error(`Failed to fetch ${apiUrl}`);
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

  // Bust Vercel's CDN cache by rewriting the public file
  // and returning fresh headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(generateSitemap(urls));
  res.end();
}