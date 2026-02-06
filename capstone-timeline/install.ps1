# Capstone Timeline - Quick Install Script
# Run this first if you haven't installed dependencies yet

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   Capstone Timeline - Install Dependencies   " -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

$projectPath = $PSScriptRoot
Set-Location $projectPath

# Check Node.js
Write-Host "[*] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    $npmVersion = npm --version 2>$null
    
    if ($nodeVersion -and $npmVersion) {
        Write-Host "[OK] Node.js $nodeVersion" -ForegroundColor Green
        Write-Host "[OK] npm $npmVersion`n" -ForegroundColor Green
    } else {
        throw "Not found"
    }
} catch {
    Write-Host "[ERROR] Node.js not installed!`n" -ForegroundColor Red
    Write-Host "Install from: https://nodejs.org/`n" -ForegroundColor Yellow
    exit 1
}

# Clean install
if (Test-Path "node_modules") {
    Write-Host "[*] Cleaning old installation...`n" -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json
}

# Install dependencies
Write-Host "[*] Installing dependencies...`n" -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n================================================" -ForegroundColor Green
    Write-Host "  Installation complete!" -ForegroundColor Green
    Write-Host "================================================`n" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Double-click start.bat to run the website" -ForegroundColor White
    Write-Host "  2. Or run: .\start.ps1`n" -ForegroundColor White
} else {
    Write-Host "`n[ERROR] Installation failed!`n" -ForegroundColor Red
    Write-Host "Try running manually: npm install --force`n" -ForegroundColor Yellow
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
