# Architecture — Shiproom OS

## Current Shape

Shiproom OS is currently a static browser app:

```text
index.html
  product intake
  deterministic launch-packet builder
  proof checklist renderer
  launch-copy renderer
  JSON export

scripts/verify_shiproom.mjs
  opens the app in Chrome through Playwright
  verifies the generated launch packet
  verifies the Novus proof slot exists
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
```

## Human Control Boundary

Shiproom OS drafts a launch packet. It does not claim the product has shipped until a human attaches real public proof:

- public URL
- demo video
- README
- analytics / Novus dashboard proof

## Next Architecture Step

Add persistence and public proof:

- localStorage project history
- exportable markdown launch pack
- GitHub Pages live demo
- Novus.ai installation proof slot
