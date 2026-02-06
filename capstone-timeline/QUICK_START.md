# 🚀 Quick Start Guide

## Prerequisites Installation

### 1. Install Node.js

**Windows:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer (.msi file)
4. Follow the installation wizard (keep default settings)
5. Restart your terminal/PowerShell

**Verify Installation:**
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v20.x.x and 10.x.x).

## Project Setup

### Step 1: Open Terminal in Project Directory

```powershell
cd "c:\Users\ricsimoe\OneDrive - Cisco\Ricardo\Capstone\capstone-timeline"
```

### Step 2: Install Dependencies

Choose one of the following:

**Using npm (comes with Node.js):**
```powershell
npm install
```

**Using yarn (faster, optional):**
```powershell
npm install -g yarn
yarn install
```

**Using pnpm (fastest, optional):**
```powershell
npm install -g pnpm
pnpm install
```

Expected output: Dependencies will download (takes 1-3 minutes).

### Step 3: Start Development Server

```powershell
npm run dev
```

You should see:
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Ready in X.Xs
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3000**

🎉 **Your timeline website is now running!**

## 🎨 Next Steps

1. **Customize Content**: Edit `src/data/timelineData.ts`
2. **Add Images**: Place images in `public/images/`
3. **Change Colors**: Modify `tailwind.config.ts`
4. **Update Title**: Edit `src/app/layout.tsx`

See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed instructions.

## 📁 Project Overview

```
capstone-timeline/
├── 📄 README.md                    # Full documentation
├── 📄 CUSTOMIZATION_GUIDE.md       # Customization reference
├── 📄 QUICK_START.md              # This file
├── 📦 package.json                 # Dependencies
├── ⚙️ next.config.js               # Next.js config
├── ⚙️ tailwind.config.ts          # Styling config
├── public/
│   └── images/                     # Your images here
└── src/
    ├── app/
    │   ├── layout.tsx              # App layout
    │   ├── page.tsx                # Home page
    │   └── globals.css             # Global styles
    ├── components/
    │   ├── timeline/
    │   │   ├── Timeline.tsx        # Timeline container
    │   │   └── TimelineEvent.tsx   # Event cards
    │   └── ui/
    │       └── Header.tsx          # Page header
    ├── data/
    │   └── timelineData.ts         # ⭐ Edit this to customize timeline
    ├── types/
    │   └── timeline.ts             # TypeScript types
    └── lib/
        └── utils.ts                # Utilities
```

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |

## ⚡ Development Tips

### Hot Reload
- Changes to files automatically refresh the browser
- Edit `timelineData.ts` and see updates instantly!

### VS Code Extensions (Recommended)

1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind
3. **TypeScript** - Enhanced TypeScript support
4. **Prettier** - Code formatting

Install via VS Code Extensions (Ctrl+Shift+X).

### Keyboard Shortcuts

- `Ctrl + C` in terminal: Stop the server
- `Ctrl + S`: Save file (auto-updates browser)
- `Ctrl + /`: Comment/uncomment code

## 🐛 Troubleshooting

### Port 3000 already in use
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use a different port
npm run dev -- -p 3001
```

### Module not found errors
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Build errors
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Image not loading
- Check image path starts with `/` for public folder
- For external URLs, add domain to `next.config.js`

## 📱 Testing on Mobile

1. Find your computer's IP address:
```powershell
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

2. On your phone's browser, visit:
```
http://YOUR-IP-ADDRESS:3000
```

Make sure phone and computer are on the same WiFi network.

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy" - Done! ✨

### Option 2: Build Locally

```powershell
npm run build
npm start
```

Your site runs at http://localhost:3000

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Quick Customization Example

Want to change the first timeline event? Edit `src/data/timelineData.ts`:

```typescript
{
  id: '1',
  title: 'My Custom Event',           // Change this
  date: 'Today',                       // Change this
  description: 'This is my event!',    // Change this
  image: '/images/my-photo.jpg',       // Add your image
  icon: 'rocket',                      // rocket, search, palette, code, etc.
  color: 'bg-purple-500',              // Any Tailwind color
  category: 'Important',               // Your category
}
```

Save the file and see changes instantly in your browser! 🎉

---

**Questions?** Check the full [README.md](README.md) or [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)

**Ready to customize?** Start by editing `src/data/timelineData.ts`! 🚀
