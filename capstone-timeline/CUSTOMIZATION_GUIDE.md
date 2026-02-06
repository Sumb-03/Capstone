# 🎨 Timeline Customization Guide

Quick reference for customizing your timeline website.

## 📋 Quick Checklist

- [ ] Update timeline title and subtitle
- [ ] Add your timeline events
- [ ] Replace placeholder images
- [ ] Customize colors
- [ ] Adjust animation speeds
- [ ] Update metadata (title, description)

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

## 4️⃣ Customize Colors

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

## 5️⃣ Adjust Animations

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

## 6️⃣ Update Site Metadata

**File**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Timeline Title',
  description: 'Your timeline description for SEO',
}
```

## 7️⃣ Customize Typography

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

## 💡 Tips

1. **Images**: Use consistent aspect ratios (16:9 or 4:3) for best results
2. **Descriptions**: Keep under 150 characters for optimal readability
3. **Colors**: Use same color for related event categories
4. **Events**: Aim for 4-10 events for best visual impact
5. **Testing**: Test on mobile devices - over 50% of users will view there!

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Image not showing | Check path, add domain to next.config.js |
| Animation too fast | Increase `duration` value |
| Colors not working | Use Tailwind color classes (bg-blue-500) |
| Icon not appearing | Check iconMap has your icon name |
| Layout broken | Ensure all events have required fields |

---

**Need more help?** Check the [README.md](README.md) for full documentation!
