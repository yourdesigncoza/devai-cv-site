# Multi-domain email consolidation: options

**Captured:** 2026-05-11
**Status:** Notes, not a decision yet. Current `devai.co.za` setup (ImprovMX + Brevo) stays in place until I'm ready to revisit.
**See also:** `docs/email-setup-devai.md` for the current working setup.

---

## The question

I have several projects on different domains (`devai.co.za`, `edenfintech.com`, `yourdesign.co.za`, `jobabroad.co.za`, more later). I want one inbox for everything, with the ability to send from any of those identities, without tripping spam filters.

## Core insight

Spam filters score by **(sender domain, recipient)**, not by my Gmail account. Using one Gmail inbox as a hub is invisible to filters and doesn't increase spam risk at all. What increases spam risk:

- A domain lacking DKIM / SPF / DMARC.
- A domain with no reputation history (fresh send to corporate inbox = spam folder).
- Mixing transactional + marketing + cold + personal mail on one address (poisons that address's reputation).
- Identical content sent from multiple domains to the same recipient (filters cross-reference).
- Reply-to and From on different domains (trips alignment checks).

So the recommended shape is always: **one Gmail inbox as the human hub, many authenticated domains as the sending identities**. Where the options differ is in *how* those identities get set up.

---

## Option A: Stay split (ImprovMX + Brevo, current)

What it is: Each domain gets its own ImprovMX inbound forwarder (free, 1 domain per free account) + Brevo outbound relay (300 sends/day free, multiple domains on one account) + Gmail "Send mail as" entry.

- **Cost:** R0/month
- **Multi-domain:** Yes, but ImprovMX free tier needs a separate account per domain (or $9/mo Premium for 5 domains in one account). Brevo handles multiple domains on the same account.
- **Per-domain reputation:** Builds independently per domain. New domains warm up slowly. First test sends often land in spam.
- **Setup complexity per new domain:** ~30 min. Add 4 Brevo DNS records (TXT brevo-code, 2× CNAME DKIM, TXT DMARC), 3 ImprovMX records (2× MX, 1× SPF TXT), Gmail "Send mail as" with SMTP credentials.
- **Operational surface:** Two dashboards (ImprovMX, Brevo) plus Gmail Send-mail-as. SMTP key rotation has to be mirrored manually into Gmail.
- **Deliverability:** Brevo's IPs are good for transactional but second-tier for cold outreach. Recruiter inboxes filter Brevo-sent mail harder than Google-sent mail.

## Option B: ForwardEmail.net Enhanced ($3/mo)

What it is: One service does inbound forwarding **and** outbound SMTP relay with DKIM signing. Unlimited domains.

- **Cost:** $3/mo (~R55/mo) flat, unlimited domains.
- **Multi-domain:** Yes, unlimited.
- **Per-domain reputation:** Same per-domain build-up as Option A. Their relay IPs are decent but not Google-tier.
- **Setup complexity per new domain:** ~15 min. One DNS dance per domain (MX + DKIM + verification TXT). Both directions handled at one service.
- **Operational surface:** One dashboard. One set of credentials.
- **Why I'd skip it:** Migadu is the same price-per-month annually and gives real mailboxes instead of just a relay-and-forward layer.

## Option C: Migadu Micro ($19/yr)

What it is: Real IMAP/SMTP mailboxes for unlimited domains, single annual fee.

- **Cost:** $19/yr (~R350/yr, ~R30/month). Unlimited domains, unlimited mailboxes within plan quotas.
- **Multi-domain:** Yes, unlimited.
- **Per-domain reputation:** Their outbound is DKIM-signed per domain. Reputation builds per domain but their IPs are clean.
- **Setup complexity per new domain:** ~20 min. MX + DKIM + DMARC per domain, mailbox created in Migadu admin, optional forward to Gmail.
- **Operational surface:** One dashboard. Real mailboxes mean I can either use Migadu's webmail/native IMAP **or** forward into Gmail (best of both).
- **Why this is the best-value paid option:** Cheapest per year, real mailboxes (not just a forwarder), unlimited domains on one account.

## Option D: Google Workspace Business Starter ($6/user/mo)

What it is: Real Google mailbox at a custom domain, with **Domain Aliases** as the killer feature for multi-domain on one user.

### Domain Aliases (free, up to 20 per user)

A domain alias attaches an additional domain to the same mailbox. If the primary user is `john@edenfintech.com`, adding `devai.co.za` as a domain alias automatically creates `john@devai.co.za` going to the same mailbox. No extra license cost, no separate user, no "Send mail as" configuration. The Gmail From dropdown shows each address natively.

This is what makes Workspace the right answer for one-user-many-domain setups. Up to 20 domains on a single user's $6/mo license.

- **Cost:** $6/user/mo (~R110/mo, ~R1,300/yr).
- **Multi-domain:** Yes, 20 domain aliases free on one user license.
- **Per-domain reputation:** **Not relevant.** All mail goes through Google's SMTP infrastructure. Google's IP reputation is shared across all Workspace customers. First send from a brand-new domain lands in inbox, not spam. This alone changes the cold-outreach calculus.
- **Setup complexity per new domain:** ~5-10 min. Add domain as alias in admin console, update MX + DKIM records. No separate SMTP setup. No "Send mail as" passwords.
- **Operational surface:** One Workspace admin console. No relay, no forwarder.
- **What you also get:** Calendar, Docs, Meet, Drive on the business identity. 30 GB storage. Mobile apps just work.

### The trade

Workspace IS a second Google account (the `john@edenfintech.com` mailbox). You either:
- Switch between accounts in Gmail (one click in the avatar menu), OR
- Configure Workspace to auto-forward into your personal Gmail (keeping one literal inbox tab)

Most pros end up at Workspace eventually. The reasons it's typically deferred: $6/mo feels expensive when free works, and the migration step has a "blocking weekend" feel.

---

## Comparison table

| Option | Annual cost | Multi-domain | Real mailbox | Best deliverability | Setup complexity per new domain | One dashboard |
|---|---|---|---|---|---|---|
| A: Stay split | $0 | Yes, with per-account workarounds | No (forwarder) | Good with proper auth, per-domain warm-up needed | Medium-high | No (two services) |
| B: ForwardEmail.net | $36 | Unlimited | No (forwarder + relay) | Decent | Low-medium | Yes |
| C: Migadu Micro | $19 | Unlimited | Yes | Solid, not Google-tier | Medium | Yes |
| D: Google Workspace | $72 | 20 aliases on one user | Yes | **Google's reputation** | Low | Yes |

---

## Decision factors that would push me one way or the other

### Toward Workspace (D)

- I start sending more cold outreach (recruiter pitches, client introductions, business development). Deliverability gap closes the loop on revenue.
- EdenFintech actually becomes the primary identity I want to project to clients and prospects. Workspace + `john@edenfintech.com` is the credible setup.
- I add more domains. The 20-alias allowance covers everything I can foresee.
- I want Calendar and Meet on the business identity for scheduling.
- I get tired of managing the two-dashboard setup (Brevo SMTP key rotations, ImprovMX free-tier per-domain accounts).

### Toward Migadu (C)

- I want a real mailbox solution at the lowest possible cost.
- I'm fine without Google's Calendar/Meet/Drive integration for the business identity.
- I want vendor independence from Google.

### Stay on A (current)

- $0/mo matters more than operational simplicity right now.
- I'm not sending enough cold outreach for deliverability to drive revenue.
- I'm OK debugging Brevo verification mismatches and managing per-domain DNS adds.
- The Jobabroad transactional setup (Resend + Postmark, separate from this) handles the high-volume case anyway.

---

## What "ready to switch" looks like

I'll know I'm ready when ONE of these triggers fires:

1. I'm about to spin up the second domain's email setup (`edenfintech.com` is the obvious next one). Worth doing the math: ~30 min × N domains for Option A vs one Workspace setup that covers all of them.
2. A cold-outreach campaign comes back with worse-than-expected deliverability and I have evidence Brevo IPs are the bottleneck (spam-folder rate, headers showing the via tag).
3. I want EdenFintech to look credible to a real prospect (the legal/financial signals of a `@edenfintech.com` mailbox with proper auth are worth $6/mo).
4. I get fed up debugging the relay setup for the third time.

Until then, the current setup is good. I have one domain working, the doc captures everything, and the troubleshooting table covers the failure modes I've already hit.

---

## What NOT to consider

- **Self-hosted mail (mailcow, Postfix, etc.):** operational burden vastly outweighs cost savings. IP reputation is essentially impossible to build from scratch on a residential VPS.
- **Cloudflare Email Routing for outbound:** doesn't exist. Cloudflare only forwards inbound.
- **Postmark / Resend / Mailgun for personal identity mail:** these are transactional ESPs. Sending personal/cold mail from a transactional ESP is technically allowed but typically gets more spam-filter scrutiny, not less. Reserve them for platform/app mail (Jobabroad-style).
- **Using one domain for everything:** loses the per-identity signal that makes each project look like its own thing.

---

## Cross-references

- `docs/email-setup-devai.md`: current setup details, DNS records, troubleshooting.
- `CLAUDE.md`: identity rules (EdenFintech vs DevAi vs YourDesign).
- `content/decisions/`: when a real decision is made, write it up here as a position page.
