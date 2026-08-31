# Deploying like Vercel (git push → live URL, no server to manage)

This is the closest match to a Vercel-style workflow for this stack. It
splits across two platforms because Vercel itself is built for frontend/
serverless code — it can't run a persistent Django process with a
multi-GB PyTorch model loaded in memory. So:

- **Frontend (React)** → Vercel, exactly like you're picturing.
- **Backend (Django + YOLOv8)** → Render (or Railway), which does the same
  "connect GitHub, get a URL" thing but for real backend processes.

Both watch your GitHub repo and redeploy automatically on every push —
that's the actual "Vercel-like" part.

## 1. Backend → Render

1. Push this repo (with the `Dockerfile.backend` from the deploy package)
   to GitHub if it isn't already.
2. On [render.com](https://render.com): **New → Web Service**, connect the
   repo, choose **Docker** as the environment, and point it at
   `Dockerfile.backend`.
3. Set environment variables in the Render dashboard (same ones as
   `.env.example`):
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS` → your Render URL, e.g.
     `agrivision-backend.onrender.com`
   - `CORS_ALLOWED_ORIGINS` → your Vercel URL once you have it, e.g.
     `https://agrivision.vercel.app`
4. **Model weights (`best.pt`)**: Render builds from your Git repo, and
   `*.pt` is gitignored — there's no drag-and-drop upload like on a VPS.
   Two options:
   - **Git LFS** (simplest): `git lfs track "*.pt"`, commit `best.pt`
     through LFS, remove it from `.gitignore`. Render supports LFS repos.
   - **Download at startup**: host `best.pt` somewhere (S3, a Hugging Face
     model repo, etc.) and have `entrypoint.sh` download it before
     starting Gunicorn if it isn't already present. I can wire this up if
     you tell me where you'd host the file.
5. Deploy. Render gives you a URL like
   `https://agrivision-backend.onrender.com`.

## 2. Frontend → Vercel

1. On [vercel.com](https://vercel.com): **New Project**, import the same
   GitHub repo.
2. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel usually detects this automatically).
3. Add one environment variable:
   - `VITE_API_URL` = your Render backend URL from step 1, e.g.
     `https://agrivision-backend.onrender.com`
4. Deploy. Vercel gives you a URL like `https://agrivision.vercel.app`.
5. Go back to Render and confirm `CORS_ALLOWED_ORIGINS` matches this exact
   Vercel URL (with `https://`, no trailing slash).

## Why the frontend needed code changes

Three of the five API calls in `src/app/components/` had
`http://127.0.0.1:8000` hardcoded directly in the `fetch()` call — that
would only ever work on your own machine, not just on Vercel. All five
calls now go through `src/app/api.ts`, which reads `VITE_API_URL` at
build time and falls back to relative paths (`/login/`) when unset — so
the same code works for both this split setup and the Docker
Compose/same-origin setup from before.

They also now send `credentials: "include"`, and Django's cookie settings
switch to cross-site mode (`SameSite=None; Secure`) whenever
`CORS_ALLOWED_ORIGINS` is set. This is required because the session
cookie set by `/login/` needs to reach the browser even though the
frontend and backend are on different domains — without it, login would
appear to succeed but no session would actually persist.

## Things worth knowing before you commit to this

- **Render's free tier gives 512MB RAM.** `torch` + `ultralytics` + an
  actual segmentation model loaded in memory will not fit comfortably in
  that — expect to need a paid instance (Render's Standard tier or
  similar, more RAM) for this to run reliably. Free-tier services also
  spin down after 15 minutes of inactivity, so the first request after
  idle time will be slow (cold start) — noticeable but survivable for a
  demo, not for real users.
- **Cross-origin cookies require HTTPS on both ends.** Render and Vercel
  both give you HTTPS by default, so this isn't extra work — just noting
  it's why `SESSION_COOKIE_SECURE=True` won't cause problems here.
- **This is a bit more moving parts than the Docker Compose setup**, not
  less — you're managing two dashboards and two sets of env vars instead
  of one `docker-compose.yml`. The upside is you never SSH into a server
  or run a deploy command yourself again; push to `main` and both
  platforms redeploy on their own.
