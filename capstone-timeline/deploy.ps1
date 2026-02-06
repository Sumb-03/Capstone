# Netlify Deployment Script
# Quick deploy to Netlify

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

$projectPath = $PSScriptRoot
Set-Location $projectPath

# Check if netlify-cli is installed
Write-Host "[*] Checking Netlify CLI..." -ForegroundColor Yellow
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "[*] Installing Netlify CLI globally...`n" -ForegroundColor Yellow
    npm install -g netlify-cli
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n[ERROR] Failed to install Netlify CLI`n" -ForegroundColor Red
        Write-Host "Try running manually: npm install -g netlify-cli`n" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "`n[OK] Netlify CLI installed!`n" -ForegroundColor Green
} else {
    Write-Host "[OK] Netlify CLI is installed`n" -ForegroundColor Green
}

# Build the project
Write-Host "[*] Building project for production...`n" -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Build failed!`n" -ForegroundColor Red
    Write-Host "Fix the build errors and try again.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n[OK] Build successful!`n" -ForegroundColor Green

# Deploy
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Deploying to Netlify..." -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "Choose deployment option:" -ForegroundColor Yellow
Write-Host "  1. Login and deploy (first time or new site)" -ForegroundColor White
Write-Host "  2. Deploy to existing site" -ForegroundColor White
Write-Host "  3. Cancel`n" -ForegroundColor White

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`n[*] Opening browser for Netlify login...`n" -ForegroundColor Yellow
        netlify login
        
        Write-Host "`n[*] Deploying to production...`n" -ForegroundColor Yellow
        netlify deploy --prod
    }
    "2" {
        Write-Host "`n[*] Deploying to production...`n" -ForegroundColor Yellow
        netlify deploy --prod
    }
    "3" {
        Write-Host "`nDeployment cancelled.`n" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "`n[ERROR] Invalid choice!`n" -ForegroundColor Red
        exit 1
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n================================================" -ForegroundColor Green
    Write-Host "   Deployment Successful!" -ForegroundColor Green
    Write-Host "================================================`n" -ForegroundColor Green
    Write-Host "Your site is now live!`n" -ForegroundColor Cyan
    Write-Host "Check the URL above to visit your deployed site.`n" -ForegroundColor White
} else {
    Write-Host "`n[ERROR] Deployment failed!`n" -ForegroundColor Red
    Write-Host "Check the error messages above.`n" -ForegroundColor Yellow
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
