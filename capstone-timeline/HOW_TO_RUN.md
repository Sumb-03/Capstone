# 🚀 Easy Test Scripts

I've created simple scripts to make testing super easy on your PC!

## Quick Start (Choose One)

### Method 1: Double-Click (Easiest!)
Just double-click: **`start.bat`**

That's it! The script will:
1. ✅ Check if Node.js is installed
2. ✅ Install dependencies (if needed)
3. ✅ Start the development server
4. ✅ Open your browser automatically

### Method 2: PowerShell
Right-click in the folder → "Open in Terminal" → Run:
```powershell
.\start.ps1
```

### Method 3: Manual Install First
If you want to install dependencies separately:
```powershell
.\install.ps1
.\start.ps1
```

## 📝 What Each Script Does

| Script | Purpose |
|--------|---------|
| **start.bat** | 🎯 Main script - double-click to run everything |
| **start.ps1** | PowerShell version of start.bat |
| **install.ps1** | Install/reinstall dependencies only |
| **run.ps1** | 🛠️ Utility script (dev, build, clean commands) |

## 🎬 First Time Setup

1. **Install Node.js** (if you haven't already)
   - The script will detect if it's missing
   - It will open the download page for you
   - Install Node.js, then run the script again

2. **Run start.bat**
   - Dependencies install automatically (takes 1-3 minutes first time)
   - Server starts
   - Browser opens to http://localhost:3000

3. **Start customizing!**
   - Edit `src/data/timelineData.ts`
   - Changes appear instantly in the browser

## ⚡ Usage

### Starting the Website
```
Double-click: start.bat
```
Or in PowerShell:
```powershell
.\start.ps1
```

### Stopping the Server
Press `Ctrl + C` in the terminal window

### Reinstalling Dependencies
```powershell
.\install.ps1
```

### Using the Utility Script
```powershell
.\run.ps1 dev      # Start dev server
.\run.ps1 build    # Build for production
.\run.ps1 start    # Run production build
.\run.ps1 clean    # Clean all build files
.\run.ps1 help     # Show all commands
```

## 🐛 Troubleshooting

### "Cannot run scripts" error
If you get an execution policy error, run this once:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port 3000 already in use
The script will show an error. Close any other app using port 3000, or:
1. Press `Ctrl + C` to stop
2. Run: `npm run dev -- -p 3001`
3. Open http://localhost:3001 instead

### Dependencies won't install
Try:
```powershell
npm cache clean --force
.\install.ps1
```

## 📱 View on Your Phone

1. Run the start script on your PC
2. Find your PC's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)
3. On your phone's browser, visit:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   (Make sure phone and PC are on the same WiFi!)

## 🎨 What You'll See

When you run the script, you'll see:
```
================================================
   Capstone Timeline - Setup & Test Script
================================================

📁 Project directory: C:\...\capstone-timeline

🔍 Checking Node.js installation...
✅ Node.js v20.11.0 installed
✅ npm 10.2.4 installed

✅ Dependencies already installed

================================================
🚀 Starting development server...
================================================

Your timeline website will open at:
👉 httScripts Available

```
capstone-timeline/
├── start.bat          ⭐ Double-click this to get started!
├── start.ps1          PowerShell version (auto setup + run)
├── install.ps1        Install dependencies only
├── run.ps1            🛠️ Utility for dev/build/clean tasks
├── MAP_FEATURE_GUIDE.md   🗺️ Guide to the interactive map
└── HOW_TO_RUN.md      This guide
```

## 🎯 Common Workflows

**First time setup:**
```
1. Double-click start.bat
   (installs everything and starts server)
```

**Daily development:**
```
1. Double-click start.bat
2. Click Portugal on the map
3. View the animated timeline
4. Edit src/data/timelineData.ts
5. See changes in browser automatically
6. Press Ctrl+C when done
```

**Build for production:**
```powershell
.\run.ps1 build
.\run.ps1 start
```

**Clean and reinstall:**
```powershell
.\run.ps1 clean
.\install.ps1

## 📂 Files Created

```
capstone-timeline/
├── start.bat          ⭐ Double-click this!
├── start.ps1          PowerShell script
├── install.ps1        Dependency installer
└── HOW_TO_RUN.md      This file
```

## 💡 Pro Tips

1. **Keep the terminal window open** while using the website
2. **Edit and save files** - changes appear automatically
3. **Use VS Code** for the best editing experience
4. **Check the browser console** (F12) if something doesn't work

---

**Ready to go? Just double-click `start.bat`! 🚀**
