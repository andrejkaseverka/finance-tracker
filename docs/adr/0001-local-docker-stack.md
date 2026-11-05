# 0001. Local Docker stack: Angular + FastAPI + PostgreSQL

- **Status:** Accepted
- **Date:** 2026-11-05

## Context

- Both of us use the app on our own Windows PCs, each with our own data. Mobile is not needed for now.
- No paid server. The app may go unused for **months** between sessions, and the data must still be there.
- Data must be saved immediately and kept across browser and PC restarts. We don't want to restore backups by hand.
- Learning goals: Angular (frontend, hands-on with real-world patterns), plus web basics for a Python developer (HTTP, REST, SQL, HTML/CSS).
- The category model (tree + dimensions, see [ADR 0002](0002-category-model.md)) is relational by nature.

## Options

1. **Angular PWA + IndexedDB in the browser** (static hosting, e.g. GitHub Pages)
   - ➕ No server, works offline, simplest to run.
   - ➖ Data lives in one browser profile and is lost if site data is cleared. Queries over trees and reports are awkward.
     There is no backend to learn from, and no HttpClient/REST practice on the Angular side.
2. **Supabase (free tier)**: hosted Postgres + auth
   - ➕ Sync across devices, real Postgres.
   - ➖ Free projects are **paused after ~1 week of inactivity** and may not be restorable after a long pause. That doesn't fit occasional use. It also depends on a third party.
3. **Google Drive as storage** (a file in the user's Drive via the Drive API)
   - ➕ Data stays in the user's own cloud.
   - ➖ OAuth setup in Google Cloud, write conflicts between devices, a lot of plumbing with little learning value.
4. **Own backend on free cloud hosting**
   - ➖ Free tiers sleep, change their terms or disappear, and we would need auth and secure hosting of financial data.
5. **Local Docker Compose: Angular + FastAPI + PostgreSQL** ✅
   - ➕ Free, private (bound to `127.0.0.1`), data is safe on our own disk, and every change is persisted immediately.
   - ➕ A real REST API: HttpClient, interceptors and forms for the Angular side; Python, HTTP and SQL for the sister.
   - ➕ PostgreSQL handles the tree (recursive CTE) and the link tables naturally. Andrea already knows Postgres.
   - ➖ Needs Docker Desktop + WSL2. Data lives on one PC (no sync). A careless `docker compose down -v` deletes data.

Backend language: **Python (FastAPI)** rather than .NET, so the sister builds on a language she already knows while
Andrea focuses on Angular.

## Decision

Option 5. Angular frontend served by nginx, FastAPI backend (SQLAlchemy 2.x, Alembic, Pydantic, pytest, uv),
and PostgreSQL in a named Docker volume, all orchestrated with Docker Compose on each PC.

## Consequences

- All ports are bound to `127.0.0.1`. No authentication in the MVP (one user per PC).
- Backups: `pg_dump` script scheduled with Windows Task Scheduler into a folder of the user's choice (e.g. OneDrive).
  The README warns about `docker compose down -v`.
- The frontend talks only to the REST API, so swapping storage later (e.g. sync to the cloud) affects only the backend.
- If sync or mobile access becomes a goal, write a new ADR. Candidates to evaluate then: Firebase Firestore
  (free tier without inactivity pausing), Google Drive appDataFolder. Check the free-tier terms again at that time.
