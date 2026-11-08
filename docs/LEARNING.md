# Learning Paths

Learn **just in time**: study a topic right before the issue that needs it, then use it straight away.
Each step below names the kind of issue where it is practised.

## Sister: from Python to the web

| #   | Topic                                                                       | Resources                                                                                                                                              | Practised in                      |
| --- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| 1   | Git + GitHub: commit, branch, pull request, review                          | [Pro Git book, ch. 1–3](https://git-scm.com/book/en/v2), GitHub Skills                                                                                 | First PR (README), Phase 0        |
| 2   | HTTP & REST: methods, status codes, JSON, URLs                              | [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                       | Phase 2 API design                |
| 3   | FastAPI + Pydantic                                                          | [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)                                                                                             | Accounts endpoints                |
| 4   | SQL & relational modelling: joins, constraints, recursive CTE               | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)                                                                           | Category tree, reports            |
| 5   | SQLAlchemy 2.x ORM + Alembic migrations                                     | [SQLAlchemy unified tutorial](https://docs.sqlalchemy.org/en/20/tutorial/), [Alembic tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html) | Every backend issue               |
| 6   | Testing with pytest                                                         | [pytest docs](https://docs.pytest.org/), FastAPI "Testing"                                                                                             | Every backend issue               |
| 7   | HTML (finish the course) → CSS: box model, flexbox, grid, responsive design | [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)                                                           | Layout & styling issues (Phase 3) |
| 8   | Docker basics: image, container, volume, compose                            | [Docker: Get started](https://docs.docker.com/get-started/)                                                                                            | Running the app, backups          |
| 9   | JavaScript → TypeScript from a Python perspective                           | [javascript.info](https://javascript.info/), [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)                                    | After the MVP                     |
| 10  | Angular                                                                     | [angular.dev tutorials](https://angular.dev/tutorials)                                                                                                 | Phase 4+ frontend issues          |

Tips:

- Read Andrea's frontend PRs even before you write Angular yourself. Reading code is learning too.
- Write your questions straight into the PR or issue. Nobody is expected to know everything.

## Andrea: Angular in practice (first ~4 weeks)

| Topic                                                                                | Where in the project                                  |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Standalone components, templates, new control flow (`@if`, `@for`, `@switch`)        | Every page                                            |
| `input()` / `output()` / `model()`, component communication                          | Account list, category tree                           |
| Signals: `signal`, `computed`, `effect`, `linkedSignal`; `resource` / `httpResource` | Monthly overview, filters                             |
| Dependency injection, `inject()`, providers, injection tokens                        | API services, config                                  |
| HttpClient, interceptors (errors, loading indicator), environments                   | Every service                                         |
| Typed reactive forms, custom validators, `FormArray` for dynamic fields              | Transaction form (dimension overrides), transfer form |
| Router: lazy loading, route params, resolvers, guards                                | Feature routes, month in the URL                      |
| RxJS essentials and interop with signals (`toSignal`, `toObservable`)                | Search/filter, HTTP                                   |
| Change detection: `OnPush`, zoneless                                                 | All components                                        |
| Recursive components, `@defer`                                                       | Category tree                                         |
| Testing components and services (`TestBed`, `HttpTestingController`)                 | Every frontend issue                                  |
| Angular CLI, builds, environments, nginx deployment                                  | Phase 2                                               |

## Learning notes

_Record what you used, where, and why. Real decisions are easier to remember and explain than tutorial examples._

| Date | Topic | What I did / learned | Link (PR/file) |
| ---- | ----- | -------------------- | -------------- |
|      |       |                      |                |
