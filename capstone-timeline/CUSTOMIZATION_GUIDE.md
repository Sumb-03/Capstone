# 🎨 Complete Customization Guide

Comprehensive reference for customizing every aspect of your capstone timeline website.

## 📋 Quick Checklist

- [ ] Update timeline title and subtitle
- [ ] Add your timeline events & images
- [ ] Add team member profiles
- [ ] Add photo albums
- [ ] Update map location pins
- [ ] Replace placeholder images
- [ ] Customize colors & theme
- [ ] Adjust animation speeds
- [ ] Update metadata (title, description, favicon)

## 1️⃣ Update Timeline Content

**File**: `src/data/timelineData.ts`

```typescript
export const timelineData: TimelineData = {
  title: 'Your Project Title',        // Main heading
  subtitle: 'Your subtitle here',     // Optional subtitle
  events: [ /* your events */ ]
};
```

## 2️⃣ Add Timeline Events

Each event requires:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique identifier |
| `title` | string | ✅ Yes | Event title |
| `date` | string | ✅ Yes | Display date (e.g., "January 2026") |
| `description` | string | ✅ Yes | Event description |
| `image` | string | ❌ No | Single image URL (fallback) |
| `images` | string[] | ❌ No | Array of image URLs |
| `imageFolder` | string | ❌ No | Folder name in `public/images/timeline/` |
| `icon` | string | ❌ No | Icon name (see below) |
| `color` | string | ❌ No | Tailwind color class |
| `category` | string | ❌ No | Category label |

### Available Icons

```typescript
'rocket'       // 🚀 Launch/Start
'search'       // 🔍 Research/Discovery
'palette'      // 🎨 Design/Creative
'code'         // 💻 Development/Technical
'check-circle' // ✅ Completion/Success
'presentation' // 📊 Presentation/Demo
```

### Available Colors

```typescript
'bg-blue-500'    // Blue
'bg-purple-500'  // Purple
'bg-pink-500'    // Pink
'bg-green-500'   // Green
'bg-yellow-500'  // Yellow
'bg-red-500'     // Red
'bg-indigo-500'  // Indigo
'bg-teal-500'    // Teal
```

## 3️⃣ Add Images

### Option A: Local Images (Single)

1. Save image to `public/images/`
2. Reference as: `/images/my-photo.jpg`

```typescript
image: '/images/project-kickoff.jpg'
```

### Option B: Multiple Images (Carousel)

The timeline cards support image carousels! You can add multiple images in two ways:

#### Using Image Folders (Recommended)

1. Create a folder in `public/images/timeline/` with your event name:
   ```
   public/images/timeline/project-inception/
   ```

2. Add images with numbers in the filename for ordering:
   ```
   public/images/timeline/project-inception/
     1_kickoff-meeting.jpg
     2_team-brainstorm.jpg
     3_whiteboard-session.png
     photo_4.jpg
   ```
   
3. Reference the folder name in your event:
   ```typescript
   {
     id: '1',
     title: 'Project Inception',
     imageFolder: 'project-inception',  // Folder name
     image: '/fallback-image.jpg',       // Fallback if folder empty
     // ... other fields
   }
   ```

#### Using Images Array

Directly specify multiple image URLs:

```typescript
{
  id: '1',
  title: 'Project Inception',
  images: [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    'https://example.com/photo3.jpg'
  ],
  // ... other fields
}
```

#### Pre-created Folders

The following folders are ready for you to add images:
- `public/images/timeline/project-inception/`
- `public/images/timeline/research-phase/`
- `public/images/timeline/design-prototyping/`
- `public/images/timeline/development-sprint/`
- `public/images/timeline/testing-refinement/`
- `public/images/timeline/final-presentation/`

### Option C: External URLs

1. Add domain to `next.config.js`:
```javascript
images: {
  domains: [
    'images.unsplash.com',
    'your-domain.com',  // Add your domain
  ],
}
```

2. Use full URL:
```typescript
image: 'https://your-domain.com/image.jpg'
```

## 4️⃣ Add Team Members

### Directory-Based Auto-Loading (Recommended)

Team members are automatically loaded from the `public/team/` folder!

#### Step 1: Create Member Folder

```
public/team/John Doe/
```

#### Step 2: Create info.json

Create `public/team/John Doe/info.json`:

```json
{
  "name": "John Doe",
  "role": "Software Engineer",
  "city": "Lisbon",
  "bio": "Passionate about building scalable applications and learning new technologies. 5+ years of experience in full-stack development.",
  "skills": ["React", "TypeScript", "Node.js", "Python", "Docker"],
  "linkedin": "https://linkedin.com/in/johndoe",
  "email": "john.doe@example.com"
}
```

#### Step 3: Add Avatar Image

Add `public/team/John Doe/avatar.jpg` or `avatar.png`

#### Use the Template!

Copy the `public/team/_TEMPLATE/` folder as a starting point:

1. Copy `_TEMPLATE` folder
2. Rename to team member's name
3. Edit `info.json` with real data
4. Replace `avatar.jpg` with real photo
5. Done! Member will auto-load

