# Build stage - Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npm run build

# Build stage - Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app

# Copy backend build
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY backend/package*.json ./backend/

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build ./frontend/build
COPY frontend/package*.json ./frontend/

# Install serve to serve frontend
RUN npm install -g serve

EXPOSE 3000

CMD ["sh", "-c", "cd /app/backend && npm run start"]
