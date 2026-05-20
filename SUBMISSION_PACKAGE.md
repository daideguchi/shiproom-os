# Submission Package — Shiproom OS

## Title

Shiproom OS

## Short Description

A shipping control room that turns a rough product idea into scope, proof, launch copy, and a reviewable launch packet.

## Problem

AI makes it easy to generate ideas, tasks, and code. It does not guarantee that a product actually ships with a clear user, narrow scope, public proof, and launch story.

## Solution

Shiproom OS helps solo builders convert a messy idea into a concrete launch packet:

- product frame
- first-version scope
- proof checklist
- launch copy
- shipping timeline
- JSON export
- Markdown submission brief
- evidence ledger
- saved local packet history
- Novus.ai proof slot
- judge snapshot that explains who, what hurts, how it helps, what is verified, and what is still blocked

## Why It Fits Mind the Product

The challenge is about shipping real products. Shiproom OS focuses on the gap between having an idea and getting a product into a reviewable, launchable state.

## Current Proof

```text
node scripts/verify_shiproom.mjs
shiproom_verify_ok
sections=9
```

Live verification:

```text
shiproom_pages_visual_ok
evidence=6
hasMarkdownBoundary=true
```

Screenshot:

```text
media/shiproom-os-mvp-full.png
media/shiproom-os-pages-full.png
```

Demo video: pending until the public demo, Novus/Pendo proof, and build journey are final.

## Built With

HTML, CSS, JavaScript, Playwright verification, GitHub Pages target.

## Submission Docs

- `docs/NOVUS_INSTALL_PLAN.md`
- `submission/devpost-draft.md`
- `submission/demo-script.md`
- `submission/build-journey.md`

## Claim Boundary

Novus.ai is required for prize eligibility but has not been installed yet. This package keeps that proof slot explicit and blocked until verified.

`scripts/verify_novus_installed.py` is present but intentionally fails until real Pendo/Novus proof exists.
