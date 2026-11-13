# Roadmap

## Goals

1. **Product:** a local finance tracker we both actually use.
2. **Learning (web basics):** learn web development properly, starting from Python and moving to HTTP, SQL, HTML/CSS,
   TypeScript and Angular.
3. **Learning (Angular):** get hands-on Angular experience, covering the core concepts **within ~4 weeks**.

## Roles

| Period           | Frontend (Angular) + infrastructure | Backend (Python)            |
| ---------------- | ----------------------------------- | --------------------------- |
| Phases 0–3 (MVP) | Andrea                              | Sister (with Andrea's help) |
| Phase 4+         | Sister                              | Andrea                      |

Small HTML/CSS tasks (layout, styling) go to the sister during the MVP, so she starts learning the frontend early.

## Timeline overview

| Week | Phase                               | Milestone                                                        |
| ---- | ----------------------------------- | ---------------------------------------------------------------- |
| 1    | 0: Setup, 1: Specification workshop | Final `SPEC-MVP.md` and `DATA-MODEL.md`, backlog of issues       |
| 2    | 2: Walking skeleton                 | Categories work end to end (UI → API → DB) in Docker on both PCs |
| 3–6  | 3: MVP features                     | **MVP v1.0**, which we both use                                  |
| 7+   | 4+: Post-MVP                        | One mini-spec per feature                                        |

By week 4 the Angular side should have covered components, forms, routing, HttpClient and signals.

---

## Phase 0: Setup (week 1)

- [x] Create a GitHub repository, add the remote, invite the sister as a collaborator.
- [x] Protect `main`: merges only through pull requests, CI has to pass (once it exists).
- [x] After the first run of the **Prettier check** workflow: make it a required status check on `main` and enable **Require branches to be up to date before merging** (Settings → Branches / Rules).
- [x] Labels: `good first issue`, `learning`, `frontend`, `backend`, `infra`, `docs`, `bug`.
- [x] Set up the environment on both PCs:
  - Git, Docker Desktop + WSL2
  - Node LTS 24.22.2+ + Angular CLI (`npm i -g @angular/cli`)
  - Python 3.12+ and [`uv`](https://docs.astral.sh/uv/)
  - VS Code extensions: Angular Language Service, Python, Ruff, ESLint, Prettier, Docker
- [ ] Sister: finish the HTML course and learn Git basics. **First PR:** a small README improvement.

## Phase 1: Specification workshop (week 1)

1. **Separately (20–30 min each):** write down your ideas. What do you want to enter, what do you want to see,
   how often will you use the app, what annoys you about other tools?
2. **Together:** merge the ideas into user stories (_"As a user I want … so that …"_) and give each one a MoSCoW
   priority (Must / Should / Could / Won't for now).
3. **Data model:** walk through [DATA-MODEL.md](DATA-MODEL.md), especially categories and dimensions, using
   _real_ examples of your own expenses (a restaurant on holiday, a currency exchange, a refund…).
4. **Wireframes** (paper or [Excalidraw](https://excalidraw.com)): transaction list, transaction form,
   category management, monthly overview.
5. **Decide the open questions** listed in [SPEC-MVP.md](SPEC-MVP.md#open-questions). Update both documents.
   Everything outside the MVP becomes a GitHub issue in the backlog.

**Output:** final `SPEC-MVP.md` + `DATA-MODEL.md`, wireframes in `docs/wireframes/`, issues for Phases 2–3.

## Phase 2: Walking skeleton (week 2)

Goal: a single entity (**Category**, flat list first, the tree comes in Phase 3) goes all the way through UI → API → DB, running in Docker.

Frontend + infrastructure:

- [ ] `docker-compose.yml`: `db` (Postgres, named volume), `api` (FastAPI), `web` (nginx serves the Angular build and proxies `/api` to `api`), all ports bound to `127.0.0.1`.
- [ ] `.env.example`, `.gitignore`.
- [ ] Angular project in `frontend/` (routing, SCSS, ESLint, Prettier), dev proxy to the API.
- [ ] `CategoriesService` built on HttpClient, plus category list and form pages.

Backend:

- [ ] FastAPI project in `backend/` (uv, Ruff, pytest).
- [ ] DB connection, SQLAlchemy models, the first Alembic migration (`category`).
- [ ] CRUD endpoints `/api/categories`, with tests running against a test database.

Shared:

- [ ] GitHub Actions: lint and tests for frontend and backend on every PR.
- [ ] `scripts/backup.ps1` + `scripts/restore.ps1`, plus README instructions for Task Scheduler.

**Done when:** `docker compose up` works on both PCs, and a category created in the UI survives a container restart and a PC restart.

## Phase 3: MVP features (weeks 3–6)

Each feature is split into a **backend issue** and a **frontend issue**. The API contract is agreed in the issue first.

1. **Category tree:** create, rename, move within the tree, insert an intermediate category, archive (instead of delete).
2. **Dimension _Necessity_** (Need / Want / Saving): a default value per category (inherited down the tree).
3. **Transactions:** create, edit, delete; entered per month with an optional day; a fast form with a category picker and a dimension override.
4. **Regular payment templates:** a template list and "copy into a month" with editable rows.
5. **Monthly overview:** income, expenses and balance; totals by category tree (expandable, with a detail level) and by dimension.
6. **Yearly overviews** (Should): per year, per month of a year, and the Need / Want / Saving ratio over time (tables).
7. **Layout & styling** (sister, HTML/CSS): navigation, page layout, consistent form styles.

**Milestone: MVP v1.0.** Tag `v1.0.0`; we both use it for real.

## Phase 4+: After the MVP

The order will be confirmed at the workshop. Each item gets a short mini-spec (in `docs/specs/`) and its own issues. Roles switch.

1. **Charts:** sunburst/treemap by category tree, pie by dimension, trends over time (ECharts or Chart.js).
2. **Tags** (e.g. _Vacation 2026_) and filtering.
3. **Bank CSV import:** per-bank column mapping, imported transactions in `pending_review` state, a review screen,
   bulk category assignment, auto-categorisation rules, duplicate detection.
   _(The sister can explore bank statement formats in Python/Jupyter first.)_
4. **Currencies:** amounts in their own currency, an exchange rate table with a _valid from_ date (manual first, later from the Czech National Bank), totals in CZK.
5. **Accounts and balances:** enter the real balance and add an uncategorised correction for the difference; transfers.
6. **Recurring payments and savings goals** (a target ratio of Need / Want / Saving).
7. **Split transactions:** one payment split across several categories or spread over several months; usage count and average cost per use.
8. **Purchase details** (purchase date, end of warranty, receipt), a satisfaction dimension, per-category listing with statistics.
9. **Budgets and limits** (lowest priority).
10. _Maybe:_ sync between devices or mobile access, which needs a new ADR (see [ADR 0001](adr/0001-local-docker-stack.md)).
