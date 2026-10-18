# AGENTS.md — PwanyStay Project Guidelines

## 1. Project Overview
PwanyStay is a coastal staycation and accommodation booking platform built on a decoupled, polyglot architecture:
- **Active Frontend (`/client`):** Next.js 15+ (App Router), React, TypeScript, and Tailwind CSS.
- **Active Backend (`/fastapi-engine`):** Python, FastAPI, SQLAlchemy/Pydantic v2, and PostgreSQL.
- **Payments Integration:** Safaricom M-Pesa Daraja API (STK Push initiation, callback webhooks, and transaction verification).

---

## 2. Important Project Directories & Legacy Exclusions

### Active Directories (ONLY work inside these unless instructed otherwise)
- `client/` — Active Next.js frontend application (`src/app`, `src/components`, `src/lib`).
- `fastapi-engine/` — Active FastAPI backend engine (`app/main.py`, `app/core`, `app/models`, `app/routers`, `app/services`).
- `.github/` — CI/CD workflow pipelines.

### Legacy / Deprecated Directories (DO NOT MODIFY OR SCAN)
- `old-client-vite/` — Deprecated legacy Vite frontend. Ignore completely.
- `old-server-express/` — Deprecated legacy Express backend. Ignore completely.
- `server/` — Legacy server directory. All active backend work happens in `fastapi-engine/`.

---

## 3. Commands for Running the Application & Testing Changes

### Frontend Commands (run inside `/client`)
- **Install dependencies:** `cd client && npm install`
- **Start development server:** `cd client && npm run dev`
- **Type-check (TypeScript):** `cd client && npx tsc --noEmit`
- **Lint code:** `cd client && npm run lint`
- **Production build check:** `cd client && npm run build`

### Backend Commands (run inside `/fastapi-engine`)
- **Activate virtual environment:** `cd fastapi-engine && source venv/bin/activate` (WSL/Linux) or `.\venv\Scripts\activate` (Windows)
- **Start FastAPI dev server:** `cd fastapi-engine && uvicorn app.main:app --reload --port 8000`
- **Run backend test suite:** `cd fastapi-engine && pytest`

---

## 4. Coding Conventions & Development Patterns

### Frontend (`/client`)
- **Server vs. Client Components:** Default to React Server Components (RSC) in `src/app/`. Only add `"use client"` at the top of components requiring browser interactivity.
- **Strict Typing:** Never use `any`. Define explicit TypeScript interfaces in `client/src/lib/` mirroring FastAPI Pydantic schemas.
- **API Calls:** Route all requests through centralized helpers in `client/src/lib/` using `process.env.NEXT_PUBLIC_API_URL`.

### Backend (`/fastapi-engine`)
- **Schema Validation:** Use strict Pydantic models for all request bodies and `response_model` declarations.
- **Idempotent M-Pesa Callbacks:** Always verify `CheckoutRequestID` and check if a payment is already marked `COMPLETED` or `FAILED` before mutating booking state.

---

## 5. Security Requirements & Do-Not-Modify Files
- **Secrets (STRICTLY OFF-LIMITS):** Never read, log, print, commit, or modify `.env` or `.env.local` files.
- **Protected Files:** Do not modify `old-*` directories, existing database migration versions (`alembic/versions/*`), or lockfiles without explicit approval.

---

## 6. Validation Checklist (Complete Before Finishing Any Task)
1. **Frontend:** Run `cd client && npx tsc --noEmit` and `npm run lint` to confirm zero errors.
2. **Backend:** Run `cd fastapi-engine && pytest` to ensure tests pass.
3. **Git Status Check:** Run `git status` to ensure no untracked debug files or edits inside deprecated folders were created.
