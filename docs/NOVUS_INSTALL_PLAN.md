# Novus Install Plan

## Current Status

Novus.ai is not installed yet.

Mind the Product requires Novus to be installed before submission, and the submission should include proof such as a dashboard screenshot. Shiproom OS already exposes the Novus proof boundary in the app, but prize eligibility should not be claimed until the real Novus dashboard proof exists.

## What We Know From Public Sources

- The Mind the Product Devpost page says projects without Novus installed are ineligible for prizes.
- Pendo's public Novus announcement frames Novus as a product agent that connects shipped software to product intelligence.
- Pendo's install documentation says the web install script includes a unique API key and initializes the Pendo Web SDK.
- Pendo's install documentation also says the install script must be initialized before tracking starts, and that data can take time to appear.

Source links:

- https://mindtheproduct.devpost.com/
- https://www.pendo.io/pendo-blog/introducing-novus/
- https://support.pendo.io/hc/en-us/articles/21362607464987-Components-of-the-install-script
- https://support.pendo.io/hc/en-us/articles/17606930575387-Installation-options-for-a-direct-web-implementation-of-Pendo

## Required Human / Account Step

Install requires a real Novus or Pendo account/project and a project-specific key or snippet.

Do not:

- paste a fake analytics key
- use someone else's key
- claim installation from a placeholder
- submit before dashboard proof exists

## Integration Slot

When the real snippet is available, add it in `index.html` before `</head>` or through the provider's recommended installation route.

The repo includes a helper that installs the real frontend snippet only when a non-placeholder key is provided:

```bash
PENDO_API_KEY=real_project_key \
PENDO_VISITOR_ID=shiproom-public-demo \
PENDO_ACCOUNT_ID=shiproom-os \
node scripts/install_pendo_snippet.mjs
```

The key is expected to be a frontend install key from Pendo/Novus. Do not run this with a fake key.

Expected proof after installation:

- live page loads with the real tracking snippet
- dashboard receives at least one visit/session/event
- screenshot of the dashboard is saved under `media/`
- README and submission package link to the screenshot
- app evidence ledger is updated to a real dashboard-proof status

## Verification Command To Add Later

```bash
node scripts/verify_shiproom.mjs
python3 scripts/verify_novus_installed.py
```

`verify_novus_installed.py` now exists and is intentionally strict. It should fail until a real Pendo/Novus snippet is installed in `index.html` and `media/novus-dashboard-proof.png` exists.
