# 🏗️ Project Architecture

## Tech Stack Overview

```
┌─────────────────────────────────────────┐
│         Next.js 14 (App Router)         │
│  React 18 + TypeScript + Server Actions │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼────────┐
│  Framer Motion │    │  Tailwind CSS   │
│   Animations   │    │     Styling     │
└────────────────┘    └─────────────────┘
```

## Component Hierarchy

```
App (Root Layout)
│
├── Header
│   ├── Title
│   ├── Subtitle
│   └── Animated Background
│
└── Timeline
    ├── Vertical Line
    │
    └── Timeline Events (Array)
        ├── Event Card
        │   ├── Image
        │   ├── Icon Node
        │   ├── Date
        │   ├── Title
        │   ├── Description
        │   └── Category Badge
        │
        └── Animations
            ├── Fade In
            ├── Slide
            └── Scale
```

## File Structure & Responsibilities

```
src/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout, fonts, metadata
│   ├── page.tsx                 # Home page, assembles components
│   └── globals.css              # Global styles, custom CSS
│
├── components/
│   ├── timeline/
│   │   ├── Timeline.tsx         # Container, vertical line, layout
│   │   └── TimelineEvent.tsx    # Individual event cards, animations
│   │
│   └── ui/
│       └── Header.tsx           # Hero section, animated header
│
├── data/
│   └── timelineData.ts          # ⭐ MAIN DATA FILE - Edit this!
│
├── types/
│   └── timeline.ts              # TypeScript interfaces
│
└── lib/
    └── utils.ts                 # Utility functions (cn)
```

## Data Flow

```
timelineData.ts
       │
       │ exports TimelineData
       ▼
   page.tsx
       │
       │ passes events[]
       ▼
  Timeline.tsx
       │
       │ maps events to components
       ▼
TimelineEvent.tsx
       │
       │ renders individual cards
       ▼
   Browser Display
```

## Animation Flow

```
1. Page Load
   └─> Header animates in

2. User Scrolls
   └─> Timeline line extends

3. Event enters viewport
   ├─> Icon scales & rotates
   ├─> Card slides in from side
   └─> Card becomes interactive

4. User hovers card
   └─> Card lifts slightly
```

## Styling System

```
┌──────────────────────────────┐
│     Tailwind CSS (Utility)    │
├──────────────────────────────┤
│ • Responsive breakpoints      │
│ • Color system                │
│ • Spacing & sizing            │
│ • Flexbox & Grid              │
└──────────────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│      Custom Configuration     │
├──────────────────────────────┤
│ • Primary color palette       │
│ • Custom animations           │
│ • Extended theme              │
└──────────────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│    Component Classes          │
├──────────────────────────────┤
│ • bg-gradient-to-r            │
│ • rounded-2xl                 │
│ • shadow-xl                   │
│ • hover:shadow-2xl            │
└──────────────────────────────┘
```

## Responsive Breakpoints

```
Mobile (default)        Tablet (md: 768px)       Desktop (lg: 1024px)
┌─────────┐            ┌──────────────┐          ┌────────────────────┐
│  Event  │            │ Event  │  •  │          │ Event  │  •  │      │
│  Card   │            ├────────┼─────┤          ├────────┼─────┼──────┤
│         │            │   •    │Event│          │        │  •  │Event │
│  ├─•    │            ├────────┴─────┤          ├────────┴─────┴──────┤
│         │            │      Event    │          │  Event  │  •  │      │
│  Event  │            └──────────────┘          └────────────────────┘
│  Card   │
│         │            Vertical line              Alternating layout
│  ├─•    │            appears                    + centered nodes
└─────────┘
Stacked                Side icons                 Full timeline
```

## State Management

```
Timeline Component (Parent)
│
├── useRef(timelineRef)           # Track timeline element
│   └─> For scroll animations
│
├── useInView(timelineRef)        # Detect visibility
│   └─> Triggers animations
│
└── events.map()                   # Render children
    │
    └─> TimelineEvent (Child)
        │
        ├── useRef(ref)            # Track event element
        ├── useInView(ref)         # Detect event visibility
        └── useState(imageError)   # Handle image load failure
```

## Performance Optimizations