### Member Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ Yes | Full name |
| `role` | string | ✅ Yes | Job title/role |
| `city` | string | ✅ Yes | City location |
| `bio` | string | ✅ Yes | Short biography (200-500 chars) |
| `skills` | string[] | ✅ Yes | Array of skill names |
| `linkedin` | string | ❌ No | LinkedIn profile URL |
| `email` | string | ❌ No | Email address |

### Tips for Team Members

- **Photos**: Use square images (400x400px+) for best results
- **Bio**: Keep to 2-3 sentences, highlight key achievements
- **Skills**: List 3-7 most relevant skills
- **LinkedIn**: Use full URL starting with https://
- **City**: Match cities shown on Portugal map

## 5️⃣ Add Photo Albums

### Directory-Based Auto-Loading (Easy!)

Albums are automatically loaded from the `public/albums/` folder!

#### Step 1: Create Album Folder

```
public/albums/Team Building 2025/
```

#### Step 2: Add Photos

Add photos directly to the album folder:

```
public/albums/Team Building 2025/
  ├── photo1.jpg
  ├── photo2.jpg
  ├── team_dinner.png
  ├── group_photo.jpg
  └── workshop.heic  # HEIC files auto-convert to JPEG!
```

#### That's it!

- Album title = folder name
- Album cover = first image
- Photos auto-sorted alphabetically
- HEIC files automatically converted

### Supported Image Formats

- **JPG/JPEG** ✅ Full support
- **PNG** ✅ Full support  
- **HEIC** ✅ Auto-converted to JPEG (iPhone photos!)
- **WebP** ✅ Modern format support
- **GIF** ❌ Not recommended (use video instead)

### Album Organization Tips

```
public/albums/
  ├── Team Building 2025/        # Events
  ├── Office Tour/               # Locations
  ├── Project Kickoff/           # Milestones
  ├── Hackathon Winners/         # Achievements
  └── Friday Social/             # Regular activities
```

### Photo Naming for Order

Photos are sorted alphabetically. Use prefixes for order:

```
public/albums/Project Demo/
  ├── 1_setup.jpg              # Will show first
  ├── 2_presentation.jpg       # Then this
  ├── 3_demo_live.jpg          # Then this
  └── 4_team_celebrating.jpg   # Last
```

Or use dates:

```
  ├── 2025-09-01_kickoff.jpg
  ├── 2025-09-15_progress.jpg
  └── 2025-09-30_completion.jpg
```

## 6️⃣ Customize Map Locations

**File**: `src/data/teamLocations.ts`

### Add Location Pin

```typescript
{
  id: 6,
  city: 'Aveiro',
  x: 330,          // X coordinate (0-600)
  y: 240,          // Y coordinate (0-700)
  memberCount: 2,  // Number of team members
  memberNames: ['Alice', 'Bob'],  // Optional: member names
}
```

### Coordinate Guide

The Portugal map has dimensions 600 x 700:

| Region | X Range | Y Range |
|--------|---------|---------|
| **Porto/Braga** (North) | 300-330 | 150-200 |
| **Coimbra/Aveiro** (Center-West) | 320-350 | 240-300 |
| **Lisbon** (Center) | 370-400 | 370-390 |
| **Évora** (Center-East) | 410-440 | 400-440 |
| **Faro** (South) | 360-400 | 500-540 |

### Update Cisco Office Location

```typescript
export const ciscoLocation = {
  city: 'Lisbon',
  address: 'Cisco Office Lisbon',  // Change this
  x: 385,                          // Position on map
  y: 380,
};
```

See [CUSTOMIZE_LOCATIONS.md](CUSTOMIZE_LOCATIONS.md) for detailed map customization guide.

## 7️⃣ Customize Colors

**File**: `tailwind.config.ts`

### Change Primary Color

```typescript
colors: {
  primary: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    // ... to
    900: '#0c4a6e',  // Darkest
  },
}
```

### Change Header Gradient

**File**: `src/components/ui/Header.tsx`

```typescript
<header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
  // Change colors: from-[color] via-[color] to-[color]
</header>
```

### Change Background

**File**: `src/app/page.tsx`

```typescript
<main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
  // Adjust gradient colors
</main>
```

## 8️⃣ Adjust Animations

**File**: `src/components/timeline/TimelineEvent.tsx`

### Change Animation Speed

```typescript
const cardVariants = {
  visible: {
    transition: {
      duration: 0.6,  // Change this (seconds)
      delay: index * 0.2,  // Delay between items
    },
  },
};
```

### Change Animation Direction

```typescript
const cardVariants = {
  hidden: {
    x: isLeft ? -100 : 100,  // Change distance
    opacity: 0,
  },
};
```

### Disable Animations

```typescript
// Change from:
animate={isInView ? 'visible' : 'hidden'}

// To:
animate='visible'
```

## 9️⃣ Update Site Metadata

