#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const validateSitemap = () => {
  try {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    
    if (!existsSync(sitemapPath)) {
      console.error('❌ sitemap.xml not found in public/ directory');
      console.log('💡 Run "npm run sitemap" to generate the sitemap');
      return false;
    }
    
    const content = readFileSync(sitemapPath, 'utf-8');
    const errors = [];
    const warnings = [];
    
    // Basic XML structure validation
    if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push('Missing XML declaration');
    }
    
    if (!content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      errors.push('Missing or incorrect urlset declaration');
    }
    
    if (!content.includes('</urlset>')) {
      errors.push('Missing closing urlset tag');
    }
    
    // Extract URLs
    const urlMatches = content.match(/<url>[\s\S]*?<\/url>/g) || [];
    const urls = [];
    
    urlMatches.forEach((urlBlock, index) => {
      const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
      const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
      const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
      const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);
      
      if (!locMatch) {
        errors.push(`URL ${index + 1}: Missing <loc> tag`);
        return;
      }
      
      const url = locMatch[1];
      const lastmod = lastmodMatch ? lastmodMatch[1] : '';
      const changefreq = changefreqMatch ? changefreqMatch[1] : '';
      const priority = priorityMatch ? priorityMatch[1] : '';
      
      // Validate URL format
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errors.push(`URL ${index + 1}: Invalid URL format: ${url}`);
      }
      
      // Validate lastmod format (ISO 8601)
      if (lastmod && !lastmod.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        warnings.push(`URL ${index + 1}: Invalid lastmod format: ${lastmod}`);
      }
      
      // Validate changefreq values
      const validChangefreq = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
      if (changefreq && !validChangefreq.includes(changefreq)) {
        errors.push(`URL ${index + 1}: Invalid changefreq value: ${changefreq}`);
      }
      
      // Validate priority range
      const priorityNum = parseFloat(priority);
      if (priority && (isNaN(priorityNum) || priorityNum < 0 || priorityNum > 1)) {
        errors.push(`URL ${index + 1}: Invalid priority value (must be 0.0-1.0): ${priority}`);
      }
      
      urls.push({
        url,
        lastmod,
        changefreq,
        priority: priorityNum,
      });
    });
    
    // Check for duplicate URLs
    const urlSet = new Set();
    const duplicates = [];
    urls.forEach(({ url }) => {
      if (urlSet.has(url)) {
        duplicates.push(url);
      } else {
        urlSet.add(url);
      }
    });
    
    if (duplicates.length > 0) {
      errors.push(`Duplicate URLs found: ${duplicates.join(', ')}`);
    }
    
    // Check for reasonable number of URLs (Google limit is 50,000)
    if (urls.length > 50000) {
      warnings.push(`Large number of URLs (${urls.length}). Consider splitting into multiple sitemaps.`);
    }
    
    // Analyze URL patterns
    const urlPatterns = {
      homepage: urls.filter(u => u.url.endsWith('.com/') || u.url.endsWith('.com')).length,
      tools: urls.filter(u => u.url.includes('/tools/')).length,
      blog: urls.filter(u => u.url.includes('/blog/')).length,
      static: urls.filter(u => !u.url.includes('/tools/') && !u.url.includes('/blog/')).length,
    };
    
    // Report results
    console.log('🗺️  Sitemap Validation Results:');
    console.log('===============================');
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ Sitemap is valid and well-formed!');
    } else {
      if (errors.length > 0) {
        console.log(`❌ ${errors.length} error(s) found:`);
        errors.forEach(error => console.log(`   ${error}`));
      }
      
      if (warnings.length > 0) {
        console.log(`⚠️  ${warnings.length} warning(s) found:`);
        warnings.forEach(warning => console.log(`   ${warning}`));
      }
    }
    
    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`   Total URLs: ${urls.length}`);
    console.log(`   Homepage: ${urlPatterns.homepage}`);
    console.log(`   Tool pages: ${urlPatterns.tools}`);
    console.log(`   Blog pages: ${urlPatterns.blog}`);
    console.log(`   Static pages: ${urlPatterns.static}`);
    
    // Show priority distribution
    const priorityDistribution = {
      '1.0': urls.filter(u => u.priority === 1.0).length,
      '0.9': urls.filter(u => u.priority === 0.9).length,
      '0.8': urls.filter(u => u.priority === 0.8).length,
      '0.7': urls.filter(u => u.priority === 0.7).length,
      '0.6': urls.filter(u => u.priority === 0.6).length,
      'other': urls.filter(u => u.priority < 0.6 && u.priority > 0).length,
    };
    
    console.log(`\n📈 Priority Distribution:`);
    Object.entries(priorityDistribution).forEach(([priority, count]) => {
      if (count > 0) {
        console.log(`   Priority ${priority}: ${count} URLs`);
      }
    });
    
    const fileSize = Buffer.byteLength(content, 'utf8');
    const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);
    console.log(`\n📁 File Size: ${fileSize} bytes (${fileSizeMB} MB)`);
    
    if (fileSize > 50 * 1024 * 1024) { // 50MB limit
      warnings.push('Sitemap file size exceeds 50MB limit');
    }
    
    return errors.length === 0;
    
  } catch (error) {
    console.error('❌ Error validating sitemap:', error.message);
    return false;
  }
};

const isValid = validateSitemap();
process.exit(isValid ? 0 : 1);
