@echo off
REM Netlify Deployment Script
REM Easy deployment to Netlify

echo.
echo ================================================
echo    Deploy to Netlify
echo ================================================
echo.

PowerShell.exe -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"

pause
