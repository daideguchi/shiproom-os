# Novus / Pendo Event Map

Shiproom OS should only send low-risk product-usage events after a real Novus/Pendo install key is added.

No rough idea text, target-user text, pain text, launch copy, API keys, or private user data should be sent as event payload.

## Events

| Event | When it fires | Safe payload |
|---|---|---|
| `shiproom_packet_built` | User clicks Build Packet | launch mode, timebox, Novus status, proof item count, evidence item count, public URL present |
| `shiproom_snapshot_saved` | User saves a local packet snapshot | same safe payload |
| `shiproom_markdown_copied` | User copies the Markdown brief | same safe payload |
| `shiproom_pack_copied` | User copies the JSON launch pack | same safe payload |
| `shiproom_json_downloaded` | User downloads the JSON launch pack | same safe payload |
| `shiproom_markdown_downloaded` | User downloads the Markdown launch brief | same safe payload |

## Why These Events

These events prove whether Shiproom OS helps a builder move from idea intake to a concrete launch artifact.

The primary activation signal is:

```text
builder exports a Markdown launch brief or saves a packet
```

## Stoplines

- Do not install a fake key.
- Do not send free-text product ideas to analytics.
- Do not claim Novus/Pendo proof until `media/novus-dashboard-proof.png` exists and the live verifier passes.
