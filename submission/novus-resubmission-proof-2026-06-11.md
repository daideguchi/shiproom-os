# Novus Resubmission Proof - 2026-06-11

## Project

Shiproom OS

## Public Surfaces

- Live app: https://daideguchi.github.io/shiproom-os/
- GitHub repository: https://github.com/daideguchi/shiproom-os

## Novus Install State

Novus scanned the connected GitHub repository and recognized the public web install.

- Novus workspace: `DD AI Organization`
- Novus App ID shown by the install screen: `b147308a-8db6-4ecb-ba89-29c921a8ca58`
- Platform detection: `Framework: web`, `Type: b2c`
- Install target files shown by Novus:
  - `daideguchi-shiproom-os/index.html`
  - `daideguchi-shiproom-os/scripts/install_pendo_snippet.mjs`

## Public Live Verification

Command:

```bash
node scripts/verify_novus_public.mjs
```

Latest result:

```json
{
  "ok": true,
  "url": "https://daideguchi.github.io/shiproom-os/",
  "hasPendo": true,
  "hasTrack": true,
  "hasInitialize": true,
  "horizontalOverflow": false,
  "title": "Shiproom OS",
  "pendoRequestCount": 7,
  "pendoRequestKinds": [
    "cdn.pendo.io",
    "data.pendo.io"
  ],
  "screenshot": "media/shiproom-public-novus-live-2026-06-11.png"
}
```

## Evidence Files

- `media/novus-dashboard-proof.png`
- `media/novus-dashboard-proof-2026-06-11.png`
- `media/shiproom-public-novus-live-2026-06-11.png`

## Resubmission Note

The earlier proof could be misread because it showed a shared Novus organization setup. This proof now calls out the Shiproom OS live URL, GitHub repository, exact Novus-recognized Shiproom files, and a public browser verification that observes both `cdn.pendo.io` and `data.pendo.io` requests from the deployed app.
