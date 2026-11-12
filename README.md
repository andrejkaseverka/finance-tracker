# Finance Tracker

A personal finance tracker that runs locally on your own Windows PC. You enter income, expenses and transfers
between accounts (including currency exchange), organise them in a category tree with custom dimensions
(for example _Need / Want / Savings / Investment_), and see a monthly overview.

The project is also a learning project:

- one of us is learning web development from the ground up (Python background),
- the other is learning Angular (full-stack background).

> **Status:** planning. No application code yet. See [docs/ROADMAP.md](docs/ROADMAP.md).

## Tech stack

| Layer    | Technology                                                                     |
| -------- | ------------------------------------------------------------------------------ |
| Frontend | Angular (current stable), standalone components, signals, typed reactive forms |
| Backend  | Python, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic, pytest, `uv`               |
| Database | PostgreSQL                                                                     |
| Runtime  | Docker Compose on a local PC (Docker Desktop + WSL2 on Windows)                |

Why this stack: [ADR 0001](docs/adr/0001-local-docker-stack.md).

## How it will run (from Phase 2)

**Use mode:** start everything in Docker and open the app in the browser.

```powershell
docker compose up -d
# open http://localhost:8080
```

**Dev mode:** the database runs in Docker, while the backend and frontend run locally with auto-reload.

```powershell
docker compose up -d db
cd backend;  uv run fastapi dev          # API on http://localhost:8000, docs on /docs
cd frontend; npm start                   # ng serve on http://localhost:4200, proxies /api
```

### Your data

- Data is stored in PostgreSQL in a Docker volume on your disk. Every change is saved immediately, so closing
  the browser or restarting the PC loses nothing.
- All ports are bound to `127.0.0.1`, so the app is reachable only from your own PC.
- **Warning:** `docker compose down -v` deletes the volume, **and all your data with it**. Use `docker compose down` (without `-v`).
- **Backups:** `scripts/backup.ps1` runs `pg_dump` into a folder of your choice (e.g. a OneDrive folder).
  Schedule it with Windows Task Scheduler. `scripts/restore.ps1` restores a backup. (Both come in Phase 2.)

## Documentation

| Document                         | What it covers                                     |
| -------------------------------- | -------------------------------------------------- |
| [ROADMAP](docs/ROADMAP.md)       | Phases, milestones, timeline                       |
| [SPEC-MVP](docs/SPEC-MVP.md)     | User stories and acceptance criteria for the MVP   |
| [DATA-MODEL](docs/DATA-MODEL.md) | Entities, ER diagram, category and dimension rules |
| [LEARNING](docs/LEARNING.md)     | Learning paths and learning notes                  |
| [WORKFLOW](docs/WORKFLOW.md)     | Git/GitHub workflow, PR rules, Definition of Done  |
| [ADRs](docs/adr/README.md)       | Architecture decision records                      |
