# 0002. Category model: tree + dimensions + tags

- **Status:** Proposed (confirm at the Phase 1 workshop)
- **Date:** 2026-11-05

## Context

We want highly customisable classification of transactions:

- Hierarchy from general to specific, e.g. _Food → Restaurants_, shown in charts as a drill-down (sunburst/treemap).
- A different kind of grouping such as _Need / Want / Savings / Investment_. This does not follow the tree:
  _Food_ can be a Need or a Want.
- Ad-hoc labels such as _Vacation 2026_ that cut across everything.
- Totals in reports must add up, so no amount may be counted twice.

## Options

1. **Many-to-many transaction ↔ category** (a transaction can be in _Food_ and _Restaurants_ and _Want_)
   - ➕ Maximally flexible.
   - ➖ No structure. Summing by category counts amounts several times, charts don't add up, and the UI has to keep categories consistent by hand.
2. **Tree + dimensions + tags** ✅
   - **Category tree:** each transaction points to exactly **one** node. Its ancestors are implied, so
     totals roll up correctly and form a proper hierarchy for charts.
   - **Dimensions:** user-defined, independent classifications (e.g. _Necessity_), each with its own values.
     A transaction has at most one value per dimension. Categories carry **default** values (inherited down
     the tree), and single transactions can **override** them.
   - **Tags (later):** free many-to-many labels for filtering. They are not used for totals that must add up.
   - ➕ Every view adds up (the tree, and each dimension separately). It is flexible without being chaotic.
   - ➖ More concepts to explain in the UI, and somewhat more complex queries (recursive CTE, default resolution).

## Decision

Option 2. Details: [DATA-MODEL.md](../DATA-MODEL.md).

## Consequences

- Reports can be computed per tree level or per dimension, and each one sums to the same grand total.
- Changing a category's default dimension value affects all transactions that don't override it,
  because the effective value is computed and not copied. This is intended.
- Tags are added after the MVP without changing the existing tables.
