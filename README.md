# Shiproom OS

Shiproom OS is a shipping control room for solo builders.

Everyone can generate ideas now. The hard part is finishing, proving, and launching a product. Shiproom OS turns a rough idea into a launch packet that a human can review:

- target user
- problem statement
- tight first-version scope
- proof checklist
- launch copy
- shipping timeline
- JSON launch-pack export
- Markdown submission brief
- saved local packet history
- evidence ledger
- analytics / Novus proof slot

## Live Demo

```text
https://daideguchi.github.io/shiproom-os/
```

## Quick Start

Open `index.html` in a browser.

## Verify

```bash
node scripts/verify_shiproom.mjs
python3 scripts/verify_claim_boundary.py
```

Expected:

```text
shiproom_verify_ok
shiproom_claim_boundary_ok
```

Latest local proof:

```text
sections=8
screenshot=media/shiproom-os-mvp-full.png
```

Responsive proof:

```text
desktop overflowX=0
mobile overflowX=0
evidence items=6
```

## Current Product Surface

Shiproom OS now includes:

- product intake
- product frame
- first-version scope
- proof checklist
- launch copy
- shipping timeline
- evidence ledger
- JSON launch-pack export
- Markdown submission brief
- local saved-packet history

## Novus Status

Mind the Product requires Novus.ai to be installed before submission. This repo does not claim that requirement is complete yet. The app exposes the Novus proof boundary directly in the generated proof checklist, evidence ledger, and launch-pack JSON.

## Hackathon Target

Mind the Product presents World Product Day: Everyone Ships Now

## Submission Docs

- [Submission package](SUBMISSION_PACKAGE.md)
- [Architecture](ARCHITECTURE.md)
- [Novus install plan](docs/NOVUS_INSTALL_PLAN.md)
- [Devpost draft](submission/devpost-draft.md)
- [Demo script](submission/demo-script.md)
- [Build journey](submission/build-journey.md)

## Claim Boundary

This is the first public MVP surface. Novus.ai is not installed yet. No Devpost submission has been made.
