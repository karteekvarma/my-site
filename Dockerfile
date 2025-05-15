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

# Optional: silence pip version warnings and speed things up
RUN mkdir -p /root/.config/pip && \
    echo "[global]\ndisable-pip-version-check = true\nno-cache-dir = true" > /root/.config/pip/pip.conf

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./backend/

# Copy .env for Mistral API key (optional - you can also mount at runtime)
COPY backend/rag_bot/rag-bot-key.env ./backend/rag_bot/rag-bot-key.env

# Copy built React frontend into backend
COPY --from=frontend /app/dist ./frontend_build/

# Set environment variable to point to .env file
ENV DOTENV_PATH=./backend/rag_bot/rag-bot-key.env

# Expose FastAPI default port
EXPOSE 8000

# Start FastAPI app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
