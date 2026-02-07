# Capstone Timeline Website 🚀

A stunning, fully-featured interactive website showcasing your capstone project journey. Features animated Europe and Portugal maps, dynamic timeline with image carousels, team member profiles, and photo albums. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Timeline Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80)

## ✨ Features

### 🗺️ Interactive Maps
- **Europe Map**: Beautiful animated landing page with Portugal highlighted
- **Portugal Map**: Interactive map showing team member locations across Portugal
- **Location Pins**: Click locations to see team distribution and Cisco office
- **Smooth Transitions**: Fluid animations between views with zoom effects
- **Pulsing Effects**: Eye-catching animations on highlighted regions

### ⏱️ Dynamic Timeline
- **Vertical Timeline**: Scroll-triggered animated timeline with milestone cards
- **Image Carousels**: Support for multiple images per event with navigation
- **Auto-Loading**: Images automatically loaded from folders in `public/images/timeline/`
- **API Integration**: Dynamic timeline data loading from file system
- **Rich Content**: Icons, colors, categories, dates, and descriptions
- **Responsive Layout**: Alternating left/right on desktop, stacked on mobile

### 👥 Team Members
- **Dynamic Profiles**: Team member cards with photos, roles, and bios
- **Skills Display**: Visual skill tags for each member
- **Contact Links**: LinkedIn and email integration
- **Auto-Loading**: Profiles loaded from `public/team/` folder structure
- **Modal Details**: Click any member to see full profile
- **City Grouping**: Members organized by their city location

### 📸 Photo Albums
- **Album Gallery**: Multiple photo albums with cover images
- **Lightbox Viewer**: Full-screen image viewer with navigation
- **Image Grid**: Beautiful responsive masonry-style layout
- **View Modes**: Switch between album view and all photos view
- **HEIC Support**: Automatic conversion for iPhone photos
- **Auto-Loading**: Albums loaded from `public/albums/` folder structure

### 🎨 Modern Features
- **URL Navigation**: Bookmark-friendly hash-based routing
- **Back Navigation**: Cisco logo returns to landing page
- **Tab System**: Seamless switching between Timeline, Team, and Albums
- **Loading States**: Smooth loading animations and error handling
- **Performance Optimized**: Next.js Image optimization and lazy loading
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark Theme**: Modern dark color scheme throughout

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18 with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Full type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Page transitions & micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/) (Beautiful consistent icons)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Accessible dialog & components)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (Image optimization & HEIC conversion)

## 📁 Project Structure

```
capstone-timeline/
├── public/                     # Static assets
│   ├── albums/                # Photo albums (auto-loaded)
│   │   ├── Album Name 1/     # Each folder = 1 album
│   │   └── Album Name 2/     # Place JPG/PNG/HEIC files here
│   ├── images/               # General images
│   │   └── timeline/         # Timeline event images
│   │       ├── event-name-1/ # Folder for milestone 1 images
│   │       └── event-name-2/ # Folder for milestone 2 images
│   └── team/                 # Team member profiles (auto-loaded)
│       ├── Member Name 1/    # Each folder = 1 team member
│       │   ├── info.json     # Member details (name, role, bio)
│       │   └── avatar.jpg    # Member photo
│       └── _TEMPLATE/        # Template for new members
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   ├── albums/      # Albums API (auto-load from folders)
│   │   │   ├── team/        # Team API (auto-load profiles)
│   │   │   ├── timeline/    # Timeline API
│   │   │   └── timeline-images/ # Timeline images API
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main page with navigation logic
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── albums/          # Photo album components
│   │   │   └── Albums.tsx   # Album gallery & lightbox
│   │   ├── map/             # Map components
│   │   │   ├── EuropeMap.tsx    # Interactive Europe map
│   │   │   └── PortugalMap.tsx  # Interactive Portugal map
│   │   ├── members/         # Team member components
│   │   │   └── Members.tsx  # Member profiles & modal
│   │   ├── timeline/        # Timeline components
│   │   │   ├── Timeline.tsx       # Timeline container
│   │   │   └── TimelineEvent.tsx  # Event cards with carousels
│   │   └── ui/              # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── Header.tsx
│   │       └── CiscoLogo.tsx
│   ├── data/                # Static data files
│   │   ├── albumsData.ts    # Fallback albums data
│   │   ├── membersData.ts   # Fallback members data
│   │   ├── teamLocations.ts # Portugal map location pins
│   │   └── timelineData.ts  # Timeline events data
│   ├── types/               # TypeScript type definitions
│   │   └── timeline.ts
│   └── lib/                 # Utility functions
│       └── utils.ts         # Helper utilities (cn, etc.)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── Documentation files (.md)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd capstone-timeline
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customizing Your Timeline

### 1. Update Timeline Events

**File**: `src/data/timelineData.ts`

```typescript
export const timelineData: TimelineData = {
  title: 'Your Project Title',
  subtitle: 'Your subtitle here',
  events: [
    {
      id: '1',
      title: 'Project Kickoff',
      date: 'September 2025',
      description: 'Detailed description of this milestone...',
      imageFolder: 'project-kickoff',  // Loads all images from public/images/timeline/project-kickoff/
      icon: 'rocket',                  // Available: rocket, search, palette, code, check-circle, presentation
      color: 'bg-blue-500',           // Any Tailwind color class
      category: 'Planning',
    },
    // Add more events...
  ],
};
```

**Add Timeline Images**: Create folders in `public/images/timeline/` and place images there. They'll auto-load as carousels!

### 2. Add Team Members

Create a folder for each team member in `public/team/`:

```
public/team/John Doe/
  ├── info.json       # Member details
  └── avatar.jpg      # Profile photo
