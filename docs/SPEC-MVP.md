# MVP Specification

> **Status:** DRAFT. Merged from Andrea's and the sister's ideas (Phase 1, steps 1–2). To be confirmed at the workshop.
> Data model: [DATA-MODEL.md](DATA-MODEL.md).

## Scope

**In the MVP**

- Fast entry of income and expense transactions, entered per month (a day is optional)
- Two separate category trees, one for income and one for expenses (highly customisable, easy to restructure)
- One dimension, _Necessity_ (**Need / Want / Saving**), which every expense always has (a default per category, overridable per transaction)
- Templates for regular payments (rent, internet) that are copied into a month
- Monthly overview by category tree and by dimension
- Automatic local backups

**Should (if time allows in the MVP):** yearly and year-over-year overview, trend of the Need/Want/Saving ratio over time.

**Could (backlog, first after the MVP):** bank list import, extra details for purchases (purchase date, end of warranty).

**Won't for now** (see [ROADMAP](ROADMAP.md#phase-4-after-the-mvp))
Accounts and balances, currencies and exchange rates, transfers, target ratios, splitting or spreading an expense over time,
usage counts and average price per use, listing and statistics per category, regular vs. irregular split in overviews,
a happiness/satisfaction dimension, receipts as files, tags, charts, login, sync between devices, mobile.

## General rules

- **CZK only.** Currencies are added later, and amounts are stored so that a currency can be added without changing existing data ([ADR 0003](adr/0003-no-accounts-czk-only.md)).
- **No accounts and no balances.** The app tracks income and expenses only. Moving money between accounts is not entered.
  Money moved to Revolut is entered as the purchase it was used for.
- A transaction belongs to a **month**. The day is optional and often left empty.
- Amounts are entered and shown with 2 decimal places and are never stored as floats.
- Nothing that transactions refer to is ever hard-deleted. Categories and dimension values are **archived** instead:
  they no longer appear in pickers, but they still show up in history and reports.
- The UI language is Czech (other languages can be added later). The documentation and the code stay in English.
- **Income and expenses have two separate category trees.** A category belongs to exactly one of them and can never be moved to the other.
- **An expense can be negative** (a complaint, a refund). It reduces the total of its category and of its Necessity value. Income is always positive.

## User stories

Priority: **M** Must, **S** Should, **C** Could, **W** Won't for now. Source: **A** Andrea, **S** sister.

### Transactions and fast entry

- **T1 (M, A+S):** As a user I want to enter an income or expense quickly: amount, month, category, optional note.
  - The user picks a category from the income tree or the expense tree, and that decides whether it is an income or an expense.
  - The form validates: the category is required, an income amount is > 0, and an expense amount is ≠ 0 (negative means a refund).
  - Keyboard friendly: tab order, category search by typing.
  - The month defaults to the current one. After saving, the form stays open for the next entry and keeps the month. The amount and the note are cleared.
- **T2 (M, A+S):** As a user I want choosing an expense category to prefill its Necessity value, so that I only change the unusual ones.
- **T3 (M, S):** As a user I want to give a transaction an optional **day** next to the month. It is not required.
- **T4 (M, A+S):** As a user I want an optional **note** that can name the expense (e.g. _dentist_). There is one free text field.
- **T5 (M):** As a user I want to see the transactions of a selected month and to edit and delete them.

### Regular payments

- **R1 (M, A):** As a user I want a list of **templates** for regular payments (name, category, amount, note) that I can add, edit and archive.
- **R2 (M, A):** As a user I want a **"Copy regular payments into a month"** action: it shows all templates as editable rows (amount, note), I adjust them and save them as transactions in one step. This also handles expenses that are very similar but not equal from month to month.

### Categories

- **C1 (M, A+S):** As a user I want to build my own category trees (e.g. _Food → Groceries, Restaurants_) with any depth.
  - There are two trees with fixed roots, **Income** and **Expenses**. The roots cannot be renamed, moved or archived. Every other category sits somewhere under one of them and takes its kind from it.
  - Categories can be added, renamed, recoloured, reordered and moved under another parent in the same tree (moving a category under its own descendant is not allowed).
