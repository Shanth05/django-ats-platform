# Stage 1: Build frontend
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY templates /app/templates
COPY frontend/ .
RUN npm run build

# Stage 2: Django app
FROM python:3.11-slim
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# Copy built frontend assets
COPY --from=frontend /app/frontend/dist ./staticfiles

RUN python manage.py collectstatic --noinput || true

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "ats_platform.wsgi:application"]
