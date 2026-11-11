# PATHFORGE — REMEDIATION LOG

**Date:** 2026-11-10 (Updated Post-Legacy Cleanup)  
**Scope:** Phase 2 Targeted Remediation & Approved Legacy v0 Cleanup

---

## 1. Code & Configuration Modifications

| # | File Modified | Change Implemented | Reason |
| :- | :--- | :--- | :--- |
| 1 | `next.config.mjs` | Removed `typescript: { ignoreBuildErrors: true }` and added `async redirects()` mapping 9 legacy `/auth/*` and `/dashboard/*` URLs to active routes (`/login`, `/register`, `/careers`, `/roadmap`, `/simulator`, `/portfolio`, `/settings`). | Restores strict TypeScript build validation and maintains navigation compatibility after removing legacy v0 route directories. |
| 2 | `next-env.d.ts` | Regenerated via `npx --yes pnpm@10.28.0 exec next typegen` after cleaning `.next` cache. | Resolved `TS2344` route constraint conflict between `.next/dev/types` and `.next/types`. |
| 3 | `components/landing/navbar.tsx` | Restored desktop `<ThemeToggle />`, authenticated user check (`{ready && user ? <Link href="/dashboard">Ke Dashboard</Link> : ...}`), and Bahasa Indonesia labels (`Masuk` / `Mulai Gratis`). | Fixed desktop regression introduced during manual Git merge conflict resolution. |
| 4 | `components/landing/hero-section.tsx` | Updated primary CTA link from `/auth/register` to `/register` and wired "Watch Demo" button to `/login`. | Prevented users from being routed to the removed legacy Supabase registration form. |
| 5 | `components/landing/cta-section.tsx` | Updated bottom CTA link from `/auth/register` to `/register`. | Ensured all Landing Page registration CTAs point to `/register`. |
| 6 | `lib/server/session.ts` | Updated `secure` cookie attribute to `hdrs.get("x-forwarded-proto") === "https" || Boolean(process.env.VERCEL)`. | Fixed cookie persistence on local HTTP production server (`next start`) while keeping `Secure` active on Vercel HTTPS. |
| 7 | `package.json` & `pnpm-lock.yaml` | Executed `pnpm remove @supabase/ssr @supabase/supabase-js` and verified with `pnpm install --frozen-lockfile`. | Removed 10 unused packages after confirming zero active Supabase imports. |

---

## 2. Obsolete Legacy v0 Files Removed

All 20 files below were verified to have zero imports from the active application before deletion:

### Removed Legacy Auth Routes & Components (`app/auth/*`, `components/auth/*`, `lib/supabase/*`)
- `app/auth/callback/route.ts`
- `app/auth/forgot-password/page.tsx`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `components/auth/auth-card.tsx`
- `components/auth/forgot-password-form.tsx`
- `components/auth/login-form.tsx`
- `components/auth/register-form.tsx`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`

### Removed Legacy Static Dashboard Routes & Components (`app/dashboard/*`, `components/dashboard/*`)
- `app/dashboard/page.tsx` *(previously staged deletion)*
- `app/dashboard/layout.tsx`
- `app/dashboard/career-gps/page.tsx`
- `app/dashboard/portfolio/page.tsx`
- `app/dashboard/profile/page.tsx`
- `app/dashboard/roadmap/page.tsx`
- `app/dashboard/settings/page.tsx`
- `app/dashboard/simulator/page.tsx`
- `components/dashboard/sidebar.tsx`
- `components/dashboard/top-bar.tsx`

---

## 3. Legacy Routes Redirected (`next.config.mjs`)

| Legacy URL | Redirect Destination | HTTP Status |
| :--- | :--- | :---: |
| `/auth/login` | `/login` | `307 Temporary Redirect` |
| `/auth/register` | `/register` | `307 Temporary Redirect` |
| `/auth/forgot-password` | `/login` | `307 Temporary Redirect` |
| `/dashboard/career-gps` | `/careers` | `307 Temporary Redirect` |
| `/dashboard/roadmap` | `/roadmap` | `307 Temporary Redirect` |
| `/dashboard/simulator` | `/simulator` | `307 Temporary Redirect` |
| `/dashboard/portfolio` | `/portfolio` | `307 Temporary Redirect` |
| `/dashboard/profile` | `/settings` | `307 Temporary Redirect` |
| `/dashboard/settings` | `/settings` | `307 Temporary Redirect` |

---

## 4. Retained Files & Remaining Technical Notes

1. **Retained Hooks (`hooks/use-mobile.ts`, `hooks/use-toast.ts`):** Retained because `components/ui/sidebar.tsx` imports `@/hooks/use-mobile` and `components/ui/toaster.tsx` imports `@/hooks/use-toast`.
2. **Retained Temporary Database (`lib/server/db.ts`):** Per final decision, the file/tmp + in-memory cache database is retained without cloud DB migration for university assignment and portfolio demo use.
3. **Git-Tracked `tsconfig.tsbuildinfo`:** Currently ignored in `.gitignore` (`*.tsbuildinfo`) but still tracked from an earlier commit; can be untracked during commit via `git rm --cached tsconfig.tsbuildinfo`.
