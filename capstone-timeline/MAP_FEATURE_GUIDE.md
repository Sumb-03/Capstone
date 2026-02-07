# 🗺️ Interactive Map Features Guide

## Overview

Your capstone timeline website features **three interactive views** creating a engaging navigation experience:

1. **Europe Map** (Landing) - Animated Europe with Portugal highlighted
2. **Portugal Map** - Team locations across Portugal with interactive pins
3. **Main Content** - Timeline, Team Members, and Photo Albums

This guide explains how the maps work and how to customize them.

## User Experience Flow

```
1. Landing Page (Europe Map)
   └─> Portugal is highlighted and pulsing
   └─> Animated background effects
   └─> "Click Portugal to Explore" button
        │
        ▼
2. Click Interaction
   └─> Smooth transition animation
   └─> Map zooms out and fades
        │
        ▼
3. Timeline View
   └─> Animated timeline appears
   └─> Events load with staggered animations
   └─> "Back to Map" button in top-left
        │
        ▼
4. Return to Map (Optional)
   └─> Click back button
   └─> Smooth reverse transition
```

## Visual Features

### Europe Map Component

**Location**: `src/components/map/EuropeMap.tsx`

#### Interactive Elements:

1. **Portugal Highlighting**
   - Red gradient coloring
   - Pulsing scale animation (1x → 1.05x → 1x)
   - Golden border stroke
   - Hover effect scales to 1.1x

2. **Visual Effects**
   - Animated glow effect around Portugal
   - Pulsing dot marker on Lisbon
   - Floating gradient orbs in background
   - Other European countries shown in muted colors

3. **Click Interactions**
   - Click directly on Portugal
   - Click the button below the map
   - Both trigger the same transition to timeline

### Transition Animations

**Location**: `src/app/page.tsx`

#### Map → Timeline Transition:
```typescript
Map exits:
  - Fades out (opacity: 1 → 0)
  - Scales down slightly (scale: 1 → 0.9)
  - Duration: 0.5s

Timeline enters:
  - Fades in (opacity: 0 → 1)
  - Slides up from below (y: 100 → 0)
  - Scales in (scale: 1.1 → 1)
  - Duration: 0.6s
```

#### Timeline → Map Transition:
```typescript
Timeline exits:
  - Fades out (opacity: 1 → 0)
  - Slides up (y: 0 → -100)
  - Scales down (scale: 1 → 0.9)
  - Duration: 0.4s

Map enters:
  - Reverses entry animation
```

## Customization Options

### Change the Highlighted Country

Currently Portugal is highlighted. To change to another country:

1. **Edit the SVG path** in `EuropeMap.tsx`:
   ```typescript
   // Find this section (around line 90)
   <motion.path
     d="M 120 450 L 100 480..." // Portugal's coordinates
   ```

2. **Get new coordinates**:
   - Use an SVG editor (Figma, Illustrator, etc.)
   - Or find SVG map coordinates online
   - Replace the path data

3. **Update text references**:
   ```typescript
   // Change "Portugal" to your country
   <p className="text-yellow-400 font-bold text-lg">Portugal</p>
   
   // Update button text
   Click Portugal to Explore Timeline
   ```

### Change Colors

**Portugal Colors** (Red theme):
```typescript
// In EuropeMap.tsx, linearGradient
<stop offset="0%" stopColor="#ef4444" />  // Red-500
<stop offset="50%" stopColor="#dc2626" /> // Red-600
<stop offset="100%" stopColor="#b91c1c" /> // Red-700
```

**Glow Color**:
```typescript
<stop offset="0%" stopColor="#fbbf24" /> // Amber-400 (gold)
```

**Background Gradient**:
```typescript
className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
```

### Disable Map Feature (Show Timeline Directly)

If you want to skip the map and show the timeline immediately:

**Option 1 - Simple Change** (`src/app/page.tsx`):
```typescript
// Change this line:
const [showTimeline, setShowTimeline] = useState(false);

// To:
const [showTimeline, setShowTimeline] = useState(true);
```

