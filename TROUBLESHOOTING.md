# Troubleshooting Guide

## Common Issues and Solutions

### 1. **npm: command not found**

**Problem**: npm no está instalado o no está en PATH

**Solution**:
1. Install Node.js from https://nodejs.org/ (v18.17.0+)
2. Verify installation: `node --version` y `npm --version`
3. Restart terminal after installation

---

### 2. **ENOENT: no such file or directory, open 'package.json'**

**Problem**: npm es ejecutado desde el directorio equivocado

**Solution**:
```bash
# Make sure you're in the right directory
cd backend    # for backend setup
npm install

# OR
cd frontend   # for frontend setup
npm install
```

---

### 3. **Port 3000 Already in Use**

**Problem**: Port 3000 is already being used by another process

**Solution - Windows**:
```powershell
# Find process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**Solution - macOS/Linux**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Alternative**: Change ports in `.env` files or use different ports:
- Backend: `PORT=3001` in backend/.env
- Frontend: `PORT=3001` in frontend/.env.local

---

### 4. **"Unknown command: start:dev"**

**Problem**: npm scripts not defined correctly

**Solution**:
1. Verify you're in the backend directory: `cd backend`
2. Check package.json has the script:
   ```bash
   npm run build  # Build first
   npm start:dev  # Then start with watch mode
   ```
3. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### 5. **CORS Error (Access-Control-Allow-Origin)**

**Problem**: Frontend can't communicate with backend

**Solution**:
1. Ensure backend is running: `npm start:dev` in backend directory
2. Verify backend URL in frontend `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```
3. Restart frontend: `npm start` in frontend directory
4. Check browser console for exact error

---

### 6. **Database Error (sqlite3)**

**Problem**: SQLite database locked or corrupted

**Solution**:
```bash
# Delete the old database
cd backend
rm db.sqlite

# Restart backend - it will create a new database
npm start:dev
```

---

### 7. **Login Screen but No Credentials Work**

**Problem**: Admin user not created

**Solution**:
1. Check backend logs for "Admin user created"
2. Reset database:
   ```bash
   cd backend
   rm db.sqlite
   npm start:dev
   ```
3. Wait for "✓ Admin user created: admin/admin" message

---

### 8. **Blank Screen After Login**

**Problem**: Frontend can't load notes from backend

**Solution**:
1. Open browser DevTools (F12) → Console tab
2. Check for error messages
3. Verify backend is running: `npm start:dev` in backend directory
4. Verify API URL in frontend: `http://localhost:3000/api`
5. Check network requests in DevTools → Network tab

---

### 9. **npm install Takes Forever or Fails**

**Problem**: Network issues or disk space

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try again with verbose output
npm install --verbose

# Or use different registry
npm install --registry https://registry.npmjs.org/
```

---

### 10. **Permission Denied on setup.sh (macOS/Linux)**

**Problem**: Script not executable

**Solution**:
```bash
chmod +x setup.sh
./setup.sh
```

---

### 11. **TypeError: Cannot find module (at runtime)**

**Problem**: Dependencies not installed or corrupted

**Solution**:
```bash
# Full clean installation
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### 12. **Backend Compilation Errors (TypeScript)**

**Problem**: TypeScript errors during build

**Solution**:
```bash
cd backend
npm run build

# If still fails, try:
npm install --save-dev typescript @nestjs/cli
npx nest build
```

---

## Diagnostic Commands

### Check versions:
```bash
node --version
npm --version
npm list @nestjs/core
npm list react
```

### Check ports:
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

### Test backend API:
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"admin"}'

# Get notes (replace TOKEN with actual token)
curl -X GET http://localhost:3000/api/notes \
  -H "Authorization: Bearer TOKEN"
```

### Check environment variables:
```bash
# Backend
cat backend/.env

# Frontend
cat frontend/.env.local
```

---

## Still Having Issues?

1. Check the main [README.md](README.md)
2. Review [DEPLOYMENT.md](DEPLOYMENT.md)
3. Check terminal error messages carefully
4. Verify Node.js and npm versions
5. Try a complete clean installation:
   ```bash
   rm -rf backend/node_modules frontend/node_modules
   npm cache clean --force
   ./setup.sh  # or setup.bat on Windows
   ```

---

## Reporting Issues

When reporting an issue, please include:
1. Operating system and version
2. Node.js version: `node --version`
3. npm version: `npm --version`
4. Full error message from terminal
5. Steps to reproduce
6. What you've already tried
