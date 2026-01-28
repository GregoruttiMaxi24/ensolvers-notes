#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Ensolvers Notes - Full Setup${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Setup Backend
echo -e "${GREEN}Setting up Backend...${NC}"
cd backend
npm install
npm run build
echo -e "${GREEN}✓ Backend built successfully${NC}\n"

# Setup Frontend
echo -e "${GREEN}Setting up Frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}\n"

# Go back to root
cd ..

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Setup completed successfully!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo -e "${GREEN}To start the application:${NC}"
echo -e "1. Terminal 1 (Backend):"
echo -e "   cd backend && npm start:dev\n"
echo -e "2. Terminal 2 (Frontend):"
echo -e "   cd frontend && npm start\n"
echo -e "${GREEN}Default credentials: admin / admin${NC}"
echo -e "${GREEN}Frontend will open at: http://localhost:3000${NC}"
echo -e "${GREEN}Backend API at: http://localhost:3000/api${NC}"
