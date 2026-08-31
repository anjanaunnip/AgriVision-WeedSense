// Base URL for the Django backend.
//
// - Docker Compose / same-origin setup (nginx proxying both): leave
//   VITE_API_URL unset at build time. Requests go to relative paths like
//   "/login/", which nginx routes to the backend container.
// - Split deployment (e.g. frontend on Vercel, backend on Render/Railway):
//   set VITE_API_URL to the backend's full URL (e.g.
//   "https://agrivision-backend.onrender.com") when building the frontend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";
