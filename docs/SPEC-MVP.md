# MVP Specification

> **Status:** DRAFT. To be confirmed at the Phase 1 workshop. Data model: [DATA-MODEL.md](DATA-MODEL.md).

## Scope

**In the MVP**
- Accounts, each with its own currency
- Category tree (highly customisable)
- Dimensions (e.g. *Necessity: Need / Want / Savings / Investment*) with default values per category
- Manual entry of income and expense transactions
- Transfers between accounts, including currency exchange
- Monthly overview per currency, by category tree and by dimension
- Automatic local backups

**Not in the MVP** (backlog, see [ROADMAP](ROADMAP.md#phase-4-after-the-mvp))
Charts, tags, bank CSV import, conversion to a base currency, recurring payments, savings goals, split transactions,
budgets, login, sync between devices, mobile.

## General rules

- A month is a calendar month (from the 1st to the last day).
- Amounts are entered and shown with the precision of their currency (2 decimal places for CZK and EUR) and are never stored as floats.
- Nothing that transactions refer to is ever hard-deleted. Accounts, categories and dimension values are **archived** instead:
  they no longer appear in pickers, but they still show up in history and reports.
- The UI language is English (it can be changed later).

## User stories

### Accounts
- **A1:** As a user I want to create an account (name, currency) so that I can track cash, a current account, savings and an EUR account separately.
  - Currency is chosen from a list of ISO 4217 codes; the default is CZK.
  - Currency cannot be changed once the account has transactions.
- **A2:** As a user I want to see all accounts with their current balance.
- **A3:** As a user I want to archive an account I no longer use.

### Categories
- **C1:** As a user I want to build my own category tree (e.g. *Food → Groceries, Restaurants*) with any depth.
  - A category is either *income* or *expense*. Its children inherit this kind.
  - Categories can be added, renamed, recoloured, reordered and moved under another parent (moving a category under its own descendant is not allowed).
- **C2:** As a user I want to archive a category without losing history.
- **C3:** As a user I want a sensible default tree on first start that I can change freely.

### Dimensions
- **D1:** As a user I want to define my own dimensions (e.g. *Necessity*) with values (*Need, Want, Savings, Investment*).
- **D2:** As a user I want to set a default dimension value on a category so that its transactions are classified automatically.
  - Subcategories inherit the default from the nearest ancestor unless they set their own.
- **D3:** As a user I want to override the dimension value on a single transaction (e.g. food that is a *Want* this time).

### Transactions
- **T1:** As a user I want to enter an income or expense quickly: account, amount, date (default today), category, optional note, optional dimension overrides.
  - The form validates: amount > 0, account and category are required, category kind matches the transaction kind.
  - After saving, the form can stay open for the next entry ("save and add another").
- **T2:** As a user I want to see the transactions of a selected month, newest first, and filter them by account and category (including subcategories).
- **T3:** As a user I want to edit and delete a transaction.

### Transfers
- **X1:** As a user I want to record a transfer between two of my accounts (e.g. withdraw cash).
- **X2:** As a user I want to record a currency exchange: I enter the amount that left one account and the amount that arrived in the other. The app shows the implied rate.
- Transfers are **not** income or expense, so they do not appear in the income/expense totals.

### Monthly overview
- **O1:** As a user I want to see total income, total expenses and the balance for a month, **separately for each currency**.
- **O2:** As a user I want expenses grouped by the category tree, with totals rolled up to parents and expandable rows.
- **O3:** As a user I want expenses grouped by each dimension (e.g. how much was *Need* vs. *Want*).
- **O4:** As a user I want to move between months easily (previous / next / pick a month).

### Data safety
- **S1:** As a user I want my data saved immediately and kept across restarts.
- **S2:** As a user I want automatic backups to a folder I choose, and a documented way to restore them.

## Open questions

To be decided at the workshop:
1. What should the **default category tree** and **default dimensions** be?
2. Can a transaction use a **non-leaf** category (e.g. just *Food*)? *(Proposal: yes.)*
3. **Refunds:** record them as a negative expense in the same category, or as income? *(Proposal: an expense with a "refund" flag, which reduces the category total.)*
4. **Exchange fees:** keep them inside the implied rate, or record them as a separate expense? *(Proposal: inside the rate for the MVP.)*
5. **Opening balance** of an account: a field on the account, or a special first transaction?
6. What should be on the **home screen**: the monthly overview, or the transaction list with a quick-add form?
7. Do we want more than one dimension in the MVP, or is *Necessity* enough to start with?
