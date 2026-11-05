# Workflow

## Issues

- GitHub Issues are the backlog. One issue = **one small thing**, ideally doable in one evening.
- Each issue has a goal, acceptance criteria and labels (`frontend` / `backend` / `infra` / `docs`, plus `good first issue` / `learning` where they fit).
- Each feature has a backend issue and a frontend issue. The **API contract** (endpoint, request and response JSON) is agreed in the backend issue before the work starts.
- Use the issue template: [.github/ISSUE_TEMPLATE/task.md](../.github/ISSUE_TEMPLATE/task.md).

## Branches & commits

- `main` is always runnable. It is protected, so changes go in only through pull requests.
- Branch names: `feat/<issue>-short-name`, `fix/<issue>-short-name`, `docs/<issue>-short-name`
  (e.g. `feat/12-account-list`).
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
  `feat: add account list page`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`, `refactor: ...`.
- Keep commits small and focused.

## Pull requests

- Use the PR template. Link the issue (`Closes #12`).
- CI (lint + tests) has to be green.
- At least **one review** from the other person:
  - Andrea reviews the sister's PRs and **explains** the suggestions (why, not just what).
  - The sister reads and comments on Andrea's PRs. Questions are welcome comments too.
- Prefer *squash merge*, so `main` keeps one commit per issue.

## Definition of Done

- [ ] Acceptance criteria are met.
- [ ] Tests are added or updated and pass locally and in CI.
- [ ] A DB migration is included if the schema changed.
- [ ] It works through `docker compose up` (not only in dev mode).
- [ ] Docs are updated (README, SPEC, DATA-MODEL, ADR) if behaviour or decisions changed.

## Rhythm

- **Weekly 30-minute sync:** what's done, what's next, what's unclear; pick the issues for the coming week.
- When a bigger decision comes up, write a short ADR ([docs/adr](adr/README.md)).