```
┌─────────────────────────────────────┐
│      Next.js Built-in Features      │
├─────────────────────────────────────┤
│ ✓ Automatic code splitting          │
│ ✓ Image optimization                │
│ ✓ Server-side rendering             │
│ ✓ Static generation                 │
│ ✓ Route prefetching                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Custom Optimizations           │
├─────────────────────────────────────┤
│ ✓ Lazy load images (Next/Image)     │
│ ✓ Animate only in viewport          │
│ ✓ CSS-based animations              │
│ ✓ Minimal JS bundle                 │
└─────────────────────────────────────┘
```

## Build Process

```
Source Code (TypeScript + TSX)
        │
        ▼
TypeScript Compiler
        │
        ▼
Next.js Build
        │
        ├─> HTML pages
        ├─> JavaScript bundles
        ├─> CSS files
        └─> Optimized images
        │
        ▼
Production Build (.next/)
        │
        ▼
Deployment (Vercel/Other)
```

## Directory Structure (Full)

```
capstone-timeline/
│
├── .next/                  # Build output (auto-generated)
├── node_modules/           # Dependencies (auto-generated)
├── public/                 # Static files
│   └── images/            # Your timeline images
│
├── src/
│   ├── app/               # Next.js 14 App Router
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/        # React components
│   │   ├── timeline/
│   │   │   ├── Timeline.tsx
│   │   │   └── TimelineEvent.tsx
│   │   └── ui/
│   │       └── Header.tsx
│   │
│   ├── data/              # Application data
│   │   └── timelineData.ts
│   │
│   ├── lib/               # Utilities
│   │   └── utils.ts
│   │
│   └── types/             # TypeScript definitions
│       └── timeline.ts
│
├── .eslintrc.json         # ESLint config
├── .gitignore             # Git ignore rules
├── next.config.js         # Next.js config
├── package.json           # Dependencies & scripts
├── postcss.config.js      # PostCSS config
├── tailwind.config.ts     # Tailwind config
├── tsconfig.json          # TypeScript config
│
├── README.md              # Full documentation
├── QUICK_START.md         # Setup guide
├── CUSTOMIZATION_GUIDE.md # Customization reference
└── ARCHITECTURE.md        # This file
```

## Key Technologies Explained

### Next.js 14
- **Purpose**: React framework with built-in routing, SSR, and optimization
- **Why**: Best-in-class performance, SEO, and developer experience
- **Features Used**: App Router, Server Components, Image Optimization

### TypeScript
- **Purpose**: Type-safe JavaScript
- **Why**: Catch errors early, better IDE support, self-documenting code
- **Features Used**: Interfaces, Type inference, Generic types

### Tailwind CSS
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid development, consistent design, small bundle size
- **Features Used**: Responsive design, Custom theme, JIT compiler

### Framer Motion
- **Purpose**: Animation library for React
- **Why**: Smooth animations, declarative API, performance
- **Features Used**: Variants, useInView hook, Motion components

### Lucide React
- **Purpose**: Icon library
- **Why**: Lightweight, customizable, tree-shakeable
- **Features Used**: Consistent icon set, Easy styling

## Extension Points

Want to extend the project? Here's where to add:

```
✨ New Timeline Event Type
   └─> Modify: src/types/timeline.ts
       Add to: TimelineEvent interface

🎨 New Animation Style  
   └─> Edit: src/components/timeline/TimelineEvent.tsx
       Update: cardVariants, iconVariants

🎯 New Icon
   └─> Import: From lucide-react
       Add to: iconMap in TimelineEvent.tsx

🌈 New Color Scheme
   └─> Edit: tailwind.config.ts
       Update: colors.primary

📄 New Page/Route
   └─> Create: src/app/[page-name]/page.tsx

🔌 API Integration
   └─> Create: src/app/api/[endpoint]/route.ts
       Fetch in: src/app/page.tsx
```

## Best Practices Used

✅ **Component Composition**: Small, reusable components
✅ **Type Safety**: Full TypeScript coverage
✅ **Responsive Design**: Mobile-first approach
✅ **Performance**: Lazy loading, optimized images
✅ **Accessibility**: Semantic HTML, proper contrast
✅ **Clean Code**: Clear naming, documented functions
✅ **Git-friendly**: Proper .gitignore, organized structure
✅ **Scalability**: Easy to add events, modify styles

---

This architecture provides a solid foundation that's easy to understand, modify, and extend! 🚀
