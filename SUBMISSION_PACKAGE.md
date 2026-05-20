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
- learning loop for what to measure after launch
- next-agent handoff brief for human/AI continuation
- safe Novus/Pendo event map for activation tracking
- saved local packet history
- Novus/Pendo install proof
- judge snapshot that explains who, what hurts, how it helps, what is verified, and what is still blocked

## Why It Fits Mind the Product

The challenge is about shipping real products. Shiproom OS focuses on the gap between having an idea and getting a product into a reviewable, launchable state.

## Current Proof

```text
node scripts/verify_shiproom.mjs
shiproom_verify_ok
sections=11

python3 scripts/verify_no_secrets.py
shiproom_no_secrets_ok

python3 scripts/verify_readme_review_hub.py
shiproom_readme_review_hub_ok
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

Demo video draft:

```text
media/shiproom-os-demo.mp4
https://raw.githubusercontent.com/daideguchi/shiproom-os/main/media/shiproom-os-demo.mp4
```

Final public video is still pending until DD approves the draft and hosted video.

## Built With

HTML, CSS, JavaScript, Playwright verification, GitHub Pages target.

## Submission Docs

- `docs/NOVUS_INSTALL_PLAN.md`
- `docs/NOVUS_EVENT_MAP.md`
- `submission/devpost-draft.md`
- `submission/demo-script.md`
- `submission/build-journey.md`

## Claim Boundary

Novus.ai / Pendo proof is attached at `media/novus-dashboard-proof.png`, and `scripts/verify_novus_installed.py` verifies the real snippet plus dashboard screenshot.

No final Devpost submission has been made yet.