- **C2 (M):** As a user I want to archive a category without losing history.
- **C3 (M):** On first start the app contains only the two roots, **Income** and **Expenses**. I build everything else myself. There is no default tree.
- **C4 (M, A+S):** As a user I want to see the whole tree on one page and edit it directly (rename, move, add a child, archive).
- **C5 (M, A+S):** As a user I want to **insert an intermediate category** over existing ones. Example: there are _Pharmacy_, _Vitamins_ and _Medical services_, and I add _Health_ and move these three under it. Existing transactions stay with their categories.
- **C6 (C):** Moving a category by drag and drop.

### Dimension

- **D1 (M, A+S):** As a user I want the importance of an expense to be one dimension, _Necessity_, with the values **Need, Want, Saving**. It applies to expenses only, not to income.
- **D2 (M, A):** As a user I want every expense category to have a Necessity value, so that its transactions are classified automatically.
  - A subcategory takes the value of its parent unless I set its own. The **Expenses** root always has a value, so there is always a value to inherit.
  - The value cannot be cleared, only changed.
- **D3 (M, A):** As a user I want to override the value on a single transaction (e.g. food that is a _Want_ this time).
- **Necessity is required.** Every expense always has one of the three values, so there is no "unassigned" in any overview.
- The data model allows more dimensions. The MVP has only _Necessity_ (see open question 3).

### Overviews

- **O1 (M, A):** As a user I want to see total income, total expenses and the balance for a month.
- **O2 (M, A+S):** As a user I want expenses grouped by the category tree, with totals rolled up to parents, expandable rows, and a **detail level** setting (top level only, down to level N, or everything).
- **O3 (M, A+S):** As a user I want expenses grouped by the dimension (_Need_ vs. _Want_ vs. _Saving_), as an amount and as a share.
- **O4 (M):** As a user I want to move between months easily (previous / next / pick a month).
- **Y1 (S, A):** As a user I want a table with **one row per year** showing income, expenses and balance for every year in which something was recorded.
- **Y2 (S, A):** As a user I want to pick a year and see income, expenses and balance **per month**.
- **O5 (S, A):** As a user I want to see the **Need / Want / Saving ratio by month over a longer period** (e.g. the last 12 months), as a table of shares. There is no target ratio.

### Data safety

- **S1 (M):** As a user I want my data saved immediately and kept across restarts.
- **S2 (M):** As a user I want automatic backups to a folder I choose, and a documented way to restore them.

### Could and Won't for now

| Story                                                                                      | Priority | Source |
| ------------------------------------------------------------------------------------------ | -------- | ------ |
| Import of a bank list, once in a while, with review and category assignment                | C        | S      |
| Purchase details: name, purchase date, end of warranty                                     | C        | S      |
| Receipt stored as a file                                                                   | W        | S      |
| Accounts, balances, comparison with real balance and an automatic uncategorised correction | W        | S      |
| Currencies and exchange rates                                                              | W        | S      |
| Transfers between accounts                                                                 | W        | S      |
| Spreading a payment over several months; count of uses and average cost per use            | W        | S      |
| Listing and statistics per category                                                        | W        | S      |
| Happiness / satisfaction with a purchase                                                   | W        | S      |
| Target ratio of Need / Want / Saving                                                       | W        | A      |
| Regular vs. irregular split in overviews, warning about an old exchange rate               | W        | A      |

## Open questions

To be decided at the workshop:

1. Can a transaction use a **non-leaf** category (e.g. just _Food_)? _(Proposal: yes.)_
2. What should be on the **home screen**: the monthly overview, or the transaction list with a quick-add form?
3. Does the UI show only _Necessity_ in the MVP? _(Proposal: yes, the model supports more.)_
4. **Dimension ratio base:** is the share counted from total expenses (Need + Want + Saving = 100 %), or from income (like the 50/30/20 rule)? _(Proposal: show both.)_
5. How are **savings** entered: as expenses with the value _Saving_, so that they show in the ratio? _(Proposal: yes.)_
6. **Order within a month:** how are transactions without a day sorted? _(Proposal: by entry order, those with a day first.)_
7. Do the templates have a fixed amount, or only an estimate to be checked every month? _(Proposal: the amount is only a prefilled value.)_
8. **Bulk entry** after a long time: is the fast form (T1, T2) enough, or do we need an editable table of several rows? Depends on whether the bank import (Could) is built.
9. Which Necessity value does the **Expenses** root start with? _(Proposal: Need.)_

Decided at the workshop: no default category tree (only the two roots), refunds are negative expenses, the UI is in Czech.
