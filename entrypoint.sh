#!/bin/sh
set -e

cd /app/agrivision

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
# --timeout 120: YOLOv8 segmentation on a full drone image can take a while
# on CPU, and the default 30s worker timeout will kill the request mid-inference.
exec gunicorn agrivision.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 1 \
    --timeout 120
