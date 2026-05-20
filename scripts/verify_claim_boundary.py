#!/usr/bin/env python3
"""Fail if Shiproom OS starts claiming Novus proof without a real proof file."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROOF_FILE = ROOT / "media" / "novus-dashboard-proof.png"
TEXT_FILES = [
    ROOT / "README.md",
    ROOT / "SUBMISSION_PACKAGE.md",
    ROOT / "docs" / "NOVUS_INSTALL_PLAN.md",
    ROOT / "submission" / "devpost-draft.md",
]

UNSAFE_PHRASES = [
    "novus.ai is installed",
    "novus is installed",
    "verified with dashboard screenshot",
    "prize eligibility complete",
]


def main() -> int:
    combined = "\n".join(path.read_text(encoding="utf-8").lower() for path in TEXT_FILES if path.exists())
    if not PROOF_FILE.exists():
        for phrase in UNSAFE_PHRASES:
            if phrase in combined:
                print("shiproom_claim_boundary_failed")
                print(f"unsafe_phrase={phrase}")
                print(f"missing_proof={PROOF_FILE}")
                return 1
    print("shiproom_claim_boundary_ok")
    print(f"novus_proof_file_exists={PROOF_FILE.exists()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
