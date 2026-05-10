---
date: 2026-05-10
project: signaltrace.wiki
page: /riello-ups/Search
status: pre-commit review
---

# Riello UPS — Search Page UX Feedback

Feedback on two screenshots: (1) the empty-state Search page, (2) the answer state for the query *"backup for banks"*.

Live URLs:
- https://www.signaltrace.wiki/
- https://www.signaltrace.wiki/riello-ups/
- https://www.signaltrace.wiki/riello-ups/Search

---

## Empty-state Search page

### Should fix before commit

- [ ] **Remove `May 10, 2026 · 1 min read` metadata.** Blog-post chrome on a functional page. Search isn't dated content; the date will look stale tomorrow and "1 min read" is meaningless when the user is here to ask, not to read.
- [ ] **Rename `SEARCH` button → `Ask` (or use a magnifier icon).** The button text duplicates the page title. "Ask" reads as a verb, matches the prose ("Ask a question about…"), and reduces visual repetition.

### Nice-to-have

- [ ] **Strengthen demo question #2.** Current: *"Which UPS should I use in a hospital theatre?"* — fine but tests less of the RAG pipeline (no sizing math, no runtime). The brief's actual validation query was *"I need 5 kW backup for 30 minutes for medical equipment, what should I look at?"* — explicit kW + runtime + vertical. The longer form forces retrieval to combine `[[Medical]]` + sizing FAQ + Sentinel Dual SDU into one answer, which is a stronger demo.
- [ ] **Rotate in two more validation queries** to surface catalogue breadth:
  - *"Can I monitor my UPS over the network?"* — exercises NetMan 204 / PowerShield / SNMP cross-links
  - *"I have a small bank branch with point-of-sale terminals, what do I need?"* — exercises the Banking industry → product mapping
- [ ] **Orange `SUGGESTED DEMO QUESTIONS` label is the only orange element.** Either commit to it as a brand accent throughout the site or tone it to match the neutral palette — currently it reads as an isolated callout. (Note: the answer-state screenshot uses green/yellow/dark-green and works well; consider dropping the orange in favour of those.)

### Good as-is — don't change

- The intro sentence ("Ask a question about… **Answers cite the underlying notes**") is exactly right. The citation promise is the differentiator vs. a generic chatbot — keep it prominent.
- Click-to-prefill behaviour on suggested questions is the correct UX.
- Three suggestions is the right number — more would feel like a menu.

---

## Answer state — query: *"backup for banks"*

### Bugs to fix before commit

- [ ] **Citation numbering has a gap: `[1]` then `[3]`, no `[2]`.** Either a citation got filtered/hidden, or the numbering pulls from a global ordering that should be re-indexed per answer. Either way, gaps in citation chips look like a bug to anyone reading academic-style citations. They should always be sequential within an answer (1, 2, 3, …).
- [ ] **Verify all citation numbers map to a visible cited-note card.** Screenshot shows "Banking" and "UPS Load Shedding Strategy" cards, but the answer references `[3]`. The card for `[3]` may be below the fold — confirm it's present and that clicking the chip scrolls/anchors to it.
- [ ] **Verify citation chips are clickable hyperlinks.** "Answers cite the underlying notes" is the load-bearing promise on the empty state. The chips need to anchor-link to the corresponding card (or direct to the wiki note) — not just visual decoration.

### Worth fixing

- [ ] **`UPS Load Shedding Strategy` is a tangential cite for "backup for banks."** Load shedding is mentioned in the Banking note as a generic operating concern, not banking-specific. If retrieval keeps surfacing adjacent-topic notes, consider a relevance threshold or topic filter — otherwise narrow demo questions get diluted answers.
- [ ] **Answer flattens the strongest branch/back-office distinction.** The Banking note's actual operational point is *line-interactive at branch (ATM/PoS) + online double-conversion at back-office* — that's a recommendation a buyer can act on. The current answer says it implicitly ("Pure Line LI for entry-level... Sentinel Pro and Sentinel Rack for higher-criticality") but an explicit one-line *"use line-interactive at the branch, online double-conversion at the back-office"* would land harder. Worth checking whether the synthesis prompt can pull that out, or whether it's a chunking issue.
- [ ] **Drop the `Summary:` label prefix on cited-note cards.** The text under a "Banking" card title is obviously a summary. Removing the label saves a line and reduces label noise.
- [ ] **Make wiki note titles clickable.** "Banking" and "UPS Load Shedding Strategy" should be the primary click target — they're bigger than the `Read full note` link below them. Right now the only obvious click target is the smaller, lower-prominence affordance.

### Style nits (low priority)

- [ ] **`▸ READ FULL NOTE` all-caps with play-triangle is heavy.** Lighter `Read full note →` would match the tone of the prose better. Same information, less shouting.

### Good as-is — don't change

- Answer prose is correctly grounded — branch vs back-office split, named products (Pure Line LI / Sentinel Pro / Sentinel Rack) match the vault exactly. Synthesis quality is the hard part of RAG and this is hitting.
- `WIKI NOTE` pill in mustard yellow distinguishes source type clearly without being loud.
- Soft mint-green answer container makes the synthesized response visually distinct from raw note cards — good information hierarchy.
- Inline citations as superscript chips are the right Perplexity-style pattern; just fix the numbering gap.

---

## Summary

The substance is right. The pre-commit blockers are: blog-chrome on the search page (date / read-time), button text, and the citation-numbering gap. Everything else is polish that separates *"demo works"* from *"demo feels finished."*

## Five validation queries — coverage check

From the original brief, these are the queries the demo must answer well. Status against the current 3 suggested questions:

| # | Query | Currently shown? | Notes |
|---|---|---|---|
| 1 | "I need 5 kW backup for 30 minutes for medical equipment, what should I look at?" | Partial — shown as *"Which UPS should I use in a hospital theatre?"* | Use the longer form (see fix #3 above) |
| 2 | "What's the difference between line-interactive and online double-conversion?" | ✓ shown | Keep |
| 3 | "How often should UPS batteries be replaced?" | ✓ shown (with temperature angle) | Keep — the temperature add-on is a nice upgrade |
| 4 | "Can I monitor my UPS over the network?" | ✗ missing | Add (rotation candidate) |
| 5 | "I have a small bank branch with point-of-sale terminals, what do I need?" | ✗ missing | Add (rotation candidate) |