**File**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Timeline Title',
  description: 'Your timeline description for SEO',
}
```

## 🔟 Customize Typography

**File**: `src/app/layout.tsx`

Change the font:

```typescript
// Default: Inter
import { Inter } from 'next/font/google'

// Change to another font:
import { Roboto } from 'next/font/google'
const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
})
```

## 8️⃣ Add More Event Categories

**File**: `src/components/timeline/TimelineEvent.tsx`

The category badge automatically styles based on your category name. Just add categories to your events!

## 🎯 Common Patterns

### Full Event Example

```typescript
{
  id: 'unique-1',
  title: 'Project Launch',
  date: 'March 2026',
  description: 'Successfully launched the product with 1000+ users in the first week.',
  image: '/images/launch.jpg',
  icon: 'rocket',
  color: 'bg-blue-500',
  category: 'Milestone',
}
```

### Minimal Event Example

```typescript
{
  id: 'unique-2',
  title: 'Team Meeting',
  date: 'April 2026',
  description: 'Quarterly review and planning session.',
}
```

## 🔧 Advanced Customization

### Add New Icon

1. Import from Lucide React:
```typescript
import { Star } from 'lucide-react';
```

2. Add to iconMap:
```typescript
const iconMap = {
  // ... existing icons
  'star': Star,
};
```

3. Use in data:
```typescript
icon: 'star'
```

### Change Timeline Line Style

**File**: `src/components/timeline/Timeline.tsx`

```typescript
<motion.div
  className="w-1 bg-gradient-to-b from-blue-400 to-pink-400"
  // Change: width (w-1, w-2), colors, add patterns
/>
```

### Customize Card Hover Effect

**File**: `src/components/timeline/TimelineEvent.tsx`

```typescript
<motion.div
  whileHover={{ 
    y: -5,           // Lift amount
    scale: 1.02,     // Zoom amount
  }}
  transition={{ duration: 0.3 }}
/>
```

## 💡 Tips & Best Practices

### Timeline
1. **Images**: Use consistent aspect ratios (16:9 or 4:3) for best results
2. **Descriptions**: Keep under 150 characters for optimal readability
3. **Colors**: Use same color for related event categories
4. **Events**: Aim for 4-10 events for best visual impact

### Team Members
1. **Photos**: Use square images (400x400px+), well-lit headshots
2. **Bios**: 2-3 sentences highlighting key achievements
3. **Skills**: List 3-7 most relevant technical/soft skills
4. **Consistency**: Use similar photo styles across all members

### Albums
1. **Organization**: Group photos by event/theme for easy browsing
2. **Quality**: Use high-resolution photos (1000px+ width)
3. **Variety**: Mix group photos with action shots
4. **Captions**: Add descriptive names to folders
5. **HEIC**: iPhone photos auto-convert - just upload!

### General
1. **Testing**: Test on mobile devices - over 50% of users will view there!
2. **Performance**: Optimize large images before uploading (< 2MB each)
3. **Accessibility**: Use descriptive alt text for images
4. **Browser Testing**: Check in Chrome, Firefox, Safari, Edge

## 🆘 Troubleshooting

### Timeline Issues

| Issue | Solution |
|-------|----------|
| Image not showing | Check path, add domain to next.config.js |
| Animation too fast | Increase `duration` value in component |
| Colors not working | Use Tailwind color classes (bg-blue-500) |
| Icon not appearing | Check iconMap has your icon name |
| Layout broken | Ensure all events have required fields |
| Carousel not working | Check imageFolder name matches actual folder |

### Team Member Issues

| Issue | Solution |
|-------|----------|
| Member not showing | Check folder name, ensure info.json is valid JSON |
| Avatar broken | Check filename is avatar.jpg or avatar.png |
| Skills not displaying | Ensure skills is an array: ["skill1", "skill2"] |
| JSON error | Validate JSON at jsonlint.com |
| Member details missing | Ensure all required fields filled in info.json |

### Album Issues

| Issue | Solution |
|-------|----------|
| Album not showing | Check folder name, ensure photos exist |
| Photos not loading | Check file format (JPG, PNG, HEIC, WebP) |
| Wrong order | Rename files with numbers: 1_photo.jpg, 2_photo.jpg |
| HEIC not working | Server will auto-convert, wait a moment for processing |
| Images too large | Compress images before upload (use TinyPNG.com) |

### Map Issues

| Issue | Solution |
|-------|----------|
| Pin in wrong place | Adjust x, y coordinates in teamLocations.ts |
| Pin not showing | Check id is unique, coordinates in valid range |
| Click not working | Ensure onClick handlers are set up |
| Map not responsive | Check SVG viewBox and container sizing |

---

**Need more help?** Check these guides:
- [README.md](README.md) - Full documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
- [HOW_TO_RUN.md](HOW_TO_RUN.md) - Setup instructions
- [TEAM_GUIDE.md](TEAM_GUIDE.md) - Team members guide
- [ALBUMS_GUIDE.md](ALBUMS_GUIDE.md) - Photo albums guide
- [CUSTOMIZE_LOCATIONS.md](CUSTOMIZE_LOCATIONS.md) - Map customization
