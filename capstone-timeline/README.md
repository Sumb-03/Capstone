# Capstone Timeline Website 🚀

A stunning, interactive timeline website featuring an animated Europe map with Portugal highlighted. Click on Portugal to reveal a beautifully animated timeline showcasing project milestones. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Timeline Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80)

## ✨ Features

- **🗺️ Interactive Europe Map**: Beautiful SVG map with Portugal highlighted and animated
- **🎯 Click-to-Explore**: Click Portugal to transition to the timeline view
- **🌊 Smooth Transitions**: Fluid animations between map and timeline views
- **📍 Pulsing Effects**: Eye-catching pulse animations on the map
- **⏱️ Animated Timeline**: Vertical timeline with scroll-triggered animations
- **🖼️ Image Support**: Timeline events with optimized images
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **🎨 Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **🔙 Easy Navigation**: Back button to return to the map view
- **⚡ Performance Optimized**: Next.js Image optimization and lazy loading

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
capstone-timeline/
├── public/                 # Static assets
│   └── images/            # Timeline event images
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main page with map/timeline state
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── map/           # Map components
│   │   │   └── EuropeMap.tsx  # Interactive Europe map
│   │   ├── timeline/      # Timeline components
│   │   │   ├── Timeline.tsx
│   │   │   └── TimelineEvent.tsx
│   │   └── ui/            # UI components
│   │       └── Header.tsx
│   ├── data/              # Timeline data
│   │   └── timelineData.ts
│   ├── types/             # TypeScript types
│   │   └── timeline.ts
│   └── lib/               # Utility functions
│       └── utils.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
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

### Editing Timeline Data

Edit the timeline data in `src/data/timelineData.ts`:

```typescript
export const timelineData: TimelineData = {
  title: 'Your Timeline Title',
  subtitle: 'Your subtitle here',
  events: [
    {
      id: '1',
      title: 'Event Title',
      date: 'Month Year',
      description: 'Event description...',
      image: '/images/your-image.jpg', // or external URL
      icon: 'rocket', // Available: rocket, search, palette, code, check-circle, presentation
      color: 'bg-blue-500', // Tailwind color class
      category: 'Category Name',
    },
    // Add more events...
  ],
};
```

### Adding Custom Images

1. **Local images**: Place images in `public/images/` and reference as `/images/filename.jpg`
2. **External images**: Use full URLs (ensure domains are added to `next.config.js`)

### Adding New Icons

1. Import the icon from Lucide React in `TimelineEvent.tsx`
2. Add it to the `iconMap` object:

```typescript
import { YourIcon } from 'lucide-react';

const iconMap: Record<string, any> = {
  // ...existing icons
  'your-icon': YourIcon,
};
```

### Customizing Colors

Edit the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... add your colors
  },
},
```

### Customizing Animations

Modify animation settings in `Timeline.tsx` and `TimelineEvent.tsx`:

```typescript
const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 } // Adjust duration
  },
};
```

## 🎨 Styling

The project uses Tailwind CSS for styling. Key style files:

- `src/app/globals.css` - Global styles and custom scrollbar
- `tailwind.config.ts` - Tailwind configuration and theme
- Component files - Component-specific Tailwind classes

## 📱 Responsive Design

The timeline automatically adapts to different screen sizes:

- **Desktop (md+)**: Alternating left/right layout with center line
- **Mobile**: Stacked vertical layout

## 🔧 Build & Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

### Deploy to other platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Cloudflare Pages
- Self-hosted server

## 🎓 Capstone Projects**: Interactive way to showcase project journey and milestones
- **🗺️ Geographic Projects**: Perfect for projects with a European focus or Portugal connection
- **🏢 Company History**: Display company evolution with map-based introduction
- **📦 Product Roadmap**: Visualize product development with geographic context
- **💼 Personal Portfolio**: Present career journey with engaging map interaction
- **📅 Event Timeline**: Document conferences, events, or campaigns with style
- **📚 Educational Content**: Create historical timelines or course progression with interactive elements
- **Event Timeline**: Document conferences, events, or campaigns
- **Educational Content**: Create historical timelines or course progression

## 🤝 Contributing

Feel free to customize and extend this template for your needs!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Built with [Next.js](https://nextjs.org/)

---

**Made with ❤️ for your Capstone Project**

For questions or issues, please refer to the [Next.js Documentation](https://nextjs.org/docs) or [Framer Motion Documentation](https://www.framer.com/motion/).
