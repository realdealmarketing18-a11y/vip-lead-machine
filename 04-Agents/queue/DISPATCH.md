# COO Dispatch Queue
**Last updated:** 2026-04-16
**Mode:** `single` (options: single | batch)

---

## NEXT RUN

```yaml
next_city: Newport Beach
run_mode: single
agents_to_run:
  - city-research
  - sales-page-copywriter
  - video-script-creator
  - web-design
  - video-production
skip_if_exists: true
notify_on_complete: true
```

---

## CITY QUEUE STATUS

| # | City | Research | Sales Page | Scripts | Web | Video | Done |
|---|------|----------|-----------|---------|-----|-------|------|
| 1 | Newport Beach | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 2 | Irvine | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 3 | Rancho Cucamonga | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 4 | Corona | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 5 | Riverside | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 6 | Fontana | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | Mission Viejo | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | Laguna Hills | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

---

## COMPLETED RUNS LOG

*(empty — first run pending)*

---

## HOW TO UPDATE

After each agent completes, mark the cell: ⬜ → ✅
Change `next_city` to the next unfinished city before the next morning run.
