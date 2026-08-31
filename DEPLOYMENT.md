# Deploying AgriVision WeedSense (Docker Compose)

## What changed from your repo

Three real blockers had to be fixed before this could run in a container —
none of these were deployment config, they were code issues:

1. **`agrivision/backend/yolo_inference.py`** — `MODEL_PATH` was hardcoded to
   `D:/AgriVisionWeedSense/best.pt`, a Windows-only absolute path. It now
   reads `YOLO_MODEL_PATH` from the environment (falling back to
   `<project_root>/best.pt`), matching the volume mount below.
2. **`agrivision/agrivision/settings.py`** — `SECRET_KEY`, `DEBUG`, and
   `ALLOWED_HOSTS` were hardcoded (`DEBUG=True`, hosts limited to
   `localhost`), which won't work outside your machine and is unsafe to run
   as-is in production. All three now read from environment variables, with
   the original values kept as defaults so local `runserver` use is
   unaffected. `DATABASES` and `CORS_ALLOWED_ORIGINS` were also made
   configurable (SQLite/allow-all remain the defaults).
3. **`agrivision/backend/views.py`** — `login_view` called `authenticate()`
   but never called Django's `login()`, so no session was ever actually
   established on a successful login (every subsequent request stayed
   anonymous). Now calls `login(request, user)` so the session cookie gets
   set. This works without extra CORS/cookie config because nginx serves
   the frontend and proxies the API on the same origin — a browser sees
   `/` and `/login` as the same site.
4. **`requirements.txt`** was saved as UTF-16 (likely from a Windows `pip
   freeze` in PowerShell), which breaks `pip install -r requirements.txt` on
   Linux. Re-saved as UTF-8, and added `gunicorn` (needed to serve Django in
   production — the repo only had `runserver` set up).

## New files

| File | Purpose |
|---|---|
| `Dockerfile.backend` | Django + YOLOv8 + OpenCV service |
| `Dockerfile.frontend` | Vite build served by Nginx |
| `nginx.conf` | Routes API calls to Django, serves the React SPA otherwise |
| `entrypoint.sh` | Runs migrations + collectstatic, then starts Gunicorn |
| `docker-compose.yml` | Wires backend + frontend together |
| `.env.example` | Template for the required environment variables |
| `.dockerignore` | Keeps build context small |

## Before you run it

1. **Model weights**: `best.pt` is gitignored and isn't in the repo. Place
   your trained weights file at the repo root, next to `docker-compose.yml`,
   as `best.pt` — it's mounted read-only into the backend container.
2. **Environment**: `cp .env.example .env` and fill in a real
   `DJANGO_SECRET_KEY`, your domain in `DJANGO_ALLOWED_HOSTS`, and your
   frontend URL in `CORS_ALLOWED_ORIGINS`.

## Run it

```bash
docker compose up -d --build
```

- Frontend: `http://<your-server>/`
- Backend API (proxied through nginx, not exposed directly): `/signup`,
  `/login`, `/upload-image`, `/download-report`, `/download-gis-report`

First run will take a while — the backend image installs `torch`,
`torchvision`, and `ultralytics`.

## Known limitations worth knowing about

- **`torch`/`torchvision` install from PyPI by default**, which pulls the
  CUDA-enabled wheels (several GB) even on a CPU-only host. If you're
  deploying to a CPU-only server, uncomment the CPU wheel install line at
  the top of `Dockerfile.backend` before building.
- **SQLite is the default DB**, same as your current setup — fine for a
  single-instance/demo deployment, but it doesn't handle concurrent writes
  well under real traffic. A commented-out Postgres service is in
  `docker-compose.yml` if you want to switch later — uncomment it and the
  matching `POSTGRES_*` vars in `.env`.
- **No GPU config included.** This setup runs inference on CPU. If you have
  access to a GPU host, that's a separate `docker-compose` change (an
  `nvidia` runtime + `deploy.resources.reservations.devices` block) — let me
  know if you want that added.
