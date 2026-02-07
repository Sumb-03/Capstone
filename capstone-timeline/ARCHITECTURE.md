# 🏗️ Project Architecture

## Tech Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│         Next.js 14 (App Router) + TypeScript               │
│   React 18 | Server Actions | API Routes | File System      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐   ┌───────▼────────┐
│ Framer Motion  │  │ Tailwind CSS │   │   Radix UI     │
│  Animations    │  │   Styling    │   │   Components   │
└────────────────┘  └──────────────┘   └────────────────┘
```

## Application Flow & Component Hierarchy

```
App (Root Layout - layout.tsx)
├── Metadata (Title, Description, Favicon)
├── Fonts (Inter)
└── Global Styles

Main Page (page.tsx)
├── State Management
│   ├── currentView: 'europe' | 'portugal' | 'main'
│   ├── currentTab: 'timeline' | 'members' | 'albums'
│   ├── URL Hash Navigation (/#europe, /#portugal, /#main/timeline)
│   └── Browser Back/Forward Support
│
├── Cisco Logo (clickable → returns to Europe map)
│
├── View Router (AnimatePresence)
│   │
│   ├── Europe Map View (Landing)
│   │   ├── EuropeMap Component
│   │   │   ├── SVG Europe Countries (muted)
│   │   │   ├── Portugal (highlighted, pulsing)
│   │   │   ├── Animated Background (gradient orbs)
│   │   │   ├── Glow Effects
│   │   │   └── Click Handler → Portugal View
│   │   └── "Click to Explore" Button
│   │
│   ├── Portugal Map View
│   │   ├── PortugalMap Component
│   │   │   ├── SVG Portugal Shape
│   │   │   ├── Team Location Pins
│   │   │   │   ├── City markers with member counts
│   │   │   │   ├── Pulsing animations
│   │   │   │   └── Hover effects
│   │   │   ├── Cisco Office Location (special pin)
│   │   │   ├── Location Details Modal
│   │   │   └── Click Cisco → Main Content
│   │   ├── Back Button (→ Europe Map)
│   │   └── Animated Background
│   │
│   └── Main Content View
│       ├── Header (Title, Subtitle)
│       ├── Tab Navigation
│       │   ├── Timeline Tab (Clock icon)
│       │   ├── Team Tab (Users icon)
│       │   └── Albums Tab (Image icon)
│       │
│       ├── Tab Content (AnimatePresence)
│       │   │
│       │   ├── Timeline Component
│       │   │   ├── Vertical Timeline Line
│       │   │   └── Timeline Events (Array)
│       │   │       ├── TimelineEvent Component
│       │   │       │   ├── Image Carousel (if multiple images)
│       │   │       │   │   ├── Navigation arrows
│       │   │       │   │   ├── Dot indicators
│       │   │       │   │   └── Auto-loaded from folders
│       │   │       │   ├── Icon Node (colored circle)
│       │   │       │   ├── Event Card
│       │   │       │   │   ├── Date
│       │   │       │   │   ├── Title
│       │   │       │   │   ├── Description
│       │   │       │   │   └── Category Badge
│       │   │       │   └── Scroll-triggered Animations
│       │   │       │       ├── Fade in
│       │   │       │       ├── Slide from side
│       │   │       │       └── Scale effect
│       │   │       └── Alternating Layout (left/right on desktop)
│       │   │
│       │   ├── Members Component
│       │   │   ├── Team Member Grid
│       │   │   ├── Member Cards
│       │   │   │   ├── Avatar Image
│       │   │   │   ├── Name & Role
│       │   │   │   ├── City Location
│       │   │   │   ├── Skills Tags
│       │   │   │   └── Click → Modal
│       │   │   ├── Member Detail Modal (Radix Dialog)
│       │   │   │   ├── Large Avatar
│       │   │   │   ├── Full Bio
│       │   │   │   ├── Skills List
│       │   │   │   ├── Contact Links (LinkedIn, Email)
│       │   │   │   └── Close Button
│       │   │   └── Loading & Error States
│       │   │
│       │   └── Albums Component
│       │       ├── View Mode Toggle
│       │       │   ├── Albums View (default)
│       │       │   └── All Photos View
│       │       │
│       │       ├── Albums View
│       │       │   ├── Album Grid (cover images)
│       │       │   └── Click Album → Photo Grid
│       │       │
│       │       ├── Photo Grid (masonry-style)
│       │       │   ├── Responsive columns
│       │       │   └── Click Photo → Lightbox
│       │       │
│       │       ├── Lightbox Viewer (Radix Dialog)
│       │       │   ├── Full-screen Image
│       │       │   ├── Navigation (prev/next)
│       │       │   ├── Image Info (caption, date)
│       │       │   ├── Keyboard Controls
│       │       │   └── Close Button
│       │       │
│       │       └── Loading & Error States
│       │
│       └── Back Button (→ Portugal Map)
```

## File Structure & Responsibilities

```
src/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout, fonts, metadata
│   ├── page.tsx                     # Main page, view/tab state, navigation
│   ├── globals.css                  # Global styles, animations, scrollbar
│   │
│   └── api/                         # API Routes (Server-side)
│       ├── albums/
│       │   └── route.ts            # Auto-load albums from public/albums/
│       ├── team/
│       │   └── route.ts            # Auto-load members from public/team/
│       ├── timeline/
│       │   └── route.ts            # Load timeline from timelineData.ts
│       └── timeline-images/
│           └── route.ts            # Auto-load timeline images from folders
│
├── components/
│   ├── albums/
│   │   └── Albums.tsx              # Album gallery, photo grid, lightbox
│   │
│   ├── map/
│   │   ├── EuropeMap.tsx           # Landing page Europe map
│   │   └── PortugalMap.tsx         # Portugal map with location pins
│   │
│   ├── members/
│   │   └── Members.tsx             # Team profiles, cards, member modal
│   │
│   ├── timeline/
│   │   ├── Timeline.tsx            # Timeline container, vertical line
│   │   └── TimelineEvent.tsx       # Event cards, image carousels, animations
│   │
│   └── ui/                         # Reusable UI Components
│       ├── button.tsx              # Button component (Radix)
│       ├── card.tsx                # Card component
│       ├── dialog.tsx              # Modal dialog (Radix)
│       ├── Header.tsx              # Hero header section
│       └── CiscoLogo.tsx           # Cisco logo component
│
├── data/                           # Static Data Files
│   ├── albumsData.ts               # ⚠️ Fallback albums (if API fails)
│   ├── membersData.ts              # ⚠️ Fallback members (if API fails)
│   ├── teamLocations.ts            # ⭐ EDIT: Portugal map pins & locations
│   └── timelineData.ts             # ⭐ EDIT: Timeline events & milestones
│
├── types/
│   └── timeline.ts                 # TypeScript interfaces & types
│
└── lib/
    └── utils.ts                    # Utility functions (cn, classnames)

public/                             # Static Assets (User Content)
│
├── albums/                         # ⭐ ADD YOUR ALBUMS HERE
│   ├── Album Name 1/               # Each folder = 1 album
│   │   ├── photo1.jpg
│   │   ├── photo2.png
│   │   └── photo3.heic             # HEIC auto-converted
│   └── Album Name 2/
│       └── ...
│
├── images/
│   ├── cisco-logo.png              # Cisco logo (clickable)
│   └── timeline/                   # ⭐ ADD TIMELINE IMAGES HERE
│       ├── event-name-1/           # Folder name matches timeline event
│       │   ├── 1_image.jpg         # Numbered for ordering
│       │   ├── 2_image.jpg
│       │   └── 3_image.png
│       └── event-name-2/
│           └── ...
│
└── team/                           # ⭐ ADD TEAM MEMBERS HERE
    ├── _TEMPLATE/                  # Copy this for new members
    │   ├── info.json               # Member details template
    │   └── avatar.jpg
    ├── Member Name 1/
    │   ├── info.json               # Name, role, bio, skills, etc.
    │   └── avatar.jpg              # Profile photo
    └── Member Name 2/
        └── ...
```

**Legend:**
- **⭐ EDIT** - Files you should customize
- **⚠️ Fallback** - Used if API/folder loading fails
- **API Routes** - Automatically scan folders and generate data

## Data Flow

### Timeline Data Flow
```
timelineData.ts (Static)
       │
       ▼
/api/timeline (API Route)
       │
       ├─> Reads timelineData.ts
       ├─> Returns events array
       │
       ▼
page.tsx (Main Component)
       │
       ├─> useEffect: fetch('/api/timeline')
       ├─> Updates: setTimelineEvents()
       │
       ▼
Timeline.tsx (Container)
       │
       ├─> Receives: events prop
       ├─> Maps over events
       │
       ▼
TimelineEvent.tsx (Card)
       │
       ├─> Displays: title, date, description
       ├─> Loads images from imageFolder
       ├─> Renders: carousel or single image
       │
       ▼
Browser Display
```

### Team Members Data Flow
```
public/team/                # File System
  ├── John Doe/
  │   ├── info.json        # Member details
  │   └── avatar.jpg
  └── Jane Smith/
      └── ...
       │
       ▼
/api/team (API Route)
       │
       ├─> Scans: public/team/ folders
       ├─> Reads: each info.json
       ├─> Constructs: members array
       ├─> Returns: JSON response
       │
       ▼
Members.tsx (Component)
       │
       ├─> useEffect: fetch('/api/team')
       ├─> Updates: setMembers()
       ├─> Renders: member cards grid
       │
       ▼
Click Member → Member Modal
       │
       ├─> Shows: full profile
       ├─> Displays: avatar, bio, skills
       └─> Links: LinkedIn, email
       │
       ▼
Browser Display
```

### Albums Data Flow
```
public/albums/              # File System
  ├── Team Building/
  │   ├── photo1.jpg
  │   ├── photo2.png
  │   └── photo3.heic      # HEIC auto-converted
  └── Office Life/
      └── ...
       │
       ▼
/api/albums (API Route)
       │
       ├─> Scans: public/albums/ folders
       ├─> Reads: image files (JPG, PNG, HEIC)
       ├─> Converts: HEIC → JPEG (using Sharp)
       ├─> Constructs: albums array
       │   ├─> Album: { id, title, photos[] }
       │   └─> Photo: { id, src, alt }
       ├─> Returns: JSON response
       │
       ▼
Albums.tsx (Component)
       │
       ├─> useEffect: fetch('/api/albums')
       ├─> Updates: setAlbums()
       ├─> Renders: album covers OR photo grid
       │
       ▼
View Mode:
  │
  ├─> Albums View: Grid of album covers
  │       │
  │       └─> Click Album → Photo Grid
  │               │
  │               └─> Click Photo → Lightbox
  │
  └─> All Photos View: All photos in masonry grid
          │
          └─> Click Photo → Lightbox
              │
              ├─> Full-screen image
              ├─> Navigation arrows
              └─> Keyboard controls
       │
       ▼
Browser Display
```

### Timeline Images Data Flow
```
public/images/timeline/     # File System
  ├── project-inception/
  │   ├── 1_kickoff.jpg    # Numbered for order
  │   ├── 2_meeting.jpg
  │   └── 3_whiteboard.png
  └── research-phase/
      └── ...
       │
       ▼
/api/timeline-images (API Route)
       │
       ├─> Receives: ?folder=project-inception
       ├─> Scans: public/images/timeline/project-inception/
       ├─> Sorts: by filename (1_, 2_, 3_...)
       ├─> Returns: array of image paths
       │
       ▼
TimelineEvent.tsx (Component)
       │
       ├─> Has: imageFolder prop
       ├─> useEffect: fetch(`/api/timeline-images?folder=${imageFolder}`)
       ├─> Updates: images state
       ├─> Renders: image carousel
       │   ├─> Current image (center)
       │   ├─> Navigation arrows
       │   └─> Dot indicators
       │
       ▼
User Interaction:
  ├─> Click next/prev arrow
  ├─> Click dot indicator
  └─> Images fade/slide transition
       │
       ▼
Browser Display
```

### Map Locations Data Flow
```
teamLocations.ts (Static Data)
       │
       ├─> Array of locations:
       │   ├─> { city, x, y, memberCount, memberNames }
       │   └─> { ciscoLocation: {...} }
       │
       ▼
PortugalMap.tsx (Component)
       │
       ├─> Imports: teamLocations
       ├─> Maps locations to pins
       ├─> Renders: SVG circles at (x, y)
       ├─> Adds: pulsing animations
       │
       ▼
User Interaction:
  ├─> Hover pin → Show city name
  ├─> Click pin → Show location modal
  │       └─> Display: city, member count, names
  └─> Click Cisco → Navigate to main content
       │
       ▼
Browser Display
```

## Animation & Transition Flow

### Page View Transitions

```
1. Europe Map (Landing)
   └─> Initial Load
       ├─> Map fades in (opacity: 0 → 1)
       ├─> Map scales in (scale: 0.8 → 1)
       ├─> Portugal pulses (scale: 1 → 1.05 → 1)
       └─> Background orbs float

2. Click Portugal
   └─> Transition: Europe → Portugal
       ├─> Europe map exits:
       │   ├─> Scales up & moves (zoom into Portugal)
       │   ├─> Opacity fades out
       │   └─> Duration: 0.8s
       ├─> Portugal map enters:
       │   ├─> Scales in from small (0.3 → 1)
       │   ├─> Opacity fades in
       │   └─> Location pins appear with stagger
       └─> URL updates: /#portugal

3. Click Cisco Location
   └─> Transition: Portugal → Main Content
       ├─> Portugal map exits:
       │   ├─> Scales up & zooms
       │   ├─> Opacity fades out
       │   └─> Duration: 0.7s
       ├─> Main content enters:
       │   ├─> Fades in (opacity: 0 → 1)
       │   ├─> Slides up (y: 50 → 0)
       │   └─> Tab content animates in
       └─> URL updates: /#main/timeline

4. Click Cisco Logo
   └─> Return to Europe Map
       ├─> Current view exits (reverse animation)
       └─> Europe map re-enters
       └─> URL updates: /#europe

5. Tab Switching (Timeline/Team/Albums)
   └─> Smooth Tab Transition
       ├─> Current tab exits:
       │   ├─> Fades out (opacity: 1 → 0)
       │   ├─> Slides up (y: 0 → -20)
       │   └─> Duration: 0.2s
       ├─> New tab enters:
       │   ├─> Fades in (opacity: 0 → 1)
       │   ├─> Slides down (y: 20 → 0)
       │   └─> Duration: 0.3s
       └─> URL updates: /#main/[tab-name]
```

### Timeline Scroll Animations

```
1. User Scrolls to Timeline
   └─> Timeline enters viewport
       ├─> Vertical line extends (height: 0 → 100%)
       └─> Events start animating in sequence

2. Each Event Enters Viewport
   └─> Scroll-triggered Animation (useInView)
       ├─> Icon animates:
       │   ├─> Scales in (scale: 0 → 1)
       │   ├─> Rotates (rotate: -180deg → 0)
       │   └─> Background pulse effect
       │
       ├─> Card animates:
       │   ├─> Fades in (opacity: 0 → 1)
       │   ├─> Slides in from side:
       │   │   ├─> Left events: x: -100 → 0
       │   │   └─> Right events: x: 100 → 0
       │   └─> Scales slightly (scale: 0.95 → 1)
       │
       └─> Stagger effect (each event delayed by 0.1s)

3. User Hovers Event Card
   └─> Hover Interaction
       ├─> Card lifts (translateY: 0 → -8px)
       ├─> Shadow increases (shadow-lg → shadow-2xl)
       └─> Border color brightens
```

### Image Carousel Animations

```
1. Multiple Images Detected
   └─> Carousel Renders
       ├─> First image displays
       ├─> Navigation arrows appear
       └─> Dot indicators show

2. User Clicks Next Arrow
   └─> Image Transition
       ├─> Current image exits:
       │   ├─> Fades out (opacity: 1 → 0)
       │   ├─> Slides left (x: 0 → -50)
       │   └─> Duration: 0.3s
       ├─> Next image enters:
       │   ├─> Fades in (opacity: 0 → 1)
       │   ├─> Slides in from right (x: 50 → 0)
       │   └─> Duration: 0.3s
       └─> Dot indicator updates

3. Keyboard Navigation
   └─> Arrow keys → Same transition
```

### Modal & Dialog Animations

```
1. Click Team Member Card
   └─> Member Modal Opens
       ├─> Overlay fades in (backdrop blur)
       ├─> Modal content:
       │   ├─> Scales in (scale: 0.95 → 1)
       │   ├─> Fades in (opacity: 0 → 1)
       │   └─> Slides up (y: 20 → 0)
       └─> Focus trapped in modal

2. Click Album Photo
   └─> Lightbox Opens
       ├─> Full-screen overlay
       ├─> Image zooms in (scale: 0.8 → 1)
       ├─> Navigation UI fades in
       └─> Keyboard controls active

3. Close Modal/Lightbox
   └─> Reverse Animation
       ├─> Content exits (reverse enter animation)
       ├─> Overlay fades out
       └─> Focus returns to trigger element
```

## State Management & Navigation

### URL-Based State (Hash Navigation)

```
Component: page.tsx

State Variables:
├─> currentView: 'europe' | 'portugal' | 'main'
└─> currentTab: 'timeline' | 'members' | 'albums'

URL Patterns:
├─> /#europe          → Europe map view
├─> /#portugal        → Portugal map view
├─> /#main/timeline   → Main content, Timeline tab
├─> /#main/members    → Main content, Team tab
└─> /#main/albums     → Main content, Albums tab

State Synchronization:
├─> URL change → Update component state
├─> State change → Update URL hash
├─> Browser back/forward → Restore state from URL
└─> Direct URL access → Initialize to correct view
```

### Component-Level State

```
Timeline Component:
├─> timelineEvents: TimelineEvent[]    # Array of timeline events
└─> Loading state from API

Members Component:
├─> members: TeamMember[]              # Array of team members
├─> selectedMember: TeamMember | null  # Current member in modal
├─> imageError: Record<string, boolean> # Track image load failures
└─> loading, error states

Albums Component:
├─> albums: Album[]                    # Array of albums
├─> selectedAlbum: Album | null        # Currently viewing album
├─> selectedPhoto: Photo | null        # Photo in lightbox
├─> currentPhotoIndex: number          # Current photo position
├─> viewMode: 'albums' | 'all'        # View toggle state
├─> imageError: Record<string, boolean> # Track image load failures
└─> loading, error states

TimelineEvent Component:
├─> images: string[]                   # Array of image URLs
├─> currentImageIndex: number          # Current carousel position
├─> imageError: boolean                # Image load failure
└─> Loading state from API
```

## Styling System

```
┌──────────────────────────────────────────────────────┐
│              Tailwind CSS (Utility-First)            │
├──────────────────────────────────────────────────────┤
│ • Responsive breakpoints (sm, md, lg, xl, 2xl)       │
│ • Comprehensive color system (50-950 shades)         │
│ • Spacing scale (0-96, arbitrary values)             │
│ • Flexbox & Grid utilities                           │
│ • Typography & font sizes                            │
│ • Shadows, borders, animations                       │
└──────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ tailwind.config│  │  globals.css   │  │   Components   │
│      .ts       │  │                │  │                │
├────────────────┤  ├────────────────┤  ├────────────────┤
│ • Dark theme   │  │ • Custom       │  │ • Inline       │
│ • Custom colors│  │   scrollbar    │  │   Tailwind     │
│ • Animations   │  │ • @layer       │  │   classes      │
│ • Extend theme │  │   utilities    │  │ • Conditional  │
│                │  │ • Global resets│  │   classes (cn) │
└────────────────┘  └────────────────┘  └────────────────┘
```

## Responsive Breakpoints & Layouts

```
Mobile (default, <768px)
┌─────────────────────┐
│     Cisco Logo      │
│ ┌─────────────────┐ │
│ │   Europe Map    │ │
│ │   (Compact)     │ │
│ └─────────────────┘ │
│                     │
│  [Explore Button]   │
└─────────────────────┘

 ──onClick Portugal──►

┌─────────────────────┐
│   ← Back to Map     │
│ ┌─────────────────┐ │
│ │  Portugal Map   │ │
│ │   (Portrait)    │ │
│ │   • Pins        │ │
│ └─────────────────┘ │
└─────────────────────┘

 ──onClick Cisco────►

┌─────────────────────┐
│   Project Title     │
│ ─────────────────── │
│ Timeline | Team     │
│ ─────────────────── │
│  ┌───────────────┐  │
│  │    Event 1    │  │
│  │  • Details    │  │
│  └───────────────┘  │
│        │            │
│        •            │
│        │            │
│  ┌───────────────┐  │
│  │    Event 2    │  │
│  └───────────────┘  │
└─────────────────────┘
  Vertical stacked
  timeline layout

Tablet (md, 768px - 1023px)
┌────────────────────────────────┐
│         Cisco Logo       →     │
│  ┌──────────────────────────┐  │
│  │     Europe Map           │  │
│  │   (Wider aspect)         │  │
│  └──────────────────────────┘  │
│                                │
│      [Click to Explore]        │  
└────────────────────────────────┘

 ──onClick Portugal──►

┌────────────────────────────────┐
│    ← Back                      │
│  ┌──────────────────────────┐  │
│  │    Portugal Map           │  │
│  │    (Landscape)            │  │
│  │    • Team Pins            │  │
│  │    • Cisco Office         │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘

 ──onClick Cisco────►

┌────────────────────────────────┐
│       Project Title            │
│ ────────────────────────────── │
│ Timeline  |  Team  |  Albums   │
│ ────────────────────────────── │
│  ┌──────────┐     ┌──────────┐ │
│  │ Event 1  │  •  │          │ │
│  │          │     │          │ │
│  └──────────┘     └──────────┘ │
│                •                │
│  ┌──────────┐     ┌──────────┐ │
│  │          │     │ Event 2  │ │
│  └──────────┘     └──────────┘ │
└────────────────────────────────┘
  Alternating cards appear
  2-column grids for team/albums

Desktop (lg+, 1024px+)
┌──────────────────────────────────────────┐
│                 Cisco Logo         →     │
│    ┌──────────────────────────────┐      │
│    │       Europe Map             │      │
│    │   (Full detail, animated)    │      │
│    │   Portugal highlighted        │      │
│    └──────────────────────────────┘      │
│                                          │
│         [Click Portugal to Explore]       │
└──────────────────────────────────────────┘

 ──onClick Portugal──►

┌──────────────────────────────────────────┐
│    ← Back to Europe                      │
│    ┌──────────────────────────────┐      │
│    │    Portugal Map (Large)      │      │
│    │                              │      │
│    │    • Team Location Pins      │      │
│    │    • Cisco Office (Special)  │      │
│    │    • Hover interactions      │      │
│    └──────────────────────────────┘      │
└──────────────────────────────────────────┘

 ──onClick Cisco────►

┌──────────────────────────────────────────┐
│          Project Title & Subtitle        │
│ ──────────────────────────────────────── │
│  Timeline   |    Team    |    Albums     │
│ ──────────────────────────────────────── │
│                                          │
│  ┌─────────────┐         ┌────────────┐ │
│  │   Event 1   │    •    │            │ │
│  │  Full details│         │            │ │
│  └─────────────┘         └────────────┘ │
│                    •                     │
│  ┌─────────────┐         ┌────────────┐ │
│  │             │    •    │  Event 2   │ │
│  │             │         │ Full detail│ │
│  └─────────────┘         └────────────┘ │
│                    •                     │
└──────────────────────────────────────────┘
  Full alternating timeline
  3-4 column grids for team/albums
  Optimal image carousels
```

## Performance Optimizations

```
┌──────────────────────────────────────────────────────┐
│           Next.js 14 Built-in Optimizations          │
├──────────────────────────────────────────────────────┤
│ ✓ Automatic code splitting (page-based)              │
│ ✓ Image optimization (Next/Image component)          │
│ ✓ Server-side rendering (SSR for API routes)         │
│ ✓ Static generation (pre-rendered pages)             │
│ ✓ Route prefetching (automatic link prefetch)        │
│ ✓ Font optimization (automatic font inlining)        │
│ ✓ Script optimization (next/script component)        │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│           Application-Level Optimizations            │
├──────────────────────────────────────────────────────┤
│ ✓ Lazy load images (images only load when visible)   │
│ ✓ Scroll-triggered animations (useInView hook)       │
│ ✓ API route caching (filesystem scans cached)        │
│ ✓ Dynamic imports (components load on demand)        │
│ ✓ Image error handling (fallbacks for failed loads)  │
│ ✓ HEIC auto-conversion (convert to JPEG on server)   │
│ ✓ Optimized image formats (WebP with fallbacks)      │
│ ✓ Minimal JavaScript bundle (tree-shaking)           │
│ ✓ CSS purging (Tailwind removes unused styles)       │
│ ✓ Component memoization (prevent unnecessary renders)│
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│              User Experience Optimizations           │
├──────────────────────────────────────────────────────┤
│ ✓ Loading states (skeleton screens, spinners)        │
│ ✓ Error boundaries (graceful error handling)         │
│ ✓ Progressive enhancement (works without JS)         │
│ ✓ Smooth transitions (Framer Motion GPU acceleration)│
│ ✓ Reduced motion support (prefers-reduced-motion)    │
│ ✓ Touch-friendly (mobile tap targets 44x44px+)       │
│ ✓ Keyboard navigation (full keyboard support)        │
│ ✓ Focus management (trapped in modals)               │
└──────────────────────────────────────────────────────┘
```

## Image Processing Pipeline

```
User Uploads Image → public/ folder
        │
        ▼
API Route Scans Folder
        │
        ├─> HEIC file detected?
        │   ├─> YES: Convert to JPEG (using Sharp)
        │   │         ├─> Quality: 80%
        │   │         ├─> Save as .jpg
        │   │         └─> Return new path
        │   └─> NO: Use original file
        │
        ▼
Next/Image Component
        │
        ├─> Automatic format conversion (WebP)
        ├─> Responsive sizes (srcset)
        ├─> Lazy loading (loading="lazy")
        ├─> Blur placeholder (blurDataURL)
        └─> Cache optimizations
        │
        ▼
Browser renders optimized image
        │
        ├─> WebP (if supported) - 25-35% smaller
        ├─> JPEG (fallback) - original quality
        └─> Progressive loading (blur → sharp)
```

## Build Process & Deployment

```
Development Phase:
├─> npm run dev
├─> Next.js Dev Server (Fast Refresh)
├─> TypeScript compilation (on-the-fly)
├─> Tailwind JIT compilation
└─> Hot Module Replacement (HMR)

        │
        ▼

Production Build:
├─> npm run build
│   │
│   ├─> TypeScript Compiler (tsc)
│   │   └─> Type checking & compilation
│   │
│   ├─> Next.js Build Process
│   │   ├─> Page optimization
│   │   ├─> Image optimization
│   │   ├─> Code splitting
│   │   ├─> Tree shaking
│   │   └─> Bundle analysis
│   │
│   ├─> Tailwind CSS Processing
│   │   ├─> PurgeCSS (remove unused styles)
│   │   ├─> Minification
│   │   └─> Optimization
│   │
│   └─> Output: .next/ directory
│       ├─> Static HTML files
│       ├─> JavaScript bundles (minified)
│       ├─> CSS files (minified)
│       ├─> Optimized images
│       └─> Server functions

        │
        ▼

Deployment Options:
├─> Vercel (Recommended)
│   ├─> Auto-detect Next.js
│   ├─> Zero-config deployment
│   ├─> Edge network (global CDN)
│   └─> Automatic HTTPS
│
├─> Netlify
│   ├─> Next.js plugin (@netlify/plugin-nextjs)
│   ├─> Build command: npm run build
│   ├─> Publish directory: .next
│   └─> Continuous deployment
│
└─> Self-Hosted / Other Platforms
    ├─> npm start (runs production server)
    ├─> Docker containerization
    └─> PM2 process management
```

## Key Technologies Explained

### Next.js 14 (React Framework)
- **Purpose**: Production-ready React framework with routing, SSR, and optimization
- **Why**: Best-in-class performance, SEO, developer experience, and zero-config
- **Features Used**: 
  - App Router (file-based routing)
  - Server Components (reduced bundle size)
  - API Routes (serverless functions)
  - Image Optimization (automatic WebP conversion)
  - Font Optimization (automatic font loading)

### TypeScript (Type Safety)
- **Purpose**: JavaScript with static type checking
- **Why**: Catch errors before runtime, better IDE support, self-documenting code
- **Features Used**: 
  - Interfaces (data structures)
  - Type inference (automatic typing)
  - Generic types (reusable components)
  - Union types (flexible types)

### Tailwind CSS (Styling)
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid development, consistent design system, tiny bundle size (unused CSS removed)
- **Features Used**: 
  - Responsive utilities (sm:, md:, lg:)
  - Dark mode support
  - Custom theme (colors, spacing)
  - JIT compiler (instant builds)
  - Animation utilities

### Framer Motion (Animations)
- **Purpose**: Production-ready animation library for React
- **Why**: Smooth 60fps animations, declarative API, gesture support
- **Features Used**: 
  - Motion components (<motion.div>)
  - Animation variants (reusable animations)
  - useInView hook (scroll triggers)
  - AnimatePresence (exit animations)
  - Gesture recognition (drag, hover)

### Radix UI (Accessible Components)
- **Purpose**: Unstyled, accessible React components
- **Why**: WCAG compliant, keyboard navigation, focus management
- **Features Used**: 
  - Dialog (modals, lightbox)
  - Slot (composition utility)
  - Accessible by default

### Sharp (Image Processing)
- **Purpose**: High-performance image processing library
- **Why**: Fast HEIC conversion, image resizing, format conversion
- **Features Used**: 
  - HEIC → JPEG conversion
  - Image optimization
  - Metadata extraction

### Lucide React (Icons)
- **Purpose**: Beautiful & consistent icon set
- **Why**: Lightweight (tree-shakeable), customizable (size, color, stroke)
- **Features Used**: 
  - Clock, Users, Image icons
  - MapPin, Mail, Linkedin icons
  - Consistent 24x24px grid

## Extension Points & Customization

Want to extend the project? Here's where to make changes:

```
✨ Add Timeline Event
   └─> Edit: src/data/timelineData.ts
       Add: New event object to events array
       Create: Folder in public/images/timeline/{event-name}/
       Add: Images (numbered for carousel order)

👤 Add Team Member
   └─> Create: Folder in public/team/{Member Name}/
       Add: info.json (name, role, bio, skills, etc.)
       Add: avatar.jpg or avatar.png
       Auto-loads: On next page refresh

📸 Add Photo Album
   └─> Create: Folder in public/albums/{Album Name}/
       Add: Photos (JPG, PNG, HEIC)
       Auto-loads: Album appears automatically

📍 Add Map Location
   └─> Edit: src/data/teamLocations.ts
       Add: New location object to array
       Set: { city, x, y, memberCount, memberNames }
       Adjust: Coordinates to position on map

🎨 New Animation Style
   └─> Edit: src/components/**/*.tsx
       Modify: motion variants objects
       Update: initial, animate, exit properties
       Adjust: transition durations & easing

🎯 New Icon
   └─> Import: From lucide-react
       Add to: iconMap in TimelineEvent.tsx
       ```typescript
       import { YourIcon } from 'lucide-react';
       const iconMap = {
         ...existing,
         'your-icon': YourIcon,
       };
       ```

🌈 Change Color Scheme
   └─> Edit: tailwind.config.ts
       Update: theme.extend.colors
       Apply: New color classes in components

📄 Add New Page/Route
   └─> Create: src/app/{page-name}/page.tsx
       Add: Layout, components, logic
       Link: From other pages with <Link href={...}>

🔌 Add API Endpoint
   └─> Create: src/app/api/{endpoint}/route.ts
       Export: GET, POST functions
       Fetch: From components with fetch('/api/{endpoint}')

🗺️ Change Highlighted Country
   └─> Edit: src/components/map/EuropeMap.tsx
       Modify: SVG path coordinates for new country
       Update: Hover & click handlers

🖼️ Add Custom Component
   └─> Create: src/components/{category}/{Name}.tsx
       Import: Required dependencies
       Export: Default component
       Use: Import in page.tsx or other components

🔧 Add Utility Function
   └─> Edit: src/lib/utils.ts
       Add: New helper function
       Export: For use across components

📦 Add External Library
   └─> Run: npm install {package-name}
       Import: In component or page
       Use: According to package docs
```

## Best Practices Implemented

Architecture:
✅ **Component Composition** - Small, focused, reusable components
✅ **Separation of Concerns** - Clear separation UI/Logic/Data
✅ **DRY Principle** - Reusable utilities, shared components
✅ **Single Responsibility** - Each component has one clear purpose

Code Quality:
✅ **Type Safety** - Full TypeScript coverage, no `any` types
✅ **Error Handling** - Try-catch blocks, error boundaries, fallbacks
✅ **Loading States** - Skeleton screens, spinners, progress indicators
✅ **Clean Code** - Clear naming, documented functions, consistent formatting

Performance:
✅ **Lazy Loading** - Images, components load on-demand
✅ **Code Splitting** - Automatic page-based splitting
✅ **Image Optimization** - WebP conversion, responsive sizes
✅ **Bundle Analysis** - Tree-shaking removes unused code
✅ **Memoization** - Prevent unnecessary re-renders

Accessibility (a11y):
✅ **Semantic HTML** - Proper heading hierarchy, landmarks
✅ **Keyboard Navigation** - Tab order, focus management
✅ **ARIA Labels** - Screen reader support
✅ **Color Contrast** - WCAG AA compliance
✅ **Focus Indicators** - Visible focus states
✅ **Motion Preferences** - prefers-reduced-motion support

User Experience:
✅ **Responsive Design** - Mobile-first approach, all screen sizes
✅ **Progressive Enhancement** - Core functionality without JS
✅ **Smooth Transitions** - 60fps animations, GPU acceleration
✅ **Error Messages** - User-friendly, actionable feedback
✅ **Touch-Friendly** - 44x44px minimum tap targets

Development:
✅ **Git-Friendly** - Proper .gitignore, organized structure
✅ **Documentation** - Comprehensive docs, inline comments
✅ **Environment Config** - Separate dev/prod configurations
✅ **Scalability** - Easy to add events, members, albums
✅ **Maintainability** - Clear patterns, consistent conventions

## Security Considerations

```
✓ No environment variables exposed to client
✓ API routes validate inputs
✓ File system access restricted to public/ folder
✓ Image uploads validated (type, size)
✓ No SQL injection risk (no database)
✓ XSS prevention (React auto-escapes)
✓ CSRF protection (Next.js built-in)
✓ HTTPS enforced (deployment platforms)
```

---

This architecture provides a **solid foundation** that's **easy to understand**, **modify**, and **extend**!  

The project follows industry best practices and modern web development standards, making it suitable for production use and further development. 🚀
