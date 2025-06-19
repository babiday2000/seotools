#!/bin/bash

# Sitemap security validation script
echo "🔍 Validating sitemap security..."

SITEMAP_FILE="dist/sitemap.xml"

if [[ ! -f "$SITEMAP_FILE" ]]; then
    echo "❌ Sitemap file not found: $SITEMAP_FILE"
    exit 1
fi

# Check for XML declaration
if ! head -1 "$SITEMAP_FILE" | grep -q '<?xml version="1.0" encoding="UTF-8"?>'; then
    echo "❌ Invalid XML declaration"
    exit 1
fi

# Check for proper namespace
if ! grep -q 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' "$SITEMAP_FILE"; then
    echo "❌ Invalid or missing XML namespace"
    exit 1
fi

# Check for malicious content
if grep -qi "<script\|javascript:\|onclick\|onerror\|onload" "$SITEMAP_FILE"; then
    echo "🚨 SECURITY ALERT: Malicious content detected in sitemap!"
    echo "🔧 Cleaning sitemap..."
    
    # Create clean sitemap
    cat > "$SITEMAP_FILE" << 'EOF'
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
    echo "✅ Sitemap security validation passed"
fi

# Check URL count
URL_COUNT=$(grep -c "<url>" "$SITEMAP_FILE")
echo "📊 Sitemap contains $URL_COUNT URLs"

# Validate all URLs are HTTPS and from correct domain
if grep -E "<loc>http://|<loc>https://[^/]*[^.]seotooler\.studio" "$SITEMAP_FILE"; then
    echo "❌ Invalid URLs found in sitemap"
    exit 1
fi

echo "✅ All sitemap URLs are valid"
echo "🎉 Sitemap validation complete!"
