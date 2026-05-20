#!/usr/bin/env python3
"""Verify README works as the public review hub for judges."""

from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"

REQUIRED_MARKERS = [
    "# Shiproom OS",
    "Judge Quick Read",
    "Live Demo",
    "Demo Media",
    "Verify",
    "Novus Status",
    "Submission Docs",
    "Claim Boundary",
    "https://daideguchi.github.io/shiproom-os/",
    "https://raw.githubusercontent.com/daideguchi/shiproom-os/main/media/shiproom-os-demo.mp4",
    "![Shiproom OS live screenshot]",
    "node scripts/verify_shiproom.mjs",
    "python3 scripts/verify_no_secrets.py",
    "python3 scripts/verify_claim_boundary.py",
    "python3 scripts/verify_demo_video.py",
    "shiproom_no_secrets_ok",
    "Novus/Pendo event map",
    "Novus/Pendo dashboard proof",
    "media/novus-dashboard-proof.png",
]


def main() -> int:
    text = README.read_text(encoding="utf-8")
    missing = [marker for marker in REQUIRED_MARKERS if marker not in text]
    if missing:
        print("shiproom_readme_review_hub_failed", file=sys.stderr)
        for marker in missing:
            print(f"- missing: {marker}", file=sys.stderr)
        return 1

    print("shiproom_readme_review_hub_ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
