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

## Formatting (Prettier)

All Markdown, JSON and (later) frontend files are formatted by [Prettier](https://prettier.io/). The Prettier and Node versions are pinned in the repo, so everyone gets identical results.

One-time setup after cloning:

1. Install Node **24.22.2** (see [.nvmrc](../.nvmrc)), e.g. with [nvm-windows](https://github.com/coreybutler/nvm-windows) or [fnm](https://github.com/Schniz/fnm).
2. Run `npm ci` in the repo root. It installs the pinned Prettier. With another Node version it fails on purpose.
3. Optional: run `git config blame.ignoreRevsFile .git-blame-ignore-revs`. Then `git blame` skips pure reformatting commits listed in [.git-blame-ignore-revs](../.git-blame-ignore-revs) and shows who really wrote each line. GitHub does this automatically. The setting is per clone, so each person sets it once, after the file exists in their working copy (after `git pull`).

Daily use:

- `npm run format` formats everything, `npm run format:check` only reports problems.
- Run `npm run format` before you commit. Line endings are always LF (see [.gitattributes](../.gitattributes)), regardless of Windows settings.
- A commit that only reformats code goes in its own commit, and its hash is added to `.git-blame-ignore-revs`.

How formatting is enforced (each layer catches what the previous one missed):

1. **Editor:** VS Code formats on save (see [.vscode/settings.json](../.vscode/settings.json)).
2. **Claude Code:** a hook ([.claude/settings.json](../.claude/settings.json)) formats every file the agent edits.
3. **Pre-commit:** `husky` + `lint-staged` format the staged files before each commit. It is installed by `npm ci`. If it ever reformats something you did not expect, check `git diff` and commit again.
4. **CI:** the **Prettier check** workflow must be green before a PR can be merged. This is the only layer that cannot be skipped.

## Pull requests

- Use the PR template. Link the issue (`Closes #12`).
- CI (lint + tests) has to be green.
- At least **one review** from the other person:
  - Andrea reviews the sister's PRs and **explains** the suggestions (why, not just what).
  - The sister reads and comments on Andrea's PRs. Questions are welcome comments too.
- Prefer _squash merge_, so `main` keeps one commit per issue.

## Definition of Done

- [ ] Acceptance criteria are met.
- [ ] Tests are added or updated and pass locally and in CI.
- [ ] A DB migration is included if the schema changed.
- [ ] It works through `docker compose up` (not only in dev mode).
- [ ] Docs are updated (README, SPEC, DATA-MODEL, ADR) if behaviour or decisions changed.

## Rhythm

- **Weekly 30-minute sync:** what's done, what's next, what's unclear; pick the issues for the coming week.
- When a bigger decision comes up, write a short ADR ([docs/adr](adr/README.md)).
