# PATHFORGE — QA & REGRESSION TEST RESULTS

**Date:** 2026-11-10 (Final Post-Cleanup Verification)  
**Environment:** Windows 10/11, Node.js v22, pnpm 10.28.0, Next.js 16.2.6 Production Server (`next build` + `next start`)  

---

## 1. Build, Lockfile & TypeScript Validation

| Validation Step | Command Executed | Result | Evidence / Output |
| :--- | :--- | :---: | :--- |
| **Dependency Lockfile Check** | `npx --yes pnpm@10.28.0 install --frozen-lockfile` | **PASS** | `Lockfile is up to date, resolution step is skipped. Already up to date.` (Exit code `0`) |
| **Next.js Route Type Generation** | `npx --yes pnpm@10.28.0 exec next typegen` | **PASS** | `Generating route types... ✓ Types generated successfully` (Exit code `0`) |
| **Standalone Non-Incremental TypeScript Check** | `npx --yes pnpm@10.28.0 exec tsc --noEmit --incremental false` | **PASS** | Zero errors across all source files and `.next/types/validator.ts` (Exit code `0`) |
| **Production Build (Strict TypeScript Enabled)** | `npx --yes pnpm@10.28.0 run build` | **PASS** | `✓ Compiled successfully in 27.6s`, `Finished TypeScript in 29.6s`, `✓ Generating static pages using 11 workers (26/26) in 2.2s` (Exit code `0`) |

---

## 2. Live API & Authentication Regression Results (16/16 PASS)

Executed against a live production server (`next start -p 3125`) via automated HTTP integration script.

| Test ID | Feature / Scenario | Endpoint / Method | Expected Behavior | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **AUTH-01** | Unauthenticated Session Check | `GET /api/auth/me` | Returns `200 OK` with `{ authenticated: false, user: null, data: null }` | Returned `200 OK`, `authenticated: false` | **PASS** |
| **AUTH-02** | Unauthorized User Data Access Prevention | `GET /api/user/data` (no cookie) | Returns `401 Unauthorized` | Returned `401 Unauthorized` | **PASS** |
| **AUTH-03** | Unauthorized Account Mutation Prevention | `PATCH /api/auth/account` (no cookie) | Returns `401 Unauthorized` | Returned `401 Unauthorized` | **PASS** |
| **AUTH-04** | User Registration & Password Hashing | `POST /api/auth/register` | Returns `201 Created`, hashes password with `scrypt`, sets `HttpOnly` `pathforge_session` cookie | Returned `201 Created` + `Set-Cookie: pathforge_session=...; Path=/; HttpOnly; SameSite=Lax` | **PASS** |
| **AUTH-05** | Duplicate Email Prevention | `POST /api/auth/register` | Returns `409 Conflict` when registering an existing email | Returned `409 Conflict` | **PASS** |
| **AUTH-06** | Session Persistence Across Requests | `GET /api/auth/me` (with cookie) | Returns `200 OK` with `authenticated: true` and matching `user` + `data` | Returned `200 OK`, `user.email === "qa.engineer@pathforge.id"` | **PASS** |
| **AUTH-07** | User Progress Synchronization | `PUT /api/user/data` | Persists `onboarded`, `activeCareer`, `completedModules`, and `moduleNotes` in DB | Returned `200 OK` with updated `UserData` fields verified | **PASS** |
| **AUTH-08** | Account Name & Email Update | `PATCH /api/auth/account` (`type: "profile"`) | Updates user profile name in DB and returns updated `PublicUser` | Returned `200 OK`, `user.name === "QA Engineer Senior"` | **PASS** |
| **AUTH-09** | Password Change — Wrong Current Password | `PATCH /api/auth/account` (`type: "password"`) | Rejects wrong `currentPassword` with `400 Bad Request` | Returned `400 Bad Request` | **PASS** |
| **AUTH-10** | Password Change — Valid Current Password | `PATCH /api/auth/account` (`type: "password"`) | Verifies `scrypt` hash and updates password hash in DB | Returned `200 OK` | **PASS** |
| **AUTH-11** | Forgot Password — OTP Generation | `POST /api/auth/forgot-password` (`action: "request"`) | Generates 6-digit OTP valid for 15 minutes in DB | Returned `200 OK` with 6-digit `devOtpCode` | **PASS** |
| **AUTH-12** | Forgot Password — OTP Verification & Reset | `POST /api/auth/forgot-password` (`action: "reset"`) | Verifies OTP, marks OTP as used, updates `passwordHash` | Returned `200 OK` | **PASS** |
| **AUTH-13** | Login with Newly Reset Password | `POST /api/auth/login` | Authenticates with new password, issues new cookie, restores isolated `UserData` | Returned `200 OK`, `activeCareer === "data-analyst"` | **PASS** |
| **AUTH-14** | 1-Click Demo Login & Data Isolation | `POST /api/auth/demo` | Seeds `demo@pathforge.id` with `web-developer` data, isolated from QA user | Returned `200 OK`, `user.email === "demo@pathforge.id"`, `completedModules.length === 6` | **PASS** |
| **AUTH-15** | Logout & Session Revocation | `POST /api/auth/logout` | Removes session from server DB and clears cookie; subsequent `/api/auth/me` is `false` | Returned `200 OK`; subsequent `GET /api/auth/me` returned `authenticated: false` | **PASS** |
| **AUTH-16** | Account Deletion | `DELETE /api/auth/account` | Deletes user, all sessions, and `userData` from DB | Returned `200 OK` | **PASS** |

