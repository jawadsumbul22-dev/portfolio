@echo off
:: Navigate to the folder where this script is located
cd /d "%~dp0"

echo Starting your Portfolio...
echo (You can minimize this window, but don't close it while viewing the site)

:: Start the development server and open the browser automatically
npm run dev -- --open

pause
