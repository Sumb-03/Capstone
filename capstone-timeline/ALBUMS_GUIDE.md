# 📸 Photo Albums Guide

Complete guide for adding and managing photo albums.

## Overview

The Albums feature automatically loads photos from the `public/albums/` folder. Create folders for albums, add photos, and they appear instantly!

## Features

- 📁 **Auto-Loading** - Albums load automatically from folders
- 🖼️ **Multiple Views** - Album grid or all photos view
- 🔍 **Lightbox** - Full-screen photo viewer with navigation
- 📱 **Responsive** - Masonry-style grid adapts to screen size
- ⌨️ **Keyboard Controls** - Arrow keys for navigation
- 📲 **HEIC Support** - iPhone photos auto-convert to JPEG
- 🎨 **Smooth Animations** - Beautiful transitions

## Quick Start

### Simple 3-Step Process

1. **Create album folder** in `public/albums/`:
   ```
   public/albums/Team Building 2025/
   ```

2. **Add photos** to the folder:
   ```
   public/albums/Team Building 2025/
     ├── photo1.jpg
     ├── photo2.jpg
     ├── photo3.png
     └── group_photo.heic
   ```

3. **Refresh website** - Album appears automatically! 🎉

## Folder Structure

```
public/albums/
├── Team Building 2025/        # Album 1
│   ├── 1_kickoff.jpg         # First photo (numbered)
│   ├── 2_icebreaker.jpg      # Second photo
│   ├── 3_lunch.jpg           # Third photo
│   └── 4_group.jpg           # Fourth photo
│
├── Office Tour/               # Album 2
│   ├── reception.jpg
│   ├── workspace.jpg
│   ├── meeting_room.jpg
│   └── cafe.jpg
│
├── Project Demo Day/          # Album 3
│   ├── setup.png
│   ├── presentation1.jpg
│   ├── presentation2.jpg
│   ├── live_demo.jpg
│   └── celebration.heic      # HEIC auto-converts!
│
└── [Your Album Name]/         # Add more albums
    └── ...
```

## Supported Formats

| Format | Support | Notes |
|--------|---------|-------|
| **JPG/JPEG** | ✅ Full | Recommended for photos |
| **PNG** | ✅ Full | Good for screenshots |
| **HEIC** | ✅ Auto-converts | iPhone default format |
| **WebP** | ✅ Full | Modern web format |
| **GIF** | ⚠️ Limited | Not recommended (use video) |
| **AVIF** | ✅ Full | Next-gen format |

### HEIC Conversion

iPhone photos (HEIC format) automatically convert to JPEG:

```
Before: workshop.heic (10MB)
After:  workshop.jpg (2MB) ← Automatic!
```

**Benefits:**
- Works in all browsers
- Smaller file size
- No manual conversion needed

## Photo Organization

### Naming for Order

Photos display in alphabetical order. Use numbers or dates for control:

#### Method 1: Numbers

```
public/albums/Project Demo/
  ├── 1_setup.jpg           ← Shows first
  ├── 2_presentation.jpg
  ├── 3_demo.jpg
  └── 4_ending.jpg          ← Shows last
```

#### Method 2: Dates

```
public/albums/Weekly Updates/
  ├── 2025-09-05_week1.jpg  ← Chronological
  ├── 2025-09-12_week2.jpg
  ├── 2025-09-19_week3.jpg
  └── 2025-09-26_week4.jpg
```

#### Method 3: Descriptive

```
public/albums/Office Areas/
  ├── a_reception.jpg       ← Alphabetical
  ├── b_workspace.jpg
  ├── c_cafeteria.jpg
  └── d_rooftop.jpg
```

### Album Organization Tips

**By Event Type:**
```
public/albums/
├── Team Building Events/
├── Milestone Celebrations/
├── Training Sessions/
├── Social Gatherings/
└── Office Life/
```

**By Date:**
```
public/albums/
├── 2025-09 September/
├── 2025-10 October/
├── 2025-11 November/
└── 2025-12 December/
```

**By Project:**
```
public/albums/
├── Project Alpha - Phase 1/
├── Project Alpha - Phase 2/
├── Project Beta - Demo/
└── Project Gamma - Launch/
```

## Photo Guidelines

### Optimal Specifications

- **Width**: 1000-2000px (minimum 800px)
- **File Size**: Under 2MB per photo
- **Aspect Ratio**: Any (system adapts automatically)
- **Quality**: High enough to look good full-screen

### Compression

Large photos slow down loading. Compress before uploading:

