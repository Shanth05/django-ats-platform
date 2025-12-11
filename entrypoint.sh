#!/bin/sh
set -e

# Use Railway's PORT or default to 8000
if [ -z "$PORT" ]; then
  PORT=8000
fi

# Debug: Log the PORT value (will appear in Railway logs)
echo "Starting Gunicorn on port: $PORT"

# Ensure PORT is numeric
if ! echo "$PORT" | grep -qE '^[0-9]+$'; then
  echo "ERROR: PORT must be numeric, got: '$PORT'"
  exit 1
fi

# Start Gunicorn with explicit port
exec gunicorn ats_platform.wsgi:application --bind "0.0.0.0:$PORT" --workers 3
