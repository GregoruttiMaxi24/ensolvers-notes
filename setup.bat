@echo off
REM =========================================================
REM Ensolvers Notes - Complete Setup Script (Windows)
REM =========================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo =========================================================
echo            ENSOLVERS NOTES - SETUP SCRIPT
echo =========================================================
echo.

REM Verify directories exist
if not exist "backend" (
    echo [ERROR] Backend directory not found
    pause
    exit /b 1
)

if not exist "frontend" (
    echo [ERROR] Frontend directory not found
    pause
    exit /b 1
)

echo [INFO] Starting setup process...
echo.

REM ===== BACKEND SETUP =====
echo =========================================================
echo STEP 1: Backend Setup
echo =========================================================
echo.

cd /d "%~dp0backend"
if not exist "package.json" (
    echo [ERROR] Backend package.json not found
    pause
    exit /b 1
)

echo [INFO] Installing backend dependencies...
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Backend npm install failed
    pause
    exit /b 1
)

echo [OK] Backend dependencies installed

REM ===== FRONTEND SETUP =====
echo.
echo =========================================================
echo STEP 2: Frontend Setup
echo =========================================================
echo.

cd /d "%~dp0frontend"
if not exist "package.json" (
    echo [ERROR] Frontend package.json not found
    pause
    exit /b 1
)

echo [INFO] Installing frontend dependencies...
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Frontend npm install failed
    pause
    exit /b 1
)

echo [OK] Frontend dependencies installed

REM ===== COMPLETION =====
cd /d "%~dp0"

echo.
echo =========================================================
echo SETUP COMPLETED SUCCESSFULLY!
echo =========================================================
echo.

echo To start the application:
echo.
echo Step 1 - Start Backend (Terminal 1):
echo   cd backend
echo   npm start:dev
echo.
echo Step 2 - Start Frontend (Terminal 2):
echo   cd frontend
echo   npm start
echo.
echo =========================================================
echo   Default Credentials
echo =========================================================
echo.
echo   Email:    admin
echo   Password: admin
echo.
echo =========================================================
echo   Access URLs
echo =========================================================
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3000/api
echo.
echo =========================================================
echo.

pause
