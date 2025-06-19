#!/bin/bash

# Post-build script for sitemap generation
echo "🗺️ Generating sitemap..."

# Make sure we're in the right directory
cd "$(dirname "$0")"

# Generate sitemap and handle errors gracefully
if npm run sitemap; then
    echo "✅ Sitemap generated successfully!"
    ls -la dist/sitemap.xml 2>/dev/null && echo "📄 Sitemap file exists in dist/"
    ls -la public/sitemap.xml 2>/dev/null && echo "📄 Sitemap file exists in public/"
else
    echo "⚠️ Sitemap generation failed, but build will continue"
    echo "Creating basic sitemap fallback..."
    
    # Create a basic sitemap if generation fails
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
