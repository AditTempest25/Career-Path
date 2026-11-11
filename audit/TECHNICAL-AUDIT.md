# PATHFORGE — TECHNICAL AUDIT REPORT

**Date:** 2026-11-10 (Updated Post-Legacy Cleanup)  
**Project:** PathForge — Career GPS & Work Simulator (`D:\Project\Career Path`)  
**Repository:** `https://github.com/AditTempest25/Career-Path`  
**Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript 5.7.3, Tailwind CSS v4, pnpm 10.28.0  
**Target Use Case:** University Assignment & Portfolio Demonstration on Vercel  

---

## 1. Executive Summary

PathForge originated from a Vercel v0 scaffold (`commit 9c8e5fa`) and was subsequently expanded into a comprehensive Bahasa Indonesia Career GPS & Work Simulator platform (`commits faacd5b`, `4565ad0`). Following the initial technical audit and user approval of the **Final Legacy Cleanup & Vercel Demo Readiness** plan:

1. **Unified Active Architecture (`app/(app)/*`, `app/(auth)/*`, `app/api/*`, `lib/store.tsx`, `lib/server/*`)**:
   - All obsolete v0 Supabase and English static dashboard files (`app/auth/*`, `app/dashboard/*`, `components/auth/*`, `components/dashboard/*`, `lib/supabase/*`) and unused `@supabase/*` dependencies have been removed.
   - Legacy URLs (`/auth/login`, `/auth/register`, `/auth/forgot-password`, and `/dashboard/*` sub-routes) are now cleanly redirected (`HTTP 307`) via `next.config.mjs` to their active equivalents.
2. **Approved Temporary Storage Architecture (`lib/server/db.ts` + `lib/store.tsx`)**:
   - By confirmed decision for this university assignment and portfolio demo, the application retains its zero-configuration local/temporary file + memory cache storage (`data/pathforge-db.json` locally; `/tmp/pathforge-data/pathforge-db.json` + `memoryCache` on Vercel) paired with client-side `localStorage` persistence and 1-Click Demo seeding (`demo@pathforge.id`).

---

## 2. Final Application Architecture

### 2.1 Active Route & Component Hierarchy

| Layer | Active Implementation | Purpose |
| :--- | :--- | :--- |
| **Root Layout** | `app/layout.tsx` | Wraps application in `ThemeProvider` and `AppProvider` (`lib/store.tsx`) |
| **Landing Page** | `app/page.tsx` + `components/landing/*` | Marketing page with links to `/login`, `/register`, `/dashboard`, and `/careers/[id]` |
| **Auth Pages** | `app/(auth)/layout.tsx`, `app/(auth)/login/page.tsx` (`/login`), `app/(auth)/register/page.tsx` (`/register`) | Custom auth forms, 1-Click Demo Login, and 6-digit OTP Forgot Password modal |
| **Onboarding** | `app/onboarding/page.tsx` (`/onboarding`) | 8-question Career GPS assessment & initial career path selection |
| **Protected App Shell** | `app/(app)/layout.tsx` + `components/app/app-sidebar.tsx` | Enforces client auth (`!user -> /login`, `!data.onboarded -> /onboarding`), renders `AppSidebar` & `CommandPalette` |
| **Core Feature Pages** | `app/(app)/{dashboard,careers,roadmap,simulator,portfolio,jobs,interview,scanner,calculator,progress,settings}` | All 12 interactive Bahasa Indonesia product modules |
| **Public Portfolio** | `app/p/[username]/page.tsx` (`/p/[username]`) | Printable/shareable candidate portfolio view |
| **Backend Auth & Data API** | `app/api/auth/{login,register,demo,logout,me,account,forgot-password}/route.ts`, `app/api/user/data/route.ts` | Server-side `scrypt` password hashing, `pathforge_session` HTTP-Only cookie, and JSON/tmp persistence |

### 2.2 Legacy Files Removed vs. Retained

