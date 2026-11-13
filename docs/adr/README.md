# Architecture Decision Records

An ADR is a short note about one important decision: what we decided, why, and what alternatives we considered.
ADRs are never rewritten. If a decision changes, write a new ADR that _supersedes_ the old one.

| #                                    | Title                                              | Status   |
| ------------------------------------ | -------------------------------------------------- | -------- |
| [0001](0001-local-docker-stack.md)   | Local Docker stack: Angular + FastAPI + PostgreSQL | Accepted |
| [0002](0002-category-model.md)       | Category model: tree + dimensions + tags           | Proposed |
| [0003](0003-no-accounts-czk-only.md) | No accounts and CZK only (for now)                 | Proposed |

## Template

Copy into `NNNN-short-title.md`:

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context

What problem are we solving? What constraints do we have?

## Options

1. Option A: pros / cons
2. Option B: pros / cons

## Decision

What we chose.

## Consequences

What becomes easier, what becomes harder, what we must watch out for.
```
