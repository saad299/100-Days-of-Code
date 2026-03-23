### Complete Summary

---

#### 1. Backend Deployment on Vercel
- Added `vercel.json` to route all requests to `dist/server.js`
- Updated `server.ts` to export the app (`export default app`) so Vercel can use it as a serverless function
- Fixed `package.json` — changed `"main": "index.ts"` to `"main": "dist/server.js"`
- Fixed `tsconfig.json` — added `"types": ["node"]`, removed `"jsx": "react-jsx"`
- Deployed via GitHub import on Vercel dashboard
- Added env variables (`MONGO_URI`, `JWT_SECRET` etc.) on Vercel dashboard
- Confirmed `Cannot GET /` means server is running correctly

---

#### 2. Frontend Deployment on Vercel
- Created `.env` file with `VITE_API_URL=http://localhost:3000/api` for local
- Used `import.meta.env.VITE_API_URL` to access it (no dotenv needed in Vite)
- Fixed `tsconfig.json` references issue that was causing `import.meta` errors
- Created `vite-env.d.ts` with `/// <reference types="vite/client" />`
- Fixed TypeScript error — changed `_id: number` to `_id: string` in User interface
- Deployed via GitHub import on Vercel dashboard

---

#### 3. Connecting Frontend & Backend
- Fixed CORS error — confirmed `app.use(cors())` was correctly placed before routes
- Fixed 308 redirect — removed trailing slash from `VITE_API_URL`
- Fixed 404 error — added `/api` to `VITE_API_URL` on Vercel dashboard to match backend route mounting (`/api/auth`, `/api/users`)
- Final working env variable: `VITE_API_URL=https://auth-express-backend.vercel.app/api`

---

**Both frontend and backend are now live and fully connected on Vercel.** ✅

| Layer | Tech | Deployed On |
|---|---|---|
| **Frontend** | React + TypeScript + TailwindCSS | Vercel |
| **Backend** | Express + TypeScript + Node.js | Vercel |
| **Database** | MongoDB (Atlas) | Cloud |

The complete flow is:

```
User → Frontend (Vercel) → Backend API (Vercel) → MongoDB (Atlas)
```

The only thing that makes it slightly different from a traditional full stack deployment is that the backend runs as a **serverless function** on Vercel rather than a traditional always-on server. But the concept is the same — frontend, backend and database all connected and live. ✅