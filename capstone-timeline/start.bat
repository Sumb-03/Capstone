@echo off
REM Capstone Timeline - Easy Test Script for Windows
REM This batch file runs the PowerShell script

echo.
echo ================================================
echo    Capstone Timeline - Setup ^& Test Script
echo ================================================
echo.

REM Run the PowerShell script
PowerShell.exe -ExecutionPolicy Bypass -File "%~dp0start.ps1"

pause