```

**info.json** example:
```json
{
  "name": "John Doe",
  "role": "Software Engineer",
  "city": "Lisbon",
  "bio": "Passionate about building great products...",
  "skills": ["React", "TypeScript", "Node.js"],
  "linkedin": "https://linkedin.com/in/johndoe",
  "email": "john.doe@example.com"
}
```

Use the `_TEMPLATE` folder in `public/team/` as a starting point!

### 3. Add Photo Albums

Create folders in `public/albums/` for each album:

```
public/albums/Team Building 2025/
  ├── photo1.jpg
  ├── photo2.jpg
  └── photo3.png
```

Albums auto-load! Just create folders and add photos (JPG, PNG, HEIC supported).

### 4. Update Map Locations

**File**: `src/data/teamLocations.ts`

Add pins to the Portugal map for your team locations:

```typescript
{
  id: 1,
  city: 'Porto',
  x: 320,    // X coordinate on map
  y: 180,    // Y coordinate on map
  memberCount: 3,
  memberNames: ['John', 'Jane', 'Bob'],
}
```

### 📚 Detailed Guides

For complete customization instructions, see:
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) - Comprehensive customization reference
- [CUSTOMIZE_LOCATIONS.md](CUSTOMIZE_LOCATIONS.md) - Map location customization
- [MAP_FEATURE_GUIDE.md](MAP_FEATURE_GUIDE.md) - Map features and transitions

## 🎨 Styling & Theming

The project uses Tailwind CSS for styling. Key files:

- **`src/app/globals.css`** - Global styles, custom scrollbar, animations
- **`tailwind.config.ts`** - Tailwind configuration, custom colors, theme
- **Component files** - Component-specific Tailwind utility classes

### Customizing Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
},
```

### Customizing Animations

Modify animation settings in component files:

```typescript
// In Timeline.tsx or TimelineEvent.tsx
const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 } // Adjust speed
  },
};
```

## 📱 Responsive Design

The website automatically adapts to all screen sizes:

- **Desktop (1024px+)**: Full Europe map, alternating timeline cards, multi-column grids
- **Tablet (768-1023px)**: Optimized map view, two-column layouts
- **Mobile (<768px)**: Stacked layouts, vertical timeline, mobile-optimized navigation

## 🔧 Build & Deploy

### Development
```bash
npm run dev          # Start development server
```

### Production Build
```bash
npm run build        # Build for production
npm start            # Run production server
```

### Scripts
- **`start.bat`** / **`start.ps1`** - One-click start script (Windows)
- **`install.ps1`** - Install dependencies
- **`deploy.ps1`** - Deploy to Netlify

See [HOW_TO_RUN.md](HOW_TO_RUN.md) and [QUICK_START.md](QUICK_START.md) for detailed setup instructions.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy
4. Done! Your site is live

### Deploy to Netlify

Netlify configuration included (`netlify.toml`):

```bash
npm run build
netlify deploy --prod
```

See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) for complete deployment guide.

### Other Platforms

This Next.js app can be deployed to:
- **Netlify** - Full Next.js support with automatic builds
- **Vercel** - Optimized for Next.js (recommended)
- **AWS Amplify** - Scalable hosting
- **Azure Static Web Apps** - Microsoft cloud platform
- **Cloudflare Pages** - Edge-optimized hosting
- **Self-hosted** - Deploy on your own server

## 🎯 Use Cases

This website template is perfect for:

- **🎓 Capstone Projects** - Showcase your project journey with style
- **🗺️ Geographic Projects** - Projects with European or Portugal focus
- **🏢 Company History** - Tell your company story with interactive maps
- **📦 Product Development** - Visualize product roadmap and milestones
- **💼 Team Showcases** - Present distributed teams across locations
- **📅 Event Documentation** - Document conferences, workshops, or campaigns
- **📚 Educational Content** - Create interactive learning timelines
- **🌟 Portfolio Sites** - Professional portfolio with unique navigation

## 📚 Documentation

- **[README.md](README.md)** - This file (overview & features)
- **[QUICK_START.md](QUICK_START.md)** - Beginner-friendly 5-minute setup
- **[HOW_TO_RUN.md](HOW_TO_RUN.md)** - Windows scripts & running instructions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture & data flow
- **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** - Complete customization reference
- **[TEAM_GUIDE.md](TEAM_GUIDE.md)** - Adding & managing team members
- **[ALBUMS_GUIDE.md](ALBUMS_GUIDE.md)** - Creating & organizing photo albums
- **[MAP_FEATURE_GUIDE.md](MAP_FEATURE_GUIDE.md)** - Interactive map features
- **[CUSTOMIZE_LOCATIONS.md](CUSTOMIZE_LOCATIONS.md)** - Map location pins
- **[NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)** - Deployment to Netlify

## 🤝 Contributing

Feel free to customize and extend this template for your needs! This is your project - make it unique!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components
- **[Unsplash](https://unsplash.com/)** - Placeholder images
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image processing

---

**Made with ❤️ for your Capstone Project**

For help and support:
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
