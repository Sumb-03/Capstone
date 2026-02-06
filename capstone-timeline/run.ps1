# Capstone Timeline - Utility Script
# Common tasks made easy

param(
    [Parameter(Position=0)]
    [ValidateSet('dev', 'build', 'start', 'clean', 'help')]
    [string]$Command = 'help'
)

$projectPath = $PSScriptRoot
Set-Location $projectPath

function Show-Header {
    Write-Host "`n================================================" -ForegroundColor Cyan
    Write-Host "   Capstone Timeline - Utility Script" -ForegroundColor Cyan
    Write-Host "================================================`n" -ForegroundColor Cyan
}

function Show-Help {
    Show-Header
    Write-Host "Available commands:`n" -ForegroundColor Yellow
    
    Write-Host "  dev" -ForegroundColor Green -NoNewline
    Write-Host "     - Start development server (with hot reload)" -ForegroundColor White
    
    Write-Host "  build" -ForegroundColor Green -NoNewline
    Write-Host "   - Build for production" -ForegroundColor White
    
    Write-Host "  start" -ForegroundColor Green -NoNewline
    Write-Host "   - Run production build" -ForegroundColor White
    
    Write-Host "  clean" -ForegroundColor Green -NoNewline
    Write-Host "   - Clean build files and dependencies" -ForegroundColor White
    
    Write-Host "  help" -ForegroundColor Green -NoNewline
    Write-Host "    - Show this help message`n" -ForegroundColor White
    
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\run.ps1 dev" -ForegroundColor Cyan
    Write-Host "  .\run.ps1 build" -ForegroundColor Cyan
    Write-Host "  .\run.ps1 clean`n" -ForegroundColor Cyan
}

function Start-Dev {
    Show-Header
    Write-Host "  Starting development server...`n" -ForegroundColor Green
    Write-Host "Opening at: http://localhost:3000`n" -ForegroundColor Cyan
    
    # Open browser after delay
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 5
        Start-Process "http://localhost:3000"
    } | Out-Null
    
    npm run dev
}

function Start-Build {
    Show-Header
    Write-Host "  Building for production...`n" -ForegroundColor Green
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n[OK] Build complete!" -ForegroundColor Green
        Write-Host "Run '.\run.ps1 start' to test the production build`n" -ForegroundColor Cyan
    }
}

function Start-Production {
    Show-Header
    Write-Host "  Starting production server...`n" -ForegroundColor Green
    
    if (-not (Test-Path ".next")) {
        Write-Host "[ERROR] No production build found!`n" -ForegroundColor Red
        Write-Host "Run '.\run.ps1 build' first`n" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "Opening at: http://localhost:3000`n" -ForegroundColor Cyan
    
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 3
        Start-Process "http://localhost:3000"
    } | Out-Null
    
    npm start
}

function Start-Clean {
    Show-Header
    Write-Host "  Cleaning project...`n" -ForegroundColor Yellow
    
    # Clean .next directory
    if (Test-Path ".next") {
        Write-Host "  Removing .next directory..." -ForegroundColor Gray
        Remove-Item -Recurse -Force .next
        Write-Host "  [OK] Removed .next" -ForegroundColor Green
    }
    
    # Clean node_modules
    if (Test-Path "node_modules") {
        Write-Host "  Removing node_modules directory..." -ForegroundColor Gray
        Remove-Item -Recurse -Force node_modules
        Write-Host "  [OK] Removed node_modules" -ForegroundColor Green
    }
    
    # Clean lock files
    if (Test-Path "package-lock.json") {
        Write-Host "  Removing package-lock.json..." -ForegroundColor Gray
        Remove-Item -Force package-lock.json
        Write-Host "  [OK] Removed package-lock.json" -ForegroundColor Green
    }
    
    Write-Host "`n[OK] Clean complete!" -ForegroundColor Green
    Write-Host "Run '.\install.ps1' to reinstall dependencies`n" -ForegroundColor Cyan
}

# Execute command
switch ($Command) {
    'dev'   { Start-Dev }
    'build' { Start-Build }
    'start' { Start-Production }
    'clean' { Start-Clean }
    'help'  { Show-Help }
    default { Show-Help }
}
