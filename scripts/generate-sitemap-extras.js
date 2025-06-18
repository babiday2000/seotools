#!/usr/bin/env node

import { writeFileSync } from 'fs';

const BASE_URL = 'https://www.seotooler.studio';

const generateSitemapExtras = async () => {
  // We'll read the existing sitemap.xml to get the URLs instead of importing tsx files
  try {
    const { readFileSync } = await import('fs');
    const sitemapContent = readFileSync('public/sitemap.xml', 'utf-8');
    
    // Extract URLs from existing sitemap
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    
    // Generate main sitemap index
    const mainSitemapLastmod = new Date().toISOString();
    
    // Create sitemap index
    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${mainSitemapLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

    writeFileSync('public/sitemap-index.xml', sitemapIndexContent);
    
    // Create text version of sitemap
    const textSitemapContent = urls.join('\n');
    writeFileSync('public/sitemap.txt', textSitemapContent);
    
    console.log('📋 Additional sitemap files generated:');
    console.log('   ✅ sitemap-index.xml (for large sites)');
    console.log('   ✅ sitemap.txt (text format for manual submission)');
    console.log(`   📊 Text sitemap contains ${urls.length} URLs`);
    
    return true;
  } catch (error) {
    console.error('❌ Error generating additional sitemap files:', error.message);
    console.log('💡 Make sure to run "npm run sitemap" first to generate the main sitemap');
    return false;
  }
};

generateSitemapExtras();
