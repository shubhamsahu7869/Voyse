# Voyse

Voyse is a premium travel concierge app that turns booking documents into a polished day-by-day itinerary. It includes a Vite React frontend and an Express/MongoDB API with JWT auth, multi-file uploads, optional Gemini itinerary generation, public sharing, and print-to-PDF support.

## Quick start

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Configure MongoDB before registering an account. The frontend uses the API for authentication, uploads, itinerary generation, history, and sharing, with polished example itinerary content as a graceful fallback if an API request is temporarily unavailable.

## Environment

Backend variables are documented in `backend/.env.example`. Add `MONGODB_URI` and `JWT_SECRET` for live persistence and authentication. Add `GEMINI_API_KEY` for the required AI document extraction and itinerary generation. The API uses a polished deterministic fallback when it is omitted, which is useful for local UI development but should not be used for the assessment demo.

Frontend variables are documented in `frontend/.env.example`.

## API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `POST /api/upload`
- `POST /api/itinerary/generate`, `GET /api/itinerary`, `GET /api/itinerary/:id`, `DELETE /api/itinerary/:id`
- `POST /api/share/:itineraryId`, `GET /api/share/:slug`

## Deploy to Vercel and Render

Push this repository to GitHub first. The included `render.yaml` and `frontend/vercel.json` files contain the platform-specific defaults.

### 1. Create a MongoDB Atlas database

Create a free MongoDB Atlas cluster, add a database user, and allow connections from `0.0.0.0/0`. Copy the Atlas connection string and replace its password placeholder.

### 2. Deploy the API on Render

1. In Render, select **New > Blueprint** and connect the GitHub repository.
2. Render detects `render.yaml` and creates the `voyse-api` web service.
3. Enter the required secret values when prompted:
   - `MONGODB_URI`: the MongoDB Atlas connection string
   - `FRONTEND_URL`: temporarily use `http://localhost:5173`
   - `GEMINI_API_KEY`: required for the assessment demo; create one in Google AI Studio
4. Deploy and copy the generated API URL, such as `https://voyse-api.onrender.com`.
5. Verify `https://YOUR-RENDER-URL/api/health` returns `{"status":"ok"}`.

Render's default filesystem is ephemeral. Uploaded files are sufficient for a demo but disappear after a redeploy or restart. For durable uploads, use a paid Render disk mounted at `/opt/render/project/src/uploads` and set `UPLOAD_DIR` to that path, or replace local uploads with S3.

### 3. Deploy the frontend on Vercel

1. In Vercel, select **Add New > Project** and import the same GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Vercel detects Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add `VITE_API_URL=https://YOUR-RENDER-URL/api`.
5. Deploy and copy the generated frontend URL, such as `https://voyse.vercel.app`.

The included `frontend/vercel.json` rewrite sends deep links such as `/dashboard` and `/share/example` to the React app instead of returning a Vercel 404.

### 4. Finalize Render CORS

Return to the Render service environment variables and change `FRONTEND_URL` to your Vercel URL:

```text
FRONTEND_URL=https://YOUR-VERCEL-URL
```

Redeploy the Render service. To allow more than one frontend origin, provide a comma-separated list.
