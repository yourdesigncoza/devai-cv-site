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

**Nothing else was changed.** The existing A record for the website is untouched.

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

## (Optional, recommended) Brevo domain authentication

Not done yet, but worth doing before any high-volume outreach:

1. In Brevo: **Senders, Domains & Dedicated IPs** → **Domains** → **Add a Domain** → `devai.co.za`.
2. Brevo will list a DKIM record (CNAME or TXT) and a Brevo verification record (TXT). **Do not let it replace the existing SPF record at the apex** — SPF stays as the ImprovMX-only one above (Brevo signs via DKIM, not SPF).
3. Add the records at Xneelo, click **Verify** in Brevo.
4. Outgoing mail no longer gets the `via brevo.com` tag in some inbox UIs and deliverability improves.

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
| Outgoing mail lands in recipients' spam | No DKIM | Do the optional Brevo domain authentication step above. |
| Outgoing mail shows "via brevo.com" | No DKIM (same root cause) | Same fix. |
| New SPF record added by another sender breaks email | Two SPF TXT records present at apex | Delete the new one; merge its include into the existing single SPF record. |

---

## Where this connects to Jobabroad (work-abroad-web)

The 23 outreach emails to recruiters listed at https://jobabroad.co.za/recruiters are sent from **`info@devai.co.za`** using this setup. Drafts live in the Jobabroad repo at `docs/outreach-emails.md`.

Long-term, the Jobabroad platform plans to wire up Resend (outbound) + Postmark (inbound) for transactional/automation email at `jobabroad.co.za` — that's a separate setup on a separate domain and doesn't affect this `devai.co.za` config.
