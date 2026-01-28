@echo off
cls
echo.
echo ========================================
echo    Ensolvers Notes - Full Setup
echo ========================================
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
call npm install
call npm run build
echo Backend built successfully
echo.

REM Setup Frontend
echo Setting up Frontend...
cd ../frontend
call npm install
echo Frontend dependencies installed
echo.

REM Go back to root
cd ..

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the application:
echo 1. Open Terminal 1 (Backend):
echo    cd backend && npm start:dev
echo.
echo 2. Open Terminal 2 (Frontend):
echo    cd frontend && npm start
echo.
echo Default credentials: admin / admin
echo Frontend will open at: http://localhost:3000
echo Backend API at: http://localhost:3000/api
echo.
pause
