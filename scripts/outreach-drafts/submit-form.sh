#!/usr/bin/env bash
# Outreach form-submission clipboard helper. For recipients whose only contact
# channel is a website form, this copies the message body to the Wayland
# clipboard, prints the metadata (name / email / subject) to the terminal, and
# opens the form URL in the default browser (Brave).
#
# Usage:
#   ./submit-form.sh <number>      e.g. ./submit-form.sh 1
#   ./submit-form.sh list          show all recipients
#
# Customisation per project:
#   1. Set NAME and EMAIL to whatever the form's "Name" and "Email" fields
#      should contain.
#   2. Populate the RECIPIENTS array. One entry per recipient. Format:
#        "<N>|<form-url>|<subject>|<body-file-name>"
#   3. Create matching <body-file-name> in the bodies/ directory.
#
# Workflow per submission:
#   1. ./submit-form.sh <N>   (browser opens, body lands on clipboard)
#   2. In the form: type name, email, subject from the terminal output
#   3. In the message field: Ctrl+V to paste body
#   4. Solve any CAPTCHA, submit
#   5. Update the project's outreach status log
#
# Requires: wl-copy (Wayland clipboard), xdg-open (URL launcher).

set -euo pipefail

# === Customise per project ===

NAME='John Montgomery'
EMAIL='info@devai.co.za'

# Cold batch 01: SA commercial solar installers, form-only recipients.
# #2 Terra Firma has no public email; the contact form is the only channel.
RECIPIENTS=(
  "2|https://www.terrafirma.africa/contact/|A quieter inbox for the Terra Firma sales team|02-terra-firma.txt"
)

# === No edits below this line for normal use ===

BODIES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/bodies"

print_list() {
  if [[ ${#RECIPIENTS[@]} -eq 0 ]]; then
    echo "RECIPIENTS array is empty. Edit $(basename "${BASH_SOURCE[0]}") and add at least one entry."
    echo "See README.md for format."
    return
  fi
  printf "%-4s  %-50s  %s\n" "N" "URL" "BODY"
  printf "%-4s  %-50s  %s\n" "---" "----------" "----"
  for row in "${RECIPIENTS[@]}"; do
    IFS='|' read -r n url subj body <<<"$row"
    printf "%-4s  %-50s  %s\n" "$n" "$url" "$body"
  done
}

if [[ $# -eq 0 || "${1:-}" == "list" || "${1:-}" == "--list" ]]; then
  print_list
  exit 0
fi

NUM="$1"
MATCH=""
for row in "${RECIPIENTS[@]}"; do
  IFS='|' read -r n url subj body <<<"$row"
  if [[ "$n" == "$NUM" ]]; then
    MATCH="$row"
    break
  fi
done

if [[ -z "$MATCH" ]]; then
  echo "ERROR: no recipient with number $NUM" >&2
  echo "Run \`$0 list\` to see all available numbers." >&2
  exit 1
fi

IFS='|' read -r N URL SUBJECT BODY_FILE <<<"$MATCH"
BODY_PATH="$BODIES_DIR/$BODY_FILE"

if [[ ! -f "$BODY_PATH" ]]; then
  echo "ERROR: body file missing: $BODY_PATH" >&2
  exit 1
fi

wl-copy <"$BODY_PATH"

cat <<EOF
========================================
  Recipient #${N}
========================================

  Name:     ${NAME}
  Email:    ${EMAIL}
  Subject:  ${SUBJECT}

  Message:  (copied to clipboard, $(wc -c <"$BODY_PATH") bytes)
            Paste with Ctrl+V into the message field.

  Form:     ${URL}

----------------------------------------
Body preview (first 4 lines):
----------------------------------------
$(head -4 "$BODY_PATH" | sed 's/^/  /')
...

EOF

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 &
  echo "Opening $URL in browser..."
else
  echo "(xdg-open not found; open the URL manually)"
fi

echo
echo "After submitting, log the send in the project's outreach status doc."
