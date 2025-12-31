#!/bin/bash
# Quick Image Optimization Script for IEEE Website
# This script optimizes images without requiring additional tools

echo "========================================="
echo "IEEE Website Image Optimization Script"
echo "========================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Check if jpegoptim is installed
if ! command -v jpegoptim &> /dev/null; then
    echo "⚠️  jpegoptim not found. Installing..."
    sudo apt-get install -y jpegoptim
fi

cd "$(dirname "$0")"

echo "🔍 Analyzing current image sizes..."
echo ""

# Find and display large images
echo "📊 Images larger than 200KB:"
find assets -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +200k -exec du -h {} + | sort -rh

echo ""
echo "🎯 Starting optimization..."
echo ""

# Create backup
echo "💾 Creating backup..."
mkdir -p assets_backup
cp -r assets assets_backup/
echo "✅ Backup created in assets_backup/"

# Optimize team photos
echo ""
echo "👥 Optimizing team photos..."
find assets/team_photos -name "*_lead.jpg" 2>/dev/null | while read img; do
    echo "  Processing: $(basename "$img")"
    convert "$img" -resize 320x320 -quality 85 "$img"
    jpegoptim --size=80k --strip-all "$img" 2>/dev/null || true
done

find assets/team_photos -name "*_member*.jpg" 2>/dev/null | while read img; do
    echo "  Processing: $(basename "$img")"
    convert "$img" -resize 192x192 -quality 85 "$img"
    jpegoptim --size=50k --strip-all "$img" 2>/dev/null || true
done

# Optimize executive photos
echo ""
echo "👔 Optimizing executive photos..."
find assets/executives -name "*.jpg" 2>/dev/null | while read img; do
    echo "  Processing: $(basename "$img")"
    convert "$img" -resize 768x768 -quality 85 "$img"
    jpegoptim --size=150k --strip-all "$img" 2>/dev/null || true
done

# Optimize event images
echo ""
echo "🎉 Optimizing event images..."
find assets/events -type f \( -name "*.jpg" -o -name "*.jpeg" \) 2>/dev/null | while read img; do
    echo "  Processing: $(basename "$img")"
    convert "$img" -resize 1200x1200\> -quality 80 "$img"
    jpegoptim --size=200k --strip-all "$img" 2>/dev/null || true
done

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 Final size comparison:"
du -sh assets_backup/assets 2>/dev/null || echo "  Before: N/A"
du -sh assets

echo ""
echo "🎉 Done! Your images have been optimized."
echo "📝 Check IMAGE_OPTIMIZATION_GUIDE.md for more advanced optimizations."
echo ""
echo "To restore from backup if needed:"
echo "  rm -rf assets && mv assets_backup/assets assets"