---

## 3. Main Application Routes & Legacy Redirects (29/29 PASS)

| Category | Route / Test Case | HTTP Result (`next start`) | Verification Details | Status |
| :--- | :--- | :---: | :--- | :---: |
| **Landing Page** | `GET /` | `200 OK` | Navbar, ThemeToggle, Hero, Features, Careers, CTA, Footer render cleanly; all CTAs point to `/register` & `/login`. | **PASS** |
| **Auth Pages** | `GET /login`, `GET /register` | `200 OK` | Custom auth pages, Demo Login button, and Forgot Password OTP modal. | **PASS** |
| **Onboarding / Career GPS** | `GET /onboarding` | `200 OK` | 8-question Career GPS quiz & career match calculator. | **PASS** |
| **Dashboard** | `GET /dashboard` | `200 OK` | Readiness score ring, Starter Quests, Daily Challenge banner, quick tools. | **PASS** |
| **Careers & Comparison** | `GET /careers`, `GET /careers/web-developer`, `GET /careers/compare` | `200 OK` | 6 career paths, detail view, and side-by-side comparison table. | **PASS** |
| **Roadmap & Notes** | `GET /roadmap` | `200 OK` | 3-phase checklist, Smart Study Planner, Personal Study Notes, Certificate modal. | **PASS** |
| **Work Simulator** | `GET /simulator`, `GET /simulator/sim-wd-landing` | `200 OK` | 12 Indonesian company scenarios, rubric scoring, Mentor Benchmark. | **PASS** |
| **Portfolio & Public CV** | `GET /portfolio`, `GET /p/raka-pratama` | `200 OK` | Featured project pinning, profile editor, printable CV view. | **PASS** |
| **Jobs, Interview, Scanner** | `GET /jobs`, `GET /interview`, `GET /scanner` | `200 OK` | 12 job listings, STAR interview timer, CV keyword skill scanner. | **PASS** |
| **Calculator, Progress, Settings** | `GET /calculator`, `GET /progress`, `GET /settings` | `200 OK` | Indonesian THP & tax calculator, XP/badges analytics, account & password settings. | **PASS** |
| **Legacy Auth Redirects** | `/auth/login`, `/auth/register`, `/auth/forgot-password` | `307 Redirect` | Redirects to `/login`, `/register`, and `/login` respectively. | **PASS** |
| **Legacy Dashboard Redirects** | `/dashboard/{career-gps,roadmap,simulator,portfolio,profile,settings}` | `307 Redirect` | Redirects to `/careers`, `/roadmap`, `/simulator`, `/portfolio`, `/settings`, `/settings`. | **PASS** |
| **Obsolete Callback Removal** | `GET /auth/callback` | `404 Not Found` | Confirmed legacy Supabase callback endpoint is no longer exposed. | **PASS** |
| **Headless Browser DOM Click E2E** | Playwright / Cypress | N/A | Verified via static AST/type check + 45 live HTTP assertions against `next start`. | **NOT TESTED** |
