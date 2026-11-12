# 0003. No accounts and CZK only (for now)

- **Status:** Proposed (confirm at the Phase 1 workshop)
- **Date:** 2026-11-12

## Context

The app tracks income and expenses, not bank balances.

- Balances per account would drift from reality (rounding, interest, money "hanging" on Revolut in several currencies).
- Entering every bank movement (transfers, exchanges, Revolut statements) is an extra chore.
- Foreign currencies need a rate model, and that is hard to get right (income that stays in a foreign currency, rates that change).
- We want to reach a usable MVP quickly.

## Options

1. **Accounts with balances and transfers**
   - ➕ A picture of where the money is. Reconciliation with a real balance could be added as a correction entry.
   - ➖ More entities and more entries per purchase. Hard with currency exchange.
2. **No accounts, CZK only** ✅
   - ➕ Simplest model and the fastest entry.
   - ➖ No balances. Foreign spending has to be entered in CZK.
3. **No accounts, multi-currency with dated exchange rates**
   - ➕ Foreign amounts stay in their currency, reports are in CZK.
   - ➖ A rate table to maintain, and a long list of edge cases. Postponed, not rejected.

## Decision

Option 2 for the MVP.

- There is no `account` entity, no transfers, and no balances. Money moved to Revolut is entered as the purchase it was used for.
- All amounts are in CZK. The `currency` column is added later with the default `CZK`.
- The balance in reports means _income − expenses_ for a period.

## Consequences

- Smaller model, and the walking skeleton starts with **Category** instead of Account.
- When currencies come back, the preferred model is the one from option 3: amounts in their own currency, rates with a _valid from_ date entered by hand.
- When accounts come back, the sister's idea is a good start: enter the real balance and let the app add an uncategorised correction for the difference.
