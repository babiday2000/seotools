import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { tools, toolCategories } from '../src/data/tools.tsx';
import { blogPosts } from '../src/data/blog.ts';

const BASE_URL = 'https://seotooler.studio';

// XML escaping function to prevent injection
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return c;
    }
  });
};

// Validate URL format
const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname === 'seotooler.studio';
  } catch {
    return false;
  }
};

// Validate and sanitize URL
const sanitizeUrl = (url: string): string => {
  const sanitized = url.replace(/[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g, '');
  return isValidUrl(sanitized) ? sanitized : '';
};

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
    const pageUrl = `${BASE_URL}${page.path}`;
    if (isValidUrl(pageUrl)) {
      urls.push({
        loc: escapeXml(pageUrl),
        lastmod: new Date().toISOString(),
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }
  });

  // Add tool category pages with validation
  for (const categorySlug in toolCategories) {
    const categoryUrl = `${BASE_URL}/tools/${categorySlug}`;
    if (isValidUrl(categoryUrl)) {
      urls.push({
        loc: escapeXml(categoryUrl),
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Add individual tool pages with validation
  tools.forEach(tool => {
    const toolUrl = `${BASE_URL}/tools/${tool.category}/${tool.slug}`;
    if (isValidUrl(toolUrl)) {
      urls.push({
        loc: escapeXml(toolUrl),
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      });
    }
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

  // Add blog category pages with validation
  blogCategories.forEach(category => {
    const categoryUrl = `${BASE_URL}/blog/category/${category}`;
    if (isValidUrl(categoryUrl)) {
      urls.push({
        loc: escapeXml(categoryUrl),
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.6,
      });
    }
  });

  // Add individual blog posts with validation
  blogPosts.forEach(post => {
    // Parse date to get proper lastmod
    const postDate = new Date(post.date);
    const lastmod = isNaN(postDate.getTime()) ? new Date().toISOString() : postDate.toISOString();
    
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    if (isValidUrl(postUrl)) {
      urls.push({
        loc: escapeXml(postUrl),
        lastmod: lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  });

  // Filter out any invalid URLs
  const validUrls = urls.filter(url => url.loc && url.loc.length > 0);

  // Sort URLs by priority (highest first) and then alphabetically
  validUrls.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return a.loc.localeCompare(b.loc);
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validUrls
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

  // Ensure directories exist
  if (!existsSync('public')) {
    mkdirSync('public', { recursive: true });
  }
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }

  // Write sitemap files with validation
  try {
    writeFileSync('public/sitemap.xml', sitemapContent, 'utf8');
    writeFileSync('dist/sitemap.xml', sitemapContent, 'utf8');
    
    // Validate the written files
    const publicContent = readFileSync('public/sitemap.xml', 'utf8');
    const distContent = readFileSync('dist/sitemap.xml', 'utf8');
    
    if (!publicContent.includes('<?xml') || !distContent.includes('<?xml')) {
      throw new Error('Generated sitemap files are invalid');
    }
    
  } catch (error) {
    console.error('❌ Error writing sitemap files:', error);
    throw error;
  }
  
  // Generate sitemap statistics
  const stats = {
    total: validUrls.length,
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
