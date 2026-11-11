# PATHFORGE — VERCEL DEPLOYMENT READINESS ASSESSMENT

**Date:** 2026-11-10 (Final Demo Readiness Assessment)  
**Target Platform:** Vercel (Next.js 16 App Router + Serverless Functions)  
**Purpose:** University Assignment & Portfolio Demonstration  
**Repository:** `https://github.com/AditTempest25/Career-Path`  

---

## 1. Build Configuration & Prerequisites

### 1.1 Vercel Dashboard Settings
In **Vercel Dashboard → Project Settings → Build & Development Settings**, ensure:
- **Framework Preset:** `Next.js`
- **Build Command:** `next build` *(Ensure any legacy v0 override such as `node .v0/inject-built-with-v0.mjs && next build` is turned **OFF**)*
- **Install Command:** `pnpm install`
- **Output Directory:** Default (`.next`)

### 1.2 Required Environment Variables
- **None required (`0` environment variables needed).**
- All obsolete `@supabase/*` packages and `lib/supabase/*` files have been removed, so `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not needed.
- `process.env.VERCEL` is automatically provided by the Vercel runtime and triggers the writable `/tmp/pathforge-data/pathforge-db.json` + in-memory cache storage mode in `lib/server/db.ts`.

---

## 2. Temporary Database & Cache Behavior on Vercel (Intentional Demo Limitations)

By confirmed decision, PathForge uses a zero-configuration temporary storage architecture (`lib/server/db.ts` + browser `localStorage` in `lib/store.tsx`) tailored for academic evaluation and portfolio demonstration:

1. **User Data Is Not Guaranteed to Persist Permanently on Vercel:**
   - Server-side data is stored in `/tmp/pathforge-data/pathforge-db.json` and an in-process `memoryCache`. When a Vercel serverless container cold-starts or recycles after inactivity, server-side records created in that container are reset.
2. **Data May Differ Between Serverless Instances:**
   - Under concurrent load, Vercel may spin up multiple isolated serverless function instances, each with its own `/tmp` directory and memory cache.
3. **Login Sessions May Expire If Temporary Session Data Disappears:**
   - If a serverless container cold-starts, a previously issued `pathforge_session` cookie token may no longer exist in the new container's session table, requiring the user to log in again (while their learning progress remains cached in their browser's `localStorage`).
4. **Use Disposable Demo Credentials Only:**
   - Evaluators and visitors should use the **1-Click Demo Account (`demo@pathforge.id` / `demo1234`)**—which is automatically re-seeded on every cold start—or disposable test accounts.

---

## 3. Final Go / No-Go Recommendation

### Recommendation: **GO (Ready for Vercel University Assignment & Portfolio Demo Deployment)**

- **Build & Type Safety:** `pnpm install --frozen-lockfile`, `next typegen`, `tsc --noEmit --incremental false`, and `pnpm run build` (with strict TypeScript validation enabled) all pass with **0 errors**.
- **Clean Route Tree:** All 20 obsolete v0 files and unused `@supabase/*` dependencies have been removed, and 9 legacy URLs cleanly redirect to active routes.
- **Full Functional Verification:** All 45 live HTTP assertions across authentication, session lifecycle, user data sync, main pages, and legacy redirects passed (`45/45 PASS`).
