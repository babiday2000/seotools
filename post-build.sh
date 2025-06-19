#!/bin/bash

# Post-build script for sitemap generation and validation
echo "🗺️ Generating and validating sitemap..."

# Make sure we're in the right directory
cd "$(dirname "$0")"

# Remove any existing sitemaps to prevent contamination
echo "🧹 Cleaning existing sitemaps..."
rm -f dist/sitemap.xml 2>/dev/null
rm -f public/sitemap.xml 2>/dev/null

# Generate sitemap and handle errors gracefully
if npm run sitemap; then
    echo "✅ Sitemap generated successfully!"
    
    # Validate the generated sitemap
    if [[ -f "dist/sitemap.xml" ]]; then
        echo "📄 Sitemap file exists in dist/"
        
        # Check for malicious content
        if grep -q "<script" "dist/sitemap.xml" || grep -q "javascript:" "dist/sitemap.xml"; then
            echo "🚨 SECURITY WARNING: Malicious content detected in sitemap!"
            echo "🔧 Creating clean sitemap..."
            
            # Create a clean basic sitemap
            cat > dist/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seotooler.studio/</loc>
    <lastmod>2025-06-19T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seotooler.studio/tools</loc>
    <lastmod>2025-06-19T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
EOF
            echo "✅ Clean sitemap created"
        else
            echo "✅ Sitemap validation passed - no malicious content detected"
        fi
        
        # Show sitemap size
        echo "📊 Sitemap size: $(wc -l < dist/sitemap.xml) lines"
        
    else
        echo "❌ Sitemap file not found in dist/"
    fi
    
    if [[ -f "public/sitemap.xml" ]]; then
        echo "📄 Sitemap file exists in public/"
    fi
    
else
    echo "⚠️ Sitemap generation failed, creating basic sitemap fallback"
    
    # Create a basic sitemap if generation fails
    mkdir -p dist
    cat > dist/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seotooler.studio/</loc>
    <lastmod>2025-06-19T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seotooler.studio/tools</loc>
    <lastmod>2025-06-19T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
EOF
    echo "✅ Basic sitemap created as fallback"
fi

echo "🎉 Post-build complete!"
