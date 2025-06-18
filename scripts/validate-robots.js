#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';

const validateRobotsTxt = () => {
  try {
    const robotsPath = join(process.cwd(), 'public', 'robots.txt');
    const content = readFileSync(robotsPath, 'utf-8');
    
    const lines = content.split('\n').map(line => line.trim());
    const errors = [];
    const warnings = [];
    
    let currentUserAgent = null;
    let hasUserAgent = false;
    let hasSitemap = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;
      
      // Skip empty lines and comments
      if (!line || line.startsWith('#')) continue;
      
      // Check for valid directives
      if (line.toLowerCase().startsWith('user-agent:')) {
        hasUserAgent = true;
        currentUserAgent = line.split(':')[1]?.trim();
        if (!currentUserAgent) {
          errors.push(`Line ${lineNumber}: User-agent directive missing value`);
        }
      } else if (line.toLowerCase().startsWith('disallow:')) {
        if (!hasUserAgent) {
          errors.push(`Line ${lineNumber}: Disallow directive must be preceded by User-agent directive`);
        }
      } else if (line.toLowerCase().startsWith('allow:')) {
        if (!hasUserAgent) {
          errors.push(`Line ${lineNumber}: Allow directive must be preceded by User-agent directive`);
        }
      } else if (line.toLowerCase().startsWith('sitemap:')) {
        hasSitemap = true;
        const sitemapUrl = line.split(':').slice(1).join(':').trim();
        if (!sitemapUrl) {
          errors.push(`Line ${lineNumber}: Sitemap directive missing URL`);
        } else if (!sitemapUrl.startsWith('http')) {
          warnings.push(`Line ${lineNumber}: Sitemap URL should be absolute (start with http:// or https://)`);
        }
      } else if (line.toLowerCase().startsWith('crawl-delay:')) {
        const delay = line.split(':')[1]?.trim();
        if (!delay || isNaN(parseInt(delay))) {
          errors.push(`Line ${lineNumber}: Crawl-delay must have a numeric value`);
        }
      } else {
        // Check for common typos or invalid directives
        const directive = line.split(':')[0].toLowerCase();
        if (['useragent', 'user_agent', 'user agent'].includes(directive)) {
          errors.push(`Line ${lineNumber}: Invalid directive "${directive}". Use "User-agent:" instead`);
        } else if (['diallow', 'dissallow'].includes(directive)) {
          errors.push(`Line ${lineNumber}: Invalid directive "${directive}". Use "Disallow:" instead`);
        } else if (line.includes(':')) {
          warnings.push(`Line ${lineNumber}: Unknown directive "${directive}"`);
        }
      }
    }
    
    if (!hasUserAgent) {
      errors.push('robots.txt must contain at least one User-agent directive');
    }
    
    if (!hasSitemap) {
      warnings.push('Consider adding a Sitemap directive to help search engines find your sitemap');
    }
    
    // Report results
    console.log('🤖 Robots.txt Validation Results:');
    console.log('================================');
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ No issues found! Your robots.txt is valid.');
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
    
    console.log(`\n📊 File statistics:`);
    console.log(`   Total lines: ${lines.length}`);
    console.log(`   Non-empty lines: ${lines.filter(l => l && !l.startsWith('#')).length}`);
    console.log(`   User-agent blocks: ${lines.filter(l => l.toLowerCase().startsWith('user-agent:')).length}`);
    console.log(`   Disallow rules: ${lines.filter(l => l.toLowerCase().startsWith('disallow:')).length}`);
    console.log(`   Allow rules: ${lines.filter(l => l.toLowerCase().startsWith('allow:')).length}`);
    console.log(`   Sitemap references: ${lines.filter(l => l.toLowerCase().startsWith('sitemap:')).length}`);
    
    return errors.length === 0;
    
  } catch (error) {
    console.error('❌ Error reading robots.txt:', error.message);
    return false;
  }
};

const isValid = validateRobotsTxt();
process.exit(isValid ? 0 : 1);
