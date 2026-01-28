#!/bin/bash

# =========================================================
# Ensolvers Notes - Setup Script (Linux/macOS)
# =========================================================

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo ""
echo "========================================================="
echo "            ENSOLVERS NOTES - SETUP SCRIPT"
echo "========================================================="
echo ""

# Verify directories exist
if [ ! -d "$SCRIPT_DIR/backend" ]; then
    echo "[ERROR] Backend directory not found"
    exit 1
fi

if [ ! -d "$SCRIPT_DIR/frontend" ]; then
    echo "[ERROR] Frontend directory not found"
    exit 1
fi

echo "[INFO] Starting setup process..."
echo ""

# ===== BACKEND SETUP =====
echo "========================================================="
echo "STEP 1: Backend Setup"
echo "========================================================="
echo ""

cd "$SCRIPT_DIR/backend"
if [ ! -f "package.json" ]; then
    echo "[ERROR] Backend package.json not found"
    exit 1
fi

echo "[INFO] Installing backend dependencies..."
npm install

echo "[OK] Backend dependencies installed"
echo ""

# ===== FRONTEND SETUP =====
echo "========================================================="
echo "STEP 2: Frontend Setup"
echo "========================================================="
echo ""

cd "$SCRIPT_DIR/frontend"
if [ ! -f "package.json" ]; then
    echo "[ERROR] Frontend package.json not found"
    exit 1
fi

echo "[INFO] Installing frontend dependencies..."
npm install

echo "[OK] Frontend dependencies installed"
echo ""

# ===== COMPLETION =====
cd "$SCRIPT_DIR"

echo "========================================================="
echo "SETUP COMPLETED SUCCESSFULLY!"
echo "========================================================="
echo ""
echo "To start the application:"
echo ""
echo "Step 1 - Start Backend (Terminal 1):"
echo "  cd backend"
echo "  npm start:dev"
echo ""
echo "Step 2 - Start Frontend (Terminal 2):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "========================================================="
echo "   Default Credentials"
echo "========================================================="
echo ""
echo "   Email:    admin"
echo "   Password: admin"
echo ""
echo "========================================================="
echo "   Access URLs"
echo "========================================================="
echo ""
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3000/api"
echo ""
echo "========================================================="
echo ""
