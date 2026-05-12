#!/usr/bin/env bash
# Outreach drafts orchestrator. Creates one Gmail draft per recipient in the
# RECIPIENTS array below by calling `gog gmail drafts create`.
#
# Drafts are created in the Gmail Drafts folder for the account in $GOG_ACCOUNT.
# Sending stays manual: review each draft in Gmail before pressing send.
#
# Setup: see ~/.claude/templates/outreach-drafts/README.md and
# ~/.claude/CLAUDE.md "Email Safety & Workflow" for prerequisites.
#
# Usage:
#   ./create-drafts.sh              # creates drafts in Gmail
#   ./create-drafts.sh --dry-run    # prints what would be created, no API calls
#
# Customisation per project:
#   1. Set FROM to the verified Gmail send-as alias you want to use.
#   2. Populate the RECIPIENTS array. One entry per recipient. Format:
#        "<N>|<to>|<cc-or-empty>|<subject>|<body-file-name>"
#      Leave the CC field empty as "" if there is no CC.
#   3. Create matching <body-file-name> in the bodies/ directory next to this
#      script. One plain-text file per recipient.
#
# Re-running this script creates *new* drafts every time. If you've already
# created drafts and want to fix one, use `gog gmail drafts update <draftId>`
# rather than re-running the whole batch.

set -euo pipefail

# === Customise per project ===

FROM='info@devai.co.za'

RECIPIENTS=(
  # Example (delete this and add your real recipients):
  # "1|info@example.com||Mentioning example on YourSite: courtesy heads-up|01-example.txt"
  # "2|hello@another.com|cc@another.com|Listing another on YourSite: courtesy note|02-another.txt"
)

# === No edits below this line for normal use ===

BODIES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/bodies"

DRY_RUN_FLAG=()
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN_FLAG=(--dry-run)
  echo "DRY RUN: no drafts will be created"
  echo
fi

if [[ ${#RECIPIENTS[@]} -eq 0 ]]; then
  echo "RECIPIENTS array is empty. Edit $(basename "${BASH_SOURCE[0]}") and add at least one entry." >&2
  echo "See README.md for format." >&2
  exit 1
fi

create_draft() {
  local label="$1"
  local to="$2"
  local cc="$3"
  local subject="$4"
  local body_file="$5"

  if [[ ! -f "$body_file" ]]; then
    echo "ERROR: missing body file: $body_file" >&2
    return 1
  fi

  echo "→ $label"
  echo "  To: $to"
  [[ -n "$cc" ]] && echo "  CC: $cc"
  echo "  Subject: $subject"
  echo "  Body: $body_file ($(wc -l <"$body_file") lines)"

  local cc_args=()
  [[ -n "$cc" ]] && cc_args=(--cc "$cc")

  gog gmail drafts create \
    --from "$FROM" \
    --to "$to" \
    "${cc_args[@]}" \
    --subject "$subject" \
    --body-file "$body_file" \
    "${DRY_RUN_FLAG[@]}" \
    --plain
  echo
}

for row in "${RECIPIENTS[@]}"; do
  IFS='|' read -r N TO CC SUBJECT BODY_FILE <<<"$row"
  create_draft \
    "#${N}" \
    "$TO" \
    "$CC" \
    "$SUBJECT" \
    "$BODIES_DIR/$BODY_FILE"
done

echo "Done. Open Gmail → Drafts to review."
