# Architecture — Shiproom OS

## Current Shape

Shiproom OS is currently a static browser app:

```text
index.html
  product intake
  deterministic launch-packet builder
  proof checklist renderer
  judge snapshot renderer
  launch-copy renderer
  evidence ledger renderer
  JSON export
  Markdown launch brief export
  localStorage saved packet history

scripts/verify_shiproom.mjs
  opens the app in Chrome through Playwright
  verifies the generated launch packet
  verifies the judge snapshot exists
  verifies the Novus proof slot exists
  verifies the Novus evidence boundary remains blocked until proof exists
  verifies saved-packet history
  captures a full-page screenshot
```

## Data Flow

```text
idea + target user + pain + timebox + launch mode
  -> product frame
  -> first-version scope
  -> proof checklist
  -> launch copy
  -> shipping timeline
  -> launch-pack JSON
  -> submission brief markdown
  -> optional local saved-packet history
```

## Human Control Boundary

Shiproom OS drafts a launch packet. It does not claim the product has shipped until a human attaches real public proof:

- public URL
- demo video
- README
- analytics / Novus dashboard proof

## Next Architecture Step

Add persistence and public proof:

- exportable markdown launch pack
- Novus.ai installation proof slot
- Novus.ai installation proof screenshot
