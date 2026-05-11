# `devai.co.za` email setup — info@devai.co.za

**Date set up:** 2026-05-08
**Why this exists:** Xneelo email hosting was tied to a hosting package that's no longer active. Only the domain is registered with Xneelo now. We needed working `info@devai.co.za` for outreach replies and (eventually) transactional mail from the Jobabroad platform.

---

## Architecture at a glance

```
                  Outsiders email info@devai.co.za
                                │
                                ▼
                  Xneelo authoritative DNS for devai.co.za
                  (nameservers: ns1/ns2.dns-h.com, ns1/ns2.host-h.net)
                                │  MX → mx1/mx2.improvmx.com
                                ▼
                       ImprovMX  (free forwarder)
                                │
                                ▼
                    laudes.michael@gmail.com  ← inbox

                  Outbound: I send from info@devai.co.za in Gmail
                                │
                                ▼
              Gmail "Send mail as" → smtp-relay.brevo.com:587
                                │
                                ▼
                      Brevo SMTP relay (free)
                                │
                                ▼
                          Recipient inbox
```

- **Domain registered at:** Xneelo (no transfer; only DNS records changed)
- **DNS hosted at:** Xneelo (nameservers unchanged)
- **Inbound mail:** ImprovMX free plan, forwards to Gmail
- **Outbound mail:** Brevo SMTP relay (free 300/day) used as a "Send mail as" account in Gmail
- **Domain points where:** A record `216.198.79.1` → Vercel project (devai-cv-site). DNS work for email did **not** touch the A record, so the website stays up.

---

## DNS records added at Xneelo (control panel → DNS)

All on the apex `@` (i.e. `devai.co.za`).

| Type | Host | Value | Priority | Purpose |
|---|---|---|---|---|
| MX  | @ | `mx1.improvmx.com.` | 10 | Inbound mail to ImprovMX (primary) |
| MX  | @ | `mx2.improvmx.com.` | 20 | Inbound mail to ImprovMX (failover) |
| TXT | @ | `v=spf1 include:spf.improvmx.com ~all` | — | SPF for forwarded mail |
| TXT | @ | `brevo-code:bf7cacaec28290c849e6d7aaadf6daa5` | — | Brevo domain-ownership verification |
| CNAME | `brevo1._domainkey` | `b1.devai-co-za.dkim.brevo.com.` | — | Brevo DKIM signing key 1 |
| CNAME | `brevo2._domainkey` | `b2.devai-co-za.dkim.brevo.com.` | — | Brevo DKIM signing key 2 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | — | DMARC monitoring policy (reports to Brevo) |

**Nothing else was changed.** The existing A record for the website is untouched.

> **Trailing-whitespace gotcha at Xneelo:** when pasting the `brevo-code:...` TXT value, Xneelo can preserve a trailing space copied from Brevo's clipboard button. Brevo's verifier does an exact string match and fails on mismatch. If a record shows `"brevo-code:... "` (note the space before the closing quote) in the Xneelo records list, edit it and delete the trailing space.

If you ever need to re-create these, the values above are exact. ImprovMX shows the same values in their dashboard under **DNS Settings**.

> **SPF note:** there can only be **one** SPF record per domain. If you later add a sender (Resend, Mailgun, anything that asks for an SPF include), **merge** it into the existing record, e.g.
> `v=spf1 include:spf.improvmx.com include:_spf.resend.com ~all` — don't add a second TXT.

---

## Accounts and dashboards

| Service | Purpose | Where to log in | Account |
|---|---|---|---|
| ImprovMX | Inbound forwarding | https://improvmx.com | (signed up with `laudes.michael@gmail.com`) |
| Brevo (formerly Sendinblue) | Outbound SMTP relay | https://app.brevo.com | (signed up with `laudes.michael@gmail.com`) |
| Xneelo | DNS panel | https://my.xneelo.com (or whatever URL Xneelo uses) | Domain account holder |

---

## ImprovMX setup recap

1. Added domain `devai.co.za` in ImprovMX dashboard.
2. Added the 2× MX + 1× TXT records at Xneelo (table above).
3. Created an alias: **`info@devai.co.za` → `laudes.michael@gmail.com`**.
4. Domain status flipped from red ("Email forwarding needs setup") to green once DNS propagated (~30 min after the records were added).

To verify it's still working at any time:

```bash
dig +short MX devai.co.za @1.1.1.1
dig +short TXT devai.co.za @1.1.1.1
```

Both should match the table above. If MX records are missing, ImprovMX will go red and forwarding stops.

---

## Brevo SMTP relay setup recap

1. Signed up at brevo.com (free plan, 300 sends/day, no card).
2. Skipped the onboarding wizard.
3. Profile menu → **SMTP & API** → **SMTP** tab.
4. **Did NOT enable IP blocking** — Gmail uses a rotating IP pool, IP-locking would break the relay.
5. Generated SMTP key named `gmail-relay`.

**SMTP credentials currently in use (also in Brevo dashboard if needed):**

| Field | Value |
|---|---|
| SMTP server | `smtp-relay.brevo.com` |
| Port | `587` (TLS) |
| Login | `aaab6e001@smtp-brevo.com` _(the one shown in Brevo, not your account email)_ |
| Password | the SMTP key generated in step 5 — **not stored here**, regenerate from Brevo if lost |

> **If you ever rotate the Brevo SMTP key**, you also have to update it inside Gmail under Settings → Accounts and Import → Send mail as → edit info@devai.co.za → "Edit info" → re-enter the new password.

---

