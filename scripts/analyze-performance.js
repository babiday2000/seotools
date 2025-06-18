#!/usr/bin/env node

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const analyzePerformance = () => {
  console.log('🔍 Performance Analysis Report');
  console.log('================================');
  
  const distPath = join(process.cwd(), 'dist');
  
  if (!existsSync(distPath)) {
    console.error('❌ No build found. Run "npm run build" first.');
    return false;
  }
  
  try {
    // Analyze bundle sizes
    const assetStats = analyzeAssets(distPath);
    const recommendations = generateRecommendations(assetStats);
    
    console.log('\n📊 Bundle Analysis:');
    console.log('==================');
    
    assetStats.forEach(asset => {
      const sizeKB = (asset.size / 1024).toFixed(2);
      const status = asset.size > 500000 ? '🔴' : asset.size > 100000 ? '🟡' : '🟢';
      console.log(`${status} ${asset.name}: ${sizeKB} KB`);
    });
    
    console.log('\n💡 Performance Recommendations:');
    console.log('================================');
    
    recommendations.forEach(rec => {
      console.log(`${rec.priority} ${rec.message}`);
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Error analyzing performance:', error.message);
    return false;
  }
};

const analyzeAssets = (distPath) => {
  const assets = [];
  
  const scanDirectory = (dir, prefix = '') => {
    const items = readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = join(dir, item);
      const stats = statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, `${prefix}${item}/`);
      } else {
        assets.push({
          name: `${prefix}${item}`,
          size: stats.size,
          type: item.split('.').pop()
        });
      }
    });
  };
  
  scanDirectory(distPath);
  return assets.sort((a, b) => b.size - a.size);
};

const generateRecommendations = (assets) => {
  const recommendations = [];
  
  // Check for large JavaScript files
  const largeJS = assets.filter(a => a.type === 'js' && a.size > 500000);
  if (largeJS.length > 0) {
    recommendations.push({
      priority: '🔴 HIGH',
      message: `Large JavaScript bundles detected (${largeJS.length} files > 500KB). Consider code splitting.`
    });
  }
  
  // Check for unoptimized images
  const largeImages = assets.filter(a => 
    ['jpg', 'jpeg', 'png', 'gif'].includes(a.type) && a.size > 200000
  );
  if (largeImages.length > 0) {
    recommendations.push({
      priority: '🟡 MEDIUM',
      message: `Large images detected (${largeImages.length} files > 200KB). Consider WebP format and compression.`
    });
  }
  
  // Check total bundle size
  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
  const totalMB = (totalSize / 1024 / 1024).toFixed(2);
  
  if (totalSize > 5 * 1024 * 1024) { // 5MB
    recommendations.push({
      priority: '🔴 HIGH',
      message: `Total bundle size is ${totalMB}MB. Consider aggressive code splitting and tree shaking.`
    });
  } else if (totalSize > 2 * 1024 * 1024) { // 2MB
    recommendations.push({
      priority: '🟡 MEDIUM',
      message: `Total bundle size is ${totalMB}MB. Room for optimization.`
    });
  } else {
    recommendations.push({
      priority: '🟢 GOOD',
      message: `Total bundle size is ${totalMB}MB. Within acceptable limits.`
    });
  }
  
  // Check for duplicate dependencies
  const jsFiles = assets.filter(a => a.type === 'js').length;
  if (jsFiles > 20) {
    recommendations.push({
      priority: '🟡 MEDIUM',
      message: `Many JavaScript chunks (${jsFiles}). Consider consolidating common dependencies.`
    });
  }
  
  return recommendations;
};

const isValid = analyzePerformance();
process.exit(isValid ? 0 : 1);
