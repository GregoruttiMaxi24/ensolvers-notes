# Ensolvers Notes - Full Stack Application

A modern, full-stack note-taking application with authentication, categorization, and archiving features built with NestJS and React.

## 📋 Features

### Phase 1 (Completed)
- ✅ Create, edit, and delete notes
- ✅ Archive/unarchive notes
- ✅ List active notes
- ✅ List archived notes

### Phase 2 (Completed)
- ✅ Add/remove categories to notes
- ✅ Filter notes by category

### Extra Features
- ✅ User authentication with JWT
- ✅ Login screen with default credentials
- ✅ Per-user note isolation
- ✅ Responsive UI with React

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.17.0 or higher
- **npm**: 9.6.0 or higher
- **Git**: 2.40.0 or higher

### Automated Setup

#### Linux/macOS:
```bash
chmod +x setup.sh
./setup.sh
```

#### Windows:
```bash
setup.bat
```

### Manual Setup

#### Backend Setup:
```bash
cd backend
npm install
npm run build
npm start:dev
```

Backend will run on `http://localhost:3000/api`

#### Frontend Setup (in another terminal):
```bash
cd frontend
npm install
npm start
```

Frontend will open at `http://localhost:3000`

## 🔐 Default Credentials

```
Email: admin
Password: admin
```

## 📁 Project Structure

```
ensolvers-notes/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── notes/          # Notes module
│   │   └── main.ts         # App entry point
│   └── package.json
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── Login.tsx       # Login page
│   │   ├── Dashboard.tsx   # Notes dashboard
│   │   ├── api.ts          # API configuration
│   │   └── App.tsx         # App routing
│   └── package.json
├── setup.sh               # Unix setup script
└── setup.bat             # Windows setup script
```

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS 11.0.1
- **Database**: SQLite 3 (Development) / PostgreSQL (Production-ready)
- **ORM**: TypeORM 0.3.28
- **Authentication**: JWT with Passport.js
- **Password Hashing**: bcrypt 5.1.7
- **Node.js**: 18.17.0+
- **TypeScript**: 5.7.3

### Frontend
- **Framework**: React 19.2.4
- **Language**: TypeScript 5.0+
- **Routing**: React Router v6
- **HTTP Client**: Axios 1.7.2
- **Build Tool**: Create React App 5.0.1
- **Node.js**: 18.17.0+
- **npm**: 9.6.0+

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Notes (Protected - Requires JWT)
- `GET /api/notes` - Get all notes
- `GET /api/notes/active` - Get active notes
- `GET /api/notes/archived` - Get archived notes
- `GET /api/notes/category/:category` - Filter by category
- `POST /api/notes` - Create note
- `PATCH /api/notes/:id` - Update note
- `PATCH /api/notes/:id/toggle` - Toggle archive
- `DELETE /api/notes/:id` - Delete note

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Notes Table
```sql
CREATE TABLE note (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  archived BOOLEAN DEFAULT FALSE,
  category VARCHAR(255),
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id)
);
```

## 🔒 Security Features

- JWT-based authentication with 24-hour expiration
- Password hashing with bcrypt
- CORS enabled for frontend communication
- Per-user note isolation
- Protected API routes with JWT Guard

## 📝 Environment Variables

### Backend (.env)
```
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
DATABASE_URL=sqlite://./db.sqlite
PORT=3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/api
```

## 🚢 Production Deployment

### Backend (e.g., Heroku)
1. Set environment variables:
   - `JWT_SECRET`: Change to a strong secret
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: production

2. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend (e.g., Netlify, Vercel)
1. Set environment variable:
   - `REACT_APP_API_URL`: Production API URL

2. Deploy:
   ```bash
   npm run build
   # Deploy the build folder
   ```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Unit tests
npm run test:e2e        # E2E tests
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📄 License

UNLICENSED

## 👨‍💻 Development Notes

- Backend runs on port 3000 by default (configurable via PORT env var)
- Frontend proxy is configured to call backend API at port 3000
- Database auto-synchronizes on startup (development only)
- Admin user is automatically seeded on first run

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess  # Windows
```

### Database Issues
```bash
# Reset database
rm backend/db.sqlite
npm start:dev  # Will recreate on startup
```

### CORS Errors
Ensure backend CORS is enabled (it is by default in main.ts)

## 📞 Support

For issues or questions, please check the backend and frontend README files for more specific information.
