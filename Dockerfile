# ---------- Stage 1: React Frontend ----------
FROM node:20-alpine AS frontend

WORKDIR /app
COPY frontend/ .

RUN npm ci && npm run build

# ---------- Stage 2: FastAPI Backend ----------
FROM python:3.11-slim AS backend

WORKDIR /app

# Pre-copy and install dependencies for better caching
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and built frontend
COPY backend/ ./backend/
COPY --from=frontend /app/dist ./frontend_build/


# Expose port for FastAPI
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
