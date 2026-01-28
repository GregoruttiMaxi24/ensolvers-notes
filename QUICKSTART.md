# 🚀 Ensolvers Notes - Getting Started

## Quickest Way to Start (3 Steps)

### Windows Users:
```cmd
1. Double-click: setup.bat
2. Wait for installation to complete
3. Follow the on-screen instructions
```

### macOS/Linux Users:
```bash
1. chmod +x setup.sh && ./setup.sh
2. Wait for installation to complete
3. Follow the on-screen instructions
```

---

## What setup.sh / setup.bat Does:

1. ✓ Installs backend dependencies (NestJS, TypeORM, JWT auth)
2. ✓ Installs frontend dependencies (React, React Router, Axios)
3. ✓ Shows you the commands to start the app

---

## Starting the Application (After Setup)

### Terminal 1 - Backend:
```bash
cd backend
npm start:dev
```

Expected output:
```
[NestJS] Starting Nest application...
✓ Admin user created: admin/admin
✓ Backend corriendo en puerto 3000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view frontend in the browser at http://localhost:3000
```

---

## Login Credentials

```
Email:    admin
Password: admin
```

---

## What You Can Do

✅ Create, edit, delete notes
✅ Archive/unarchive notes  
✅ Categorize notes
✅ Filter by category
✅ See only your own notes (after login)

---

## Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **API Docs**: See [DEPLOYMENT.md](DEPLOYMENT.md) for endpoint list

---

## Need Help?

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

---

## Project Structure

```
.
├── backend/              ← NestJS server
├── frontend/             ← React client
├── setup.sh             ← Linux/macOS setup
├── setup.bat            ← Windows setup
├── README.md            ← Full documentation
├── DEPLOYMENT.md        ← API & deployment guide
└── TROUBLESHOOTING.md   ← Common issues & fixes
```

---

## System Requirements

- Node.js v18.17.0 or higher
- npm v9.6.0 or higher
- 500MB free disk space

Check versions:
```bash
node --version
npm --version
```

---

## That's It! 🎉

Your full-stack notes app is ready. Enjoy!
