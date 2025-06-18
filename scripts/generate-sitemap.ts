import { writeFileSync } from 'fs';
import { tools, toolCategories } from '../src/data/tools.tsx';
import { blogPosts } from '../src/data/blog.ts';

const BASE_URL = 'https://www.seotooler.studio';

const generateSitemap = () => {
  const urls = [];
  
  // Main website pages
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' },
    { path: '/tools', priority: 0.9, changefreq: 'daily' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
    { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.3, changefreq: 'yearly' },
    { path: '/disclaimer', priority: 0.3, changefreq: 'yearly' },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: new Date().toISOString(),
      changefreq: page.changefreq,
      priority: page.priority,
    });
  });

  // Add tool category pages
  for (const categorySlug in toolCategories) {
    urls.push({
      loc: `${BASE_URL}/tools/${categorySlug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Add individual tool pages
  tools.forEach(tool => {
    urls.push({
      loc: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  // Extract unique blog categories from tags
  const blogCategories = new Set();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      // Convert to URL-friendly format
      const categorySlug = tag.toLowerCase().replace(/\s+/g, '-');
      blogCategories.add(categorySlug);
    });
  });

  // Add blog category pages
  blogCategories.forEach(category => {
    urls.push({
      loc: `${BASE_URL}/blog/category/${category}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.6,
    });
  });

  // Add individual blog posts
  blogPosts.forEach(post => {
    // Parse date to get proper lastmod
    const postDate = new Date(post.date);
    const lastmod = isNaN(postDate.getTime()) ? new Date().toISOString() : postDate.toISOString();
    
    urls.push({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: lastmod,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Sort URLs by priority (highest first) and then alphabetically
  urls.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return a.loc.localeCompare(b.loc);
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemapContent);
  
  // Generate sitemap statistics
  const stats = {
    total: urls.length,
    staticPages: staticPages.length,
    toolCategories: Object.keys(toolCategories).length,
    tools: tools.length,
    blogCategories: blogCategories.size,
    blogPosts: blogPosts.length,
  };
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📊 Statistics:`);
  console.log(`   Total URLs: ${stats.total}`);
  console.log(`   Static pages: ${stats.staticPages}`);
  console.log(`   Tool categories: ${stats.toolCategories}`);
  console.log(`   Individual tools: ${stats.tools}`);
  console.log(`   Blog categories: ${stats.blogCategories}`);
  console.log(`   Blog posts: ${stats.blogPosts}`);
  console.log(`📍 Sitemap location: public/sitemap.xml`);
  console.log(`🌐 Sitemap URL: ${BASE_URL}/sitemap.xml`);
};

generateSitemap();
