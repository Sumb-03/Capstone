# Capstone Timeline - Easy Test Script
# This script will check prerequisites, install dependencies, and start the dev server

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   Capstone Timeline - Setup & Test Script   " -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Navigate to project directory
$projectPath = $PSScriptRoot
Set-Location $projectPath
Write-Host "[*] Project directory: $projectPath`n" -ForegroundColor Green

# Check if Node.js is installed
Write-Host "[*] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    $npmVersion = npm --version 2>$null
    
    if ($nodeVersion -and $npmVersion) {
        Write-Host "[OK] Node.js $nodeVersion installed" -ForegroundColor Green
        Write-Host "[OK] npm $npmVersion installed`n" -ForegroundColor Green
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host "[ERROR] Node.js is not installed!`n" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Download the LTS version and run the installer.`n" -ForegroundColor Yellow
    Write-Host "Press any key to open the Node.js website..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://nodejs.org/"
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Installing dependencies (this may take a few minutes)...`n" -ForegroundColor Yellow
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n[OK] Dependencies installed successfully!`n" -ForegroundColor Green
    } else {
        Write-Host "`n[ERROR] Failed to install dependencies!`n" -ForegroundColor Red
        Write-Host "Try running: npm install --force`n" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "[OK] Dependencies already installed`n" -ForegroundColor Green
}

# Start the development server
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Starting development server..." -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "Your timeline website will open at:" -ForegroundColor Green
Write-Host "  >> http://localhost:3000`n" -ForegroundColor Cyan

Write-Host "Tips:" -ForegroundColor Yellow
Write-Host "  - The browser should open automatically" -ForegroundColor White
Write-Host "  - Edit src/data/timelineData.ts to customize" -ForegroundColor White
Write-Host "  - Changes auto-refresh in the browser" -ForegroundColor White
Write-Host "  - Press Ctrl+C to stop the server`n" -ForegroundColor White

Write-Host "================================================`n" -ForegroundColor Cyan

# Open browser after a delay
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"
} | Out-Null

# Start the dev server
npm run dev
