# Roadmap

## Goals

1. **Product:** a local finance tracker we both actually use.
2. **Learning (web basics):** learn web development properly, starting from Python and moving to HTTP, SQL, HTML/CSS,
   TypeScript and Angular.
3. **Learning (Angular):** get hands-on Angular experience, covering the core concepts **within ~4 weeks**.

## Roles

| Period | Frontend (Angular) + infrastructure | Backend (Python) |
|---|---|---|
| Phases 0–3 (MVP) | Andrea | Sister (with Andrea's help) |
| Phase 4+ | Sister | Andrea |

Small HTML/CSS tasks (layout, styling) go to the sister during the MVP, so she starts learning the frontend early.

## Timeline overview

| Week | Phase | Milestone |
|---|---|---|
| 1 | 0: Setup, 1: Specification workshop | Final `SPEC-MVP.md` and `DATA-MODEL.md`, backlog of issues |
| 2 | 2: Walking skeleton | Accounts work end to end (UI → API → DB) in Docker on both PCs |
| 3–6 | 3: MVP features | **MVP v1.0**, which we both use |
| 7+ | 4+: Post-MVP | One mini-spec per feature |

By week 4 the Angular side should have covered components, forms, routing, HttpClient and signals.

---

## Phase 0: Setup (week 1)

- [ ] Create a GitHub repository, add the remote, invite the sister as a collaborator.
- [ ] Protect `main`: merges only through pull requests, CI has to pass (once it exists).
- [ ] Labels: `good first issue`, `learning`, `frontend`, `backend`, `infra`, `docs`, `bug`.
- [ ] Set up the environment on both PCs:
  - Git, Docker Desktop + WSL2
  - Node LTS + Angular CLI (`npm i -g @angular/cli`)
  - Python 3.12+ and [`uv`](https://docs.astral.sh/uv/)
  - VS Code extensions: Angular Language Service, Python, Ruff, ESLint, Prettier, Docker
- [ ] Sister: finish the HTML course and learn Git basics. **First PR:** a small README improvement.

## Phase 1: Specification workshop (week 1)

1. **Separately (20–30 min each):** write down your ideas. What do you want to enter, what do you want to see,
   how often will you use the app, what annoys you about other tools?
2. **Together:** merge the ideas into user stories (*"As a user I want … so that …"*) and give each one a MoSCoW
   priority (Must / Should / Could / Won't for now).
3. **Data model:** walk through [DATA-MODEL.md](DATA-MODEL.md), especially categories and dimensions, using
   *real* examples of your own expenses (a restaurant on holiday, a currency exchange, a refund…).
4. **Wireframes** (paper or [Excalidraw](https://excalidraw.com)): transaction list, transaction form,
   category management, monthly overview.
5. **Decide the open questions** listed in [SPEC-MVP.md](SPEC-MVP.md#open-questions). Update both documents.
   Everything outside the MVP becomes a GitHub issue in the backlog.

**Output:** final `SPEC-MVP.md` + `DATA-MODEL.md`, wireframes in `docs/wireframes/`, issues for Phases 2–3.

## Phase 2: Walking skeleton (week 2)

Goal: a single entity (**Account**) goes all the way through UI → API → DB, running in Docker.

Frontend + infrastructure:
- [ ] `docker-compose.yml`: `db` (Postgres, named volume), `api` (FastAPI), `web` (nginx serves the Angular build and proxies `/api` to `api`), all ports bound to `127.0.0.1`.
- [ ] `.env.example`, `.gitignore`.
- [ ] Angular project in `frontend/` (routing, SCSS, ESLint, Prettier), dev proxy to the API.
- [ ] `AccountsService` built on HttpClient, plus account list and form pages.

Backend:
- [ ] FastAPI project in `backend/` (uv, Ruff, pytest).
- [ ] DB connection, SQLAlchemy models, the first Alembic migration (`account`).
- [ ] CRUD endpoints `/api/accounts`, with tests running against a test database.

Shared:
- [ ] GitHub Actions: lint and tests for frontend and backend on every PR.
- [ ] `scripts/backup.ps1` + `scripts/restore.ps1`, plus README instructions for Task Scheduler.

**Done when:** `docker compose up` works on both PCs, and an account created in the UI survives a container restart and a PC restart.

## Phase 3: MVP features (weeks 3–6)

Each feature is split into a **backend issue** and a **frontend issue**. The API contract is agreed in the issue first.

1. **Accounts & currencies:** name, currency, archive, balance.
2. **Category tree:** create, rename, move within the tree, archive (instead of delete).
3. **Dimensions:** dimensions and their values, a default value per category (inherited down the tree).
4. **Transactions:** create, edit, delete; a form with a category tree picker and dimension overrides.
5. **Transfers & currency exchange** between accounts.
6. **Monthly overview:** income, expenses and balance per currency; totals by category tree (expandable) and by dimension (tables).
7. **Layout & styling** (sister, HTML/CSS): navigation, page layout, consistent form styles.

**Milestone: MVP v1.0.** Tag `v1.0.0`; we both use it for real.

## Phase 4+: After the MVP

The order will be confirmed at the workshop. Each item gets a short mini-spec (in `docs/specs/`) and its own issues. Roles switch.

1. **Charts:** sunburst/treemap by category tree, pie by dimension, trends over time (ECharts or Chart.js).
2. **Tags** (e.g. *Vacation 2026*) and filtering.
3. **Bank CSV import:** per-bank column mapping, imported transactions in `pending_review` state, a review screen,
   bulk category assignment, auto-categorisation rules, duplicate detection.
   *(The sister can explore bank statement formats in Python/Jupyter first.)*
4. **Base-currency reporting:** an exchange rate table (manual or from the Czech National Bank), totals in CZK.
5. **Recurring payments and savings goals.**
6. **Split transactions:** one payment split across several categories.
7. **Budgets and limits** (lowest priority).
8. *Maybe:* sync between devices or mobile access, which needs a new ADR (see [ADR 0001](adr/0001-local-docker-stack.md)).
