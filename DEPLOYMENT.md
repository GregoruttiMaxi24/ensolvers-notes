# 🚀 Deployment & Running Instructions

## Quick Start (Recommended)

### Windows
```bash
.\setup.bat
```

### macOS / Linux
```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Install all backend dependencies
2. Build the TypeScript backend
3. Install all frontend dependencies

---

## Manual Execution

### Terminal 1 - Start Backend

```bash
cd backend
npm start:dev
```

Expected output:
```
[Nest] 12345 - 01/28/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 01/28/2026, 10:30:02 AM     LOG [InstanceLoader] AppModule dependencies initialized
✓ Admin user created: admin/admin
✓ Backend corriendo en puerto 3000
```

### Terminal 2 - Start Frontend

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## Login

- **URL**: http://localhost:3000
- **Email**: admin
- **Password**: admin

---

## API Documentation

All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Get Token
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin",
  "password": "admin"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin"
  }
}
```

### Create Note
```bash
POST http://localhost:3000/api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "category": "Work"
}
```

### Get All Notes
```bash
GET http://localhost:3000/api/notes
Authorization: Bearer <token>
```

### Get Active Notes
```bash
GET http://localhost:3000/api/notes/active
Authorization: Bearer <token>
```

### Get Archived Notes
```bash
GET http://localhost:3000/api/notes/archived
Authorization: Bearer <token>
```

### Filter by Category
```bash
GET http://localhost:3000/api/notes/category/Work
Authorization: Bearer <token>
```

### Update Note
```bash
PATCH http://localhost:3000/api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Personal"
}
```

### Toggle Archive
```bash
PATCH http://localhost:3000/api/notes/:id/toggle
Authorization: Bearer <token>
```

### Delete Note
```bash
DELETE http://localhost:3000/api/notes/:id
Authorization: Bearer <token>
```

---

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
DATABASE_URL=sqlite://./db.sqlite
PORT=3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## Troubleshooting

### Port 3000 Already in Use

**Windows:**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**macOS/Linux:**
```bash
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

Or change ports in `.env` files.

### CORS Issues

If you see CORS errors, ensure:
1. Backend CORS is enabled (it is by default in `main.ts`)
2. Frontend API URL matches backend URL in `.env`

### Database Locked / SQLite Issues

```bash
cd backend
rm db.sqlite
npm start:dev  # Will recreate on startup
```

### Dependencies Installation Issues

```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Production Deployment

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
# Then:
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET="your-strong-secret"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main
```

### Deploy Frontend to Netlify/Vercel

```bash
# Build frontend
cd frontend
npm run build

# Deploy build folder to Netlify or Vercel
# Set environment variable:
# REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

---

## Testing

### Backend Unit Tests
```bash
cd backend
npm test
```

### Backend E2E Tests
```bash
cd backend
npm run test:e2e
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## Version Info

- Node.js: 18.17.0+
- npm: 9.6.0+
- NestJS: 11.0.1
- React: 19.2.4
- TypeScript: 5.7.3

---

## Support

For issues or questions, check the main [README.md](../README.md) or individual package READMEs.