**Recommended Tools:**
- [TinyPNG.com](https://tinypng.com) - Free, easy compression
- [Squoosh.app](https://squoosh.app) - Advanced options
- [ImageOptim](https://imageoptim.com) - Mac app

**Target Sizes:**
- Portrait (600x800): 200-400KB
- Landscape (1200x800): 300-600KB
- Square (1000x1000): 250-500KB

### Photo Quality Checklist

✅ **Good Photos:**
- Clear and in focus
- Good lighting
- Meaningful content
- High resolution
- Proper orientation

❌ **Avoid:**
- Blurry or dark photos
- Very low resolution (<500px)
- Duplicate photos
- Random/test images
- Extremely large files (>5MB)

## Album Features

### Cover Image

The **first image** in each album becomes the cover. Control this with naming:

```
public/albums/Team Retreat/
  ├── 1_cover_group_photo.jpg  ← This is the cover!
  ├── 2_arrival.jpg
  ├── 3_activities.jpg
  └── 4_dinner.jpg
```

**Cover Photo Tips:**
- Use your best/most representative photo
- Group photos work great
- Clear, high-quality images
- Landscape orientation often works best

### View Modes

Users can switch between two views:

#### Albums View (Default)
- Grid of album covers
- Click album → see photos in that album
- Great for organized browsing

#### All Photos View
- All photos from all albums in one grid
- Masonry-style layout
- Great for overview and variety

### Lightbox Viewer

Click any photo to open full-screen viewer:

**Features:**
- ⬅️ ➡️ Previous/Next navigation
- ⌨️ Keyboard controls (arrows, Esc)
- 📱 Touch gestures (swipe on mobile)
- 🔍 Image details (caption, date, album)
- ❌ Close button (or click outside)

**Keyboard Shortcuts:**
- `←` Left Arrow: Previous photo
- `→` Right Arrow: Next photo
- `Esc`: Close lightbox

## Advanced Customization

### Change Grid Columns

**File**: `src/components/albums/Albums.tsx`

```typescript
// Find this section:
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

// Change column counts:
// grid-cols-2    → 2 columns on mobile
// md:grid-cols-3 → 3 columns on tablet
// lg:grid-cols-4 → 4 columns on desktop
```

### Customize Lightbox

Edit `Albums.tsx` to change:
- Background color/opacity
- Navigation button style
- Image info display
- Animation speed

### Add Image Captions

Currently auto-generates from filename. To add custom captions:

1. Create `info.json` in album folder:
```json
{
  "photos": {
    "photo1.jpg": "Team kickoff meeting",
    "photo2.jpg": "Brainstorming session",
    "photo3.jpg": "Lunch break fun"
  }
}
```

2. Update Albums component to read captions

## Troubleshooting

### Album Not Showing

1. ✅ Check folder exists in `public/albums/`
2. ✅ Verify folder contains at least one image
3. ✅ Check file extensions (jpg, png, heic, webp)
4. ✅ Reload browser (Ctrl+Shift+R)

### Photos Not Loading

1. ✅ Verify file format is supported
2. ✅ Check file isn't corrupted (open in image viewer)
3. ✅ Ensure file size isn't extremely large (>10MB)
4. ✅ Check filename doesn't have special characters

### HEIC Not Converting

1. ✅ Wait a moment - conversion happens on first load
2. ✅ Check browser console for errors
3. ✅ Verify Sharp package is installed: `npm list sharp`
4. ✅ Try restarting dev server

### Wrong Photo Order

1. ✅ Rename files with numbers: `1_`, `2_`, `3_`
2. ✅ Check all filenames for alphabetical sort
3. ✅ Avoid special characters in filenames

### Images Look Blurry

1. ✅ Use higher resolution source images
2. ✅ Check compression settings weren't too aggressive
3. ✅ Ensure image dimensions are adequate (800px+ width)

### Slow Loading

1. ✅ Compress large images (see Compression section)
2. ✅ Reduce image dimensions (2000px max width)
3. ✅ Limit photos per album (50-100 max recommended)
4. ✅ Use JPG instead of PNG for photos

## Performance Tips

### Optimize Before Upload

1. **Resize**: Max width 2000px
2. **Compress**: Target <500KB per image
3. **Format**: Use JPG for photos, PNG for graphics
4. **Batch Process**: Use tools to process multiple images

### Batch Processing Tools

**Windows:**
- [IrfanView](https://www.irfanview.com) (Free)
- [XnConvert](https://www.xnview.com/en/xnconvert/) (Free)

**Mac:**
- [ImageOptim](https://imageoptim.com) (Free)
- [Retrobatch](https://flyingmeat.com/retrobatch/) (Paid)

**Online:**
- [Squoosh](https://squoosh.app)
- [TinyPNG](https://tinypng.com)
- [Optimizilla](https://imagecompressor.com)

### Lazy Loading

Images only load when visible (automatic). Benefits:
- Faster initial page load
- Reduced bandwidth usage
- Better performance on mobile

## Best Practices

### Photo Selection

✅ **Include:**
- Team interactions and collaboration
- Key moments and milestones
- Different types of activities
- Various team members
- Workspace/environment shots

❌ **Avoid:**
- Blurry or low-quality images
- Duplicate or very similar photos
- Random test images
- Photos without clear subject
- Images with sensitive information

### Album Curation

1. **Quality over Quantity**: 10-30 great photos > 100 mediocre ones
2. **Tell a Story**: Order photos to show event flow
3. **Variety**: Mix group shots, activities, and details
4. **Consistency**: Similar lighting/style within an album
5. **Relevance**: Keep photos related to album theme

### Privacy Considerations

⚠️ **Before uploading:**
- Get permission from people in photos
- Remove photos with sensitive information
- Check company photo policy
- Avoid photos with confidential content
- Consider face visibility preferences

## FAQs

**Q: How many albums can I have?**
A: Unlimited! System scales automatically.

**Q: Can I nest folders (sub-albums)?**
A: No, only one level deep. Use naming: "Project - Phase 1", "Project - Phase 2"

**Q: Can I mix portrait and landscape photos?**
A: Yes! The grid adapts automatically.

**Q: What happens to HEIC files?**
A: Server automatically converts to JPG on first access.

**Q: Can I add videos?**
A: Not currently. Consider uploading to YouTube/Vimeo and linking.

**Q: How do I delete an album?**
A: Delete the folder from `public/albums/`.

**Q: Can visitors download photos?**
A: Yes, right-click and "Save image as..." works.

**Q: Can I password-protect albums?**
A: Not built-in. Consider deployment platform features.

---

**Ready to share your memories?** Just create folders and add photos! 📸

For more help, see:
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- [README.md](README.md)
