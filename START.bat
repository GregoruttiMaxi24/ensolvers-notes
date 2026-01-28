@echo off
setlocal enabledelayedexpansion
cls
echo.
echo ========================================
echo    Ensolvers Notes - Quick Start
echo ========================================
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

echo Checking directories...
if not exist "%SCRIPT_DIR%backend\package.json" (
    echo Error: Backend package.json not found at %SCRIPT_DIR%backend\package.json
    pause
    exit /b 1
)

if not exist "%SCRIPT_DIR%frontend\package.json" (
    echo Error: Frontend package.json not found at %SCRIPT_DIR%frontend\package.json
    pause
    exit /b 1
)

echo ✓ Directories verified
echo.

echo ========================================
echo To start the application:
echo ========================================
echo.
echo Terminal 1 - Backend:
echo   cd "%SCRIPT_DIR%backend"
echo   npm install
echo   npm start:dev
echo.
echo Terminal 2 - Frontend:
echo   cd "%SCRIPT_DIR%frontend"
echo   npm install
echo   npm start
echo.
echo ========================================
echo Default Credentials:
echo   Email: admin
echo   Password: admin
echo.
echo Access URLs:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3000/api
echo ========================================
echo.
pause
