# Sitemap Configuration and Management

## Overview

This document describes the comprehensive sitemap system for **www.seotooler.studio**, including generation, validation, and maintenance procedures.

## Generated Files

### 1. sitemap.xml (Main Sitemap)
- **Location**: `/public/sitemap.xml`
- **URL**: `https://www.seotooler.studio/sitemap.xml`
- **Format**: XML sitemap following the sitemaps.org protocol
- **Contains**: All website pages with proper priorities, change frequencies, and last modification dates

### 2. sitemap.txt (Text Format)
- **Location**: `/public/sitemap.txt`
- **URL**: `https://www.seotooler.studio/sitemap.txt`
- **Format**: Plain text, one URL per line
- **Purpose**: Easy manual submission to search engines and simple indexing

### 3. sitemap-index.xml (Sitemap Index)
- **Location**: `/public/sitemap-index.xml`
- **URL**: `https://www.seotooler.studio/sitemap-index.xml`
- **Format**: XML sitemap index
- **Purpose**: Points to all sitemap files (useful for large sites with multiple sitemaps)

### 4. robots.txt Reference
- **Location**: `/public/robots.txt`
- **Contains**: `Sitemap: https://www.seotooler.studio/sitemap.xml`
- **Purpose**: Automatic sitemap discovery by search engine crawlers

## URL Structure and Coverage

### Static Pages (Priority 0.3-1.0)
- Homepage: `/` (Priority: 1.0)
- About: `/about` (Priority: 0.8)
- Contact: `/contact` (Priority: 0.7)
- Tools Directory: `/tools` (Priority: 0.9)
- Blog Directory: `/blog` (Priority: 0.8)
- Privacy Policy: `/privacy-policy` (Priority: 0.3)
- Terms & Conditions: `/terms-and-conditions` (Priority: 0.3)
- Disclaimer: `/disclaimer` (Priority: 0.3)

### Tool Pages (Priority 0.7-0.8)
- Tool Categories: `/tools/{category}` (Priority: 0.8)
- Individual Tools: `/tools/{category}/{tool-slug}` (Priority: 0.7)

### Blog Pages (Priority 0.6)
- Blog Categories: `/blog/category/{category-slug}` (Priority: 0.6)
- Individual Posts: `/blog/{post-slug}` (Priority: 0.6)

## Current Statistics

✅ **Total URLs**: 199
- Static pages: 8
- Tool categories: 10
- Individual tools: 165
- Blog categories: 11
- Blog posts: 5

## Priority Distribution

| Priority | Count | Purpose |
|----------|-------|---------|
| 1.0 | 1 | Homepage |
| 0.9 | 1 | Main tools directory |
| 0.8 | 12 | Important pages (about, blog, tool categories) |
| 0.7 | 166 | Individual tool pages |
| 0.6 | 16 | Blog content |
| 0.3 | 3 | Legal pages |

## Change Frequency Settings

| Frequency | Used For |
|-----------|----------|
| Daily | Homepage, main tools page |
| Weekly | Tool categories, blog directory, blog categories |
| Monthly | Individual tools, blog posts |
| Yearly | Legal pages |

## NPM Scripts

### Generation
```bash
npm run sitemap              # Generate main sitemap.xml
npm run sitemap:extras       # Generate sitemap-index.xml and sitemap.txt
npm run sitemap:all          # Generate all sitemap files
```

### Validation
```bash
npm run validate-sitemap     # Validate sitemap.xml
npm run validate-robots      # Validate robots.txt
npm run validate:all         # Validate all files
```

## Maintenance Procedures

### Adding New Pages
1. Add the page to the appropriate data source (`tools.tsx`, `blog.ts`, or static pages array)
2. Run `npm run sitemap:all` to regenerate all sitemap files
3. Run `npm run validate:all` to ensure everything is valid
4. Deploy changes

### Blog Management
- **New Blog Posts**: Add to `src/data/blog.ts` and regenerate sitemaps
- **New Categories**: Categories are automatically extracted from blog post tags
- **URL Format**: Blog categories use kebab-case format (e.g., "SEO Basics" → "seo-basics")

### Tools Management
- **New Tools**: Add to `src/data/tools.tsx` and regenerate sitemaps
- **New Categories**: Add to `toolCategories` object in `tools.tsx`

## SEO Optimization Features

### Automatic Last Modified Dates
- Static pages: Use current timestamp
- Blog posts: Parse actual publication date from post data
- Tools: Use current timestamp (updated when tool is modified)

### Smart Priority Assignment
- Homepage gets highest priority (1.0)
- Main directory pages get high priority (0.9)
- Category pages get medium-high priority (0.8)
- Individual content gets medium priority (0.6-0.7)
- Legal pages get low priority (0.3)

### Search Engine Submission URLs
- **Google Search Console**: Submit `https://www.seotooler.studio/sitemap.xml`
- **Bing Webmaster Tools**: Submit `https://www.seotooler.studio/sitemap.xml`
- **Manual Submission**: Use `https://www.seotooler.studio/sitemap.txt`

## Validation Results

Current sitemap validation shows:
- ✅ All URLs properly formatted
- ✅ Valid XML structure
- ✅ Correct priority ranges (0.0-1.0)
- ✅ Valid change frequency values
- ✅ Proper ISO 8601 date formats
- ✅ No duplicate URLs
- ✅ File size within limits (0.04 MB < 50 MB limit)

## Build Integration

### Production Builds
1. Sitemaps are automatically included in `dist/` folder during build
2. All sitemap files are served at root level
3. robots.txt correctly references sitemap location

### Netlify Configuration
- Sitemap files are excluded from SPA redirects
- Direct access to `/sitemap.xml`, `/sitemap.txt`, etc. is preserved

## Monitoring and Updates

### Regular Tasks
- Regenerate sitemaps when adding new content
- Validate sitemaps before deployment
- Monitor search console for indexing issues
- Update sitemap after major site structure changes

### Automated Checks
The validation scripts check for:
- XML format compliance
- URL accessibility
- Priority and frequency values
- Date format correctness
- File size limits
- Duplicate detection

This comprehensive sitemap system ensures maximum search engine visibility and proper indexing of all website content.
