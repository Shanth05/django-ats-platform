#!/bin/sh
set -e

# Debug: Log all environment variables related to PORT
echo "=== Entrypoint Script Starting ==="
echo "PORT environment variable: '${PORT:-NOT SET}'"
echo "All env vars containing PORT:"
env | grep -i port || echo "No PORT-related env vars found"

# Use Railway's PORT or default to 8000
if [ -z "$PORT" ]; then
  echo "PORT not set, using default: 8000"
  PORT=8000
else
  echo "Using PORT from environment: $PORT"
fi

# Ensure PORT is numeric and valid
if ! echo "$PORT" | grep -qE '^[0-9]+$'; then
  echo "ERROR: PORT must be numeric, got: '$PORT'"
  exit 1
fi

# Validate port range (1-65535)
if [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
  echo "ERROR: PORT must be between 1 and 65535, got: $PORT"
  exit 1
fi

echo "Starting Gunicorn on port: $PORT"

# Start Gunicorn with explicit port (using exec to replace shell process)
exec gunicorn ats_platform.wsgi:application --bind "0.0.0.0:$PORT" --workers 3
