# Build stage
FROM node:18-alpine

WORKDIR /app

# Copy backend dependencies and source
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci

# Copy backend source and build
COPY backend/src ./src
COPY backend/tsconfig*.json ./
COPY backend/nest-cli.json ./
RUN npm run build

# Copy frontend build artifacts (if available)
WORKDIR /app
COPY frontend/build ./backend/public 2>/dev/null || true

EXPOSE 3000

WORKDIR /app/backend
CMD ["npm", "run", "start"]
