#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const optimizeImages = async () => {
  console.log('🖼️  Starting image optimization...');
  
  const images = [
    {
      input: '/workspaces/seotools/src/assets/Team working on SEO.png',
      output: '/workspaces/seotools/src/assets/team-working-on-seo-optimized.webp',
      maxWidth: 800,
      quality: 80
    },
    {
      input: '/workspaces/seotools/src/assets/The Ultimate Guide.png', 
      output: '/workspaces/seotools/src/assets/ultimate-guide-optimized.webp',
      maxWidth: 800,
      quality: 80
    },
    {
      input: '/workspaces/seotools/src/assets/YouTube Tools for Creators.jpg',
      output: '/workspaces/seotools/src/assets/youtube-tools-optimized.webp',
      maxWidth: 800,
      quality: 80
    },
    {
      input: '/workspaces/seotools/src/assets/10 Essential SEO Tips.jpg',
      output: '/workspaces/seotools/src/assets/10-essential-seo-tips-optimized.webp',
      maxWidth: 800,
      quality: 80
    }
  ];

  let totalSavings = 0;

  for (const image of images) {
    try {
      if (!existsSync(image.input)) {
        console.log(`⚠️  Skipping ${image.input} - file not found`);
        continue;
      }

      const originalSize = readFileSync(image.input).length;
      
      await sharp(image.input)
        .resize(image.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: image.quality })
        .toFile(image.output);

      const optimizedSize = readFileSync(image.output).length;
      const savings = originalSize - optimizedSize;
      totalSavings += savings;

      console.log(`✅ ${image.input.split('/').pop()}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(2)} KB`);
      console.log(`   Savings: ${(savings / 1024).toFixed(2)} KB (${((savings / originalSize) * 100).toFixed(1)}%)`);
      console.log('');

    } catch (error) {
      console.error(`❌ Failed to optimize ${image.input}:`, error.message);
    }
  }

  console.log(`🎉 Total savings: ${(totalSavings / 1024).toFixed(2)} KB`);
};

optimizeImages().catch(console.error);
