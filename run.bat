@echo off
title FoodieHub Express

echo ==========================================
echo      FoodieHub Express
echo ==========================================
echo.

if not exist package.json (
    echo ERROR: package.json not found.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo.
        echo Installation failed.
        pause
        exit /b 1
    )
)

echo.
echo Starting Vite development server...
echo.

npm run dev -- --host

pause
