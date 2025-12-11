#!/bin/bash
set -e

# Use Railway's PORT or default to 8000
PORT=${PORT:-8000}

# Start Gunicorn
exec gunicorn ats_platform.wsgi:application --bind 0.0.0.0:$PORT --workers 3