## Gmail "Send mail as" setup recap

In Gmail (web only — not in mobile app):

1. Settings (gear) → **See all settings**.
2. **Accounts and Import** tab → **Send mail as** → **Add another email address**.
3. Form values:
   - Name: **John Montgomery**
   - Email: **info@devai.co.za**
   - "Treat as an alias" — left ticked.
4. SMTP form values:
   - SMTP server: `smtp-relay.brevo.com`
   - Port: `587`
   - Username: `aaab6e001@smtp-brevo.com`
   - Password: (Brevo SMTP key)
   - "Secured connection using TLS" selected.
5. Gmail sent a verification email to `info@devai.co.za` → ImprovMX forwarded it to `laudes.michael@gmail.com` → opened, clicked the verification link.

After verification: when composing in Gmail, click the **From** dropdown and pick `info@devai.co.za`. Replies come back to the Gmail inbox via ImprovMX.

---

## Brevo domain authentication (done 2026-05-11)

Done. The exact records are in the DNS table above. Summary of what was added at Xneelo:

| Record | Type | Host | Value |
|---|---|---|---|
| Brevo code | TXT | `@` | `brevo-code:bf7cacaec28290c849e6d7aaadf6daa5` |
| DKIM 1 | CNAME | `brevo1._domainkey` | `b1.devai-co-za.dkim.brevo.com.` |
| DKIM 2 | CNAME | `brevo2._domainkey` | `b2.devai-co-za.dkim.brevo.com.` |
| DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |

Why this was needed: before authentication, sending from `info@devai.co.za` via the Brevo relay was silently dropped because Brevo only had the personal Gmail address as a verified sender. After domain authentication, any `*@devai.co.za` sender is implicitly trusted, DKIM signing aligns with the From domain, and the "via brevo.com" tag goes away.

Notes:

- SPF was **not** touched. The existing `v=spf1 include:spf.improvmx.com ~all` stays as the only SPF record at the apex. Brevo authentication relies on DKIM alignment, not SPF.
- DMARC policy is `p=none` (monitoring only). Aggregate reports go to Brevo's address. Tighten to `p=quarantine` once a few weeks of clean DKIM-aligned mail confirm there's nothing to break.
- All four records were verified green in Brevo's **Domains** panel.

---

## Cost summary

- **Domain:** existing Xneelo registration (R150-ish/year, was already being paid)
- **ImprovMX:** R0/month (free tier — 25 aliases, unlimited forwarding)
- **Brevo:** R0/month (free tier — 300 sends/day)
- **Gmail:** R0/month (existing personal account)
- **Total monthly cost of email on `devai.co.za`:** **R0**

---

## Common things that could break this — and how to fix

| Symptom | Likely cause | Fix |
|---|---|---|
| ImprovMX dashboard goes red | Someone removed the MX or TXT records at Xneelo, or Xneelo migrated DNS | Re-add the records from the table above. |
| Email to `info@devai.co.za` bounces | Same as above, OR ImprovMX free-tier limit hit | Check ImprovMX dashboard logs. |
| Sending from Gmail fails with "Authentication failed" | Brevo SMTP key was rotated or revoked | Regenerate key in Brevo → update password in Gmail Send mail as. |
| Outgoing mail lands in recipients' spam | No DKIM | Do the Brevo domain authentication step above. |
| Outgoing mail shows "via brevo.com" | No DKIM (same root cause) | Same fix. |
| New SPF record added by another sender breaks email | Two SPF TXT records present at apex | Delete the new one; merge its include into the existing single SPF record. |
| Outbound mail vanishes silently, no bounce, recipient never receives | Sender address or domain not verified in Brevo, so the relay drops the message after a successful SMTP handoff from Gmail | Brevo → **Senders, Domains & Dedicated IPs**: confirm `devai.co.za` is authenticated (Domains tab), or add the sender address (Senders tab). |
| Bounce email from Gmail says verification delivery failed to `aaab6e001@smtp-brevo.com` | Wrong value pasted into Gmail's **Email** field on the "Send mail as" form. The SMTP login username got put where the alias email should go. | Delete the broken "Send mail as" entry in Gmail and re-add it with `info@devai.co.za` as **Email** and the Brevo login as **SMTP Username** only. |
| Brevo verification fails with "Brevo code values mismatch" even though the TXT record clearly exists at Xneelo | Trailing whitespace in the TXT value at the DNS provider. Xneelo can preserve a trailing space copied from Brevo's clipboard button. | Edit the TXT record at Xneelo, delete any trailing space inside the value, save, wait ~5 min, re-verify in Brevo. |
| First test mail from `info@devai.co.za` lands in the recipient's spam folder even with DKIM/SPF/DMARC all green | New sending domain has zero outbound reputation. Filters treat the first few messages from a fresh authenticated domain as suspicious. | Mark "Not spam" in the recipient inbox and add `info@devai.co.za` to contacts. Send 2-3 more low-stakes test sends over a few days to known-good inboxes before real outreach. Reputation builds with each "delivered, not flagged" send. |

---

## Where this connects to Jobabroad (work-abroad-web)

The 23 outreach emails to recruiters listed at https://jobabroad.co.za/recruiters are sent from **`info@devai.co.za`** using this setup. Drafts live in the Jobabroad repo at `docs/outreach-emails.md`.

Long-term, the Jobabroad platform plans to wire up Resend (outbound) + Postmark (inbound) for transactional/automation email at `jobabroad.co.za` — that's a separate setup on a separate domain and doesn't affect this `devai.co.za` config.