**Option 2 - Remove Completely**:
Replace the entire `page.tsx` with the original timeline-only version (check git history or ARCHITECTURE.md).

### Adjust Animation Speeds

**Map Pulse Speed** (`EuropeMap.tsx`):
```typescript
transition={{
  scale: {
    duration: 2, // Change this (seconds)
    repeat: Infinity,
  }
}}
```

**Transition Speed** (`page.tsx`):
```typescript
transition={{ 
  duration: 0.6, // Change this (seconds)
  ease: 'easeOut'
}}
```

## Technical Details

### State Management

```typescript
const [showTimeline, setShowTimeline] = useState(false);

// false = Show map
// true = Show timeline
```

### Component Hierarchy

```
page.tsx (Main Component)
│
├─ AnimatePresence (Framer Motion)
│  │
│  ├─ Conditional: !showTimeline
│  │  └─ EuropeMap
│  │     └─ onPortugalClick={() => setShowTimeline(true)}
│  │
│  └─ Conditional: showTimeline
│     └─ Timeline View
│        ├─ Back Button (onClick: setShowTimeline(false))
│        ├─ Header
│        └─ Timeline
```

### Performance Considerations

- **SVG Optimization**: Map uses simplified SVG paths for performance
- **Lazy Loading**: Timeline components don't render until clicked
- **Animation Efficiency**: Uses CSS transforms (hardware accelerated)
- **Framer Motion**: Optimized animation library with automatic cleanup

## Accessibility

### Keyboard Navigation
Currently the map is click-only. To add keyboard support:

```typescript
// Add to the Portugal <motion.g> element
onKeyPress={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onPortugalClick();
  }
}}
tabIndex={0}
role="button"
aria-label="Click to view timeline"
```

### Screen Readers
The map includes semantic HTML and ARIA labels. Timeline is already accessible.

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: SVG animations require modern browsers. For IE11 support, consider a fallback or skip the map.

## Common Issues & Solutions

### Map doesn't show
- Check browser console for errors
- Verify SVG is rendering (inspect element)
- Check viewport dimensions

### Transition feels slow
- Reduce `duration` values in transition configs
- Remove some animation properties (scale, rotate)

### Portugal click not working
- Check onClick handler is connected
- Verify state management in page.tsx
- Check browser console for errors

### Back button not appearing
- Check fixed positioning CSS
- Verify z-index is high enough (z-50)
- Check showTimeline state

## Future Enhancements

Ideas for extending the map feature:

1. **Multiple Countries**: Click different countries for different timelines
2. **Animated Paths**: Show travel/connection lines between locations
3. **Zoom Feature**: Click to zoom into Portugal before showing timeline
4. **Info Tooltips**: Hover tooltips on countries with quick facts
5. **3D Effect**: Add parallax or 3D perspective to the map
6. **Custom Markers**: Add pins/markers for specific locations
7. **Legend**: Add a map legend explaining the project's geographic context

## Examples of Customization

### Example 1: Change to Spain
```typescript
// Update Portugal path to Spain coordinates
d="M 180 450 L 150 480 L 150 520 L 180 560 L 240 560 L 280 540 L 300 500 L 280 460 L 240 450 Z"

// Update text
<p className="text-yellow-400 font-bold text-lg">Spain</p>

// Update button
"Click Spain to Explore Timeline"
```

### Example 2: Add Multiple Clickable Countries
```typescript
// In page.tsx
const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

// Pass country-specific data to Timeline
{selectedCountry && <Timeline events={getEventsForCountry(selectedCountry)} />}
```

### Example 3: Add Loading State
```typescript
const [isLoading, setIsLoading] = useState(false);

const handlePortugalClick = async () => {
  setIsLoading(true);
  // Simulate data loading
  await new Promise(resolve => setTimeout(resolve, 1000));
  setShowTimeline(true);
  setIsLoading(false);
};
```

---

**Questions?** Check the main [README.md](README.md) or [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for more details!
