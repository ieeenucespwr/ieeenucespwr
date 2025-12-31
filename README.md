# IEEE NUCES PWR Student Branch Website

Modern, responsive website for IEEE NUCES PWR Student Branch with dark mode support and smooth animations.

## 🚀 Quick Start

```bash
# Open in browser
open index.html

# Or run local server
python -m http.server 5500
```

## ⚡ Performance Optimization

### Optimize Images (IMPORTANT)
The website has lazy loading enabled, but images need compression:

```bash
./optimize-images.sh
```

This reduces image sizes by 70-75% (from ~15MB to ~3-5MB).

**What it does:**
- Resizes team photos: Lead (320x320px), Members (192x192px)
- Resizes executive photos (768x768px)
- Resizes event images (max 1200px width)
- Compresses all images: Team <80KB, Events <200KB
- Creates backup in `assets_backup/`

**Expected results:**
- 70-75% size reduction
- Faster page load (<1 second)
- Better PageSpeed score (90+)

### Manual Optimization (Advanced)

#### Convert to WebP (25-35% better compression)
```bash
# Install tools
sudo apt-get install webp

# Convert images
find assets -name "*.jpg" -exec bash -c 'cwebp -q 80 "$0" -o "${0%.jpg}.webp"' {} \;
```

#### Resize Specific Images
```bash
# Team leads: 320x320
convert image.jpg -resize 320x320 -quality 85 image.jpg

# Team members: 192x192  
convert image.jpg -resize 192x192 -quality 85 image.jpg

# Events: max 1200px width
convert image.jpg -resize 1200x1200\> -quality 80 image.jpg
```

#### Compress Existing Files
```bash
# Install tools
sudo apt-get install jpegoptim

# Compress
jpegoptim --size=100k --strip-all image.jpg
```

#### Target Sizes

| Image Type | Target Size | Dimensions |
|------------|-------------|------------|
| Team Lead | <80KB | 320x320px |
| Team Member | <50KB | 192x192px |
| Executive | <150KB | 768x768px |
| Event Photo | <200KB | 1200px max |
| Logo | <50KB | As needed |

#### Restore Backup
If needed:
```bash
rm -rf assets && mv assets_backup/assets assets
```

### Verify Performance
Test at: https://pagespeed.web.dev/
- Target: 90+ (Mobile), 95+ (Desktop)

Check image loading:
1. Open DevTools → Network tab
2. Filter by "Img"
3. Scroll page - images load progressively ✓

### Performance Features
- ✅ Lazy loading on all images
- ✅ Deferred non-critical CSS/JS
- ✅ Progressive image loading
- ✅ Optimized external resources

## 📁 Key Files

```
index.html              # Main page
styles.css              # Styles
script.js               # Functionality
optimize-images.sh      # Image compression script
```

## 🎨 Sections

- Hero with particles background
- About (Faculty, Executives, Teams)
- Events (2023-2024)
- Member Spotlight
- Professional Courses
- Footer with links

## 🛠️ Tech Stack

- HTML5, CSS3, JavaScript
- Tailwind CSS
- Particles.js, AOS animations
- Font Awesome icons

## 📝 Customization

### Add Team Members
Edit `index.html`:
```html
<img src="assets/team_photos/[team]/member.jpg" alt="Name" loading="lazy">
<p>Member Name</p>
```

### Add Events
Update event cards in `index.html` events section.

### Dark Mode
Auto-saved toggle in navbar.

## 📊 Performance Targets

After running `optimize-images.sh`:
- Load Time: <1s
- PageSpeed Score: 90+
- LCP: <2.5s

---

Built by IEEE NUCES PWR Web Development Team | Last Updated: December 2025
