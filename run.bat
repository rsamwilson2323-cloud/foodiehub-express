@echo off
chcp 65001 >nul
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 pause && exit /b 1
echo Starting server...
npm run dev
pause