| File / Directory | Action Taken | Reason |
| :--- | :---: | :--- |
| `app/auth/{login,register,forgot-password}/page.tsx`, `app/auth/callback/route.ts` | **REMOVED** | Obsolete v0 Supabase routes replaced by `app/(auth)/{login,register}/page.tsx` and `/api/auth/*`; legacy URLs redirected in `next.config.mjs`. |
| `app/dashboard/layout.tsx`, `app/dashboard/{career-gps,roadmap,simulator,portfolio,profile,settings}/page.tsx` | **REMOVED** | Obsolete unguarded English v0 mock pages replaced by `app/(app)/*`; legacy URLs redirected in `next.config.mjs`. |
| `components/auth/{auth-card,login-form,register-form,forgot-password-form}.tsx` | **REMOVED** | Unused v0 Supabase form components; zero active imports. |
| `components/dashboard/{sidebar,top-bar}.tsx` | **REMOVED** | Unused v0 dashboard shell; active shell uses `components/app/app-sidebar.tsx`. |
| `lib/supabase/{client,server}.ts` & `@supabase/{ssr,supabase-js}` packages | **REMOVED** | Confirmed zero active imports; custom auth API is the approved authentication system. |
| `hooks/use-mobile.ts`, `hooks/use-toast.ts` | **RETAINED** | Actively imported by `components/ui/sidebar.tsx` (`@/hooks/use-mobile`) and `components/ui/toaster.tsx` (`@/hooks/use-toast`). |

---

## 3. Audit Findings & Resolution Status

| ID | Severity | Finding | Status |
| :--- | :---: | :--- | :---: |
| **HIGH-01** | High | Landing Page primary CTAs (`hero-section.tsx`, `cta-section.tsx`) linked to `/auth/register` & desktop `Navbar` lost `ThemeToggle` and `Ke Dashboard` button during merge | **RESOLVED** |
| **HIGH-02** | High | TypeScript route validation error (`TS2344: Type 'Route' does not satisfy the constraint '"/"'`) in `.next/types/validator.ts` due to stale `.next/dev/types` cache | **RESOLVED** |
| **HIGH-03** | High | Coexistence of obsolete v0 routes (`app/auth/*`, `app/dashboard/*`) and unused `@supabase/*` dependencies | **RESOLVED** *(Removed + Redirected)* |
| **MEDIUM-01** | Medium | `typescript.ignoreBuildErrors: true` in `next.config.mjs` suppressing build-time TypeScript validation | **RESOLVED** *(Strict validation restored)* |
| **MEDIUM-02** | Medium | `Secure` cookie flag hardcoded to `NODE_ENV === "production"` in `lib/server/session.ts`, breaking local HTTP `next start` sessions | **RESOLVED** *(HTTPS/Vercel detection)* |
| **MEDIUM-03** | Medium | Temporary `/tmp` + in-memory server storage on Vercel (`lib/server/db.ts`) and client-context `/p/[username]` rendering | **DOCUMENTED** *(Intentional design for university/portfolio demo)* |
| **LOW-01** | Low | `.gitignore` pattern narrowed from `data/` to `/data/` so `lib/data/{daily-quiz,interviews,jobs,scanner}.ts` are tracked by Git | **RESOLVED** |

---

## 4. Documented Intentional Limitations (Demo Mode)

As an academic and portfolio demonstration deployed on Vercel without an external cloud database:
1. **Ephemeral Server Storage on Vercel:** Server-side files written to `/tmp/pathforge-data/pathforge-db.json` and in-memory cache (`memoryCache`) in `lib/server/db.ts` are not permanent across Vercel serverless cold starts or separate container instances.
2. **Session & Account Lifespan:** Newly registered accounts and `pathforge_session` cookies may become invalid if a serverless container recycles. However, client-side `localStorage` fallback in `lib/store.tsx` preserves user progress within the same browser, and the 1-Click Demo Account (`demo@pathforge.id` / `demo1234`) is automatically re-seeded on every cold start.
3. **Disposable Credentials Only:** Users and evaluators testing the live Vercel deployment should use the **1-Click Demo Account** or disposable test credentials.
