# Outreach drafts template

Reusable scaffold for creating Gmail outreach drafts via the `gog` CLI and submitting contact forms via a clipboard helper. Drop this into any project that needs to send a batch of bespoke courtesy / pitch / verification mails to a list of recipients.

The reference implementation that inspired this template lives at `work-abroad-web/scripts/outreach-drafts/`. See that repo for a worked example of how the structure looks once populated.

## What's inside

| File | Purpose |
|---|---|
| `create-drafts.sh` | Orchestrator that iterates over a hardcoded recipient list and creates one Gmail draft per recipient via `gog gmail drafts create`. Drafts only; sending stays manual. |
| `submit-form.sh` | Wayland clipboard helper for recipients whose only contact channel is a website form. Copies the body to clipboard, prints metadata, opens the URL in Brave. |
| `bodies/` | One plain-text body file per recipient. Naming convention: `<NN>-<slug>.txt`. |
| `README.md` | This file. |

## Prerequisites (already installed once per machine)

The global `gog` setup is documented in `~/.claude/CLAUDE.md` under "Email Safety & Workflow":

- `gog` binary at `~/.local/bin/gog`
- OAuth client registered, refresh token cached at `~/.config/gogcli/keyring/`
- Env vars (`GOG_KEYRING_BACKEND`, `GOG_KEYRING_PASSWORD`, `GOG_ACCOUNT`) persisted in `~/.bashrc`
- A verified Gmail send-as alias for the From address (default: `info@devai.co.za`; change in the script header for a different project)

If `gog auth doctor --check` reports failure, re-auth with:
```
gog auth add laudes.michael@gmail.com --services gmail --force
```
The Testing-mode OAuth app expires refresh tokens every 7 days.

## Scaffolding a new project

```bash
cp -r ~/.claude/templates/outreach-drafts/ <project-root>/scripts/
cd <project-root>/scripts/outreach-drafts/
```

Then in order:

1. **Edit the `FROM` constant in `create-drafts.sh`** if you want to send from an alias other than `info@devai.co.za`. Run `gog gmail settings sendas list` to see what's available.
2. **Write body files** in `bodies/`. One per recipient. Use plain text, no markdown bold (`**word**` renders literally in email), no em-dashes.
3. **Edit the `RECIPIENTS` array in `create-drafts.sh`** to list the recipients with email addresses. Format per line: `"<N>|<to>|<cc-or-empty>|<subject>|<body-file>"`. The function below the array calls `create_draft` for each one.
4. **Edit the `RECIPIENTS` array in `submit-form.sh`** for any recipients without a public email. Format per line: `"<N>|<form-url>|<subject>|<body-file>"`.
5. Dry-run first: `./create-drafts.sh --dry-run`.
6. Real run when the dry-run looks right: `./create-drafts.sh`. Drafts land in Gmail Drafts for manual review and send.
7. For form submissions: `./submit-form.sh list` to see recipients, then `./submit-form.sh <N>` per submission.

## Naming and voice

Voice rules (mirrors `~/.claude/CLAUDE.md` and project-specific rules):

- No em-dashes anywhere
- No intensifiers (very, really, huge, simply, surprisingly)
- No laudatory closers like "Thanks for the work," — use plain "Thanks,"
- Subjects should not contain em-dashes either; use colons or commas
- Plain-text plain bold (asterisks render literally in email)

Naming convention for body files: `<NN>-<slug>.txt` where NN is the recipient's number in your project's tracking doc (often the order in `outreach-emails.md` or similar). Slug is lowercase-hyphen-separated company name.

## Status tracking

The orchestrator script doesn't track sent state. Maintain a status log in a markdown doc within the project (typically `docs/outreach-emails.md` or `docs/outreach.md`), with columns for order, recipient, sent date, and response status.

## Safety

- Both scripts default to draft-creation only.
- Neither script ever calls `gog gmail send` or `gog gmail drafts send`.
- The `--gmail-no-send` flag can be added to any `gog` call for belt-and-braces safety against accidental sends.
- Re-running `create-drafts.sh` creates duplicate drafts; delete extras in Gmail if you re-run.
