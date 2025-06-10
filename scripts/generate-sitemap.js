import { writeFileSync } from 'fs';
import { tools, toolCategories } from '../src/data/tools.tsx';
const BASE_URL = 'https://seotooler.com';
const generateSitemap = () => {
    const urls = [
        { loc: BASE_URL, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1.0 },
        { loc: `${BASE_URL}/tools`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.9 },
        { loc: `${BASE_URL}/blog`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.8 },
    ];
    // Add tool category pages
    for (const categorySlug in toolCategories) {
        urls.push({
            loc: `${BASE_URL}/tools/${categorySlug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
        });
    }
    // Add tool pages
    tools.forEach(tool => {
        urls.push({
            loc: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: 0.7,
        });
    });
    const sitemapContent = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(url => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <changefreq>${url.changefreq}</changefreq>
          <priority>${url.priority}</priority>
        </url>
      `)
        .join('')}
    </urlset>
  `.trim();
    writeFileSync('public/sitemap.xml', sitemapContent);
    console.log('Sitemap generated successfully!');
};
generateSitemap();
