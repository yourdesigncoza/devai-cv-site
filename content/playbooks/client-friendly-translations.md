---
title: Translating technical fixes for non-technical clients
description: "Every bug-fix update to a non-technical client is two paragraphs, zero jargon, a commit SHA, and a Trello tag. The template that keeps me from leaking 'nonce', 'capability', or '403' into client inboxes."
tags: [playbook, wordpress, client-communication, writing]
draft: false
date: 2026-04-22
---

Every WordPress fix I ship to a non-technical client goes through the same translation pass. The client doesn't need to know about nonces, AJAX handlers, or capability checks. They need to know three things: what was broken (in their terms), what I did, that it's fixed.

## The two-paragraph template

```
**What went wrong:**
<describe the problem as if you were explaining it to someone who uses the
software daily but has no coding knowledge. Use analogies where helpful:
a locked door, a wrong key, a missing permission slip.>

**What was fixed:**
<describe the fix in the same plain language. Confirm it's resolved.
Keep it reassuring.>

_(Fix: <short git SHA>, <commit message in plain terms>)_

@<client handle>
```

Four elements, fixed order. No bulleted lists. No headers beyond the two bolded leads. No "technical deep-dive" appendix, they didn't ask for one.

## The jargon ban list

Never appears in the client-facing text:

| Banned | Why | Use instead |
|---|---|---|
| AJAX | meaningless to the user | "the page's background request" |
| nonce | cryptographic token jargon | "a security check" |
| capability | WordPress-internal | "permission level" |
| 403 / HTTP code | HTTP spec jargon | "the server blocked the request" |
| PHP / handler / hook | implementation detail | just describe what happened |
| middleware | implementation detail | "a step before the request reached the form" |
| validation / sanitisation | technical register | "checking the data was in the right shape" |

If a technical term is genuinely unavoidable, e.g. you have to say "the database", wrap it in plain language: *"a security rule (called a permission check)"*. The parenthetical pays the jargon tax up front so it doesn't recur.

## Tone rules

- **Calm and professional.** Not chatty, not apologetic.
- **Brief.** 2–4 sentences per paragraph. Longer reads as defensive.
- **No blame.** Not "WordPress's quirky AJAX model caused this", not "the user should have clicked X instead". Just what happened and what you did.
- **No speculation.** "This may have started when…" has no place. If you know, state it; if you don't, skip that paragraph.

## A worked example

**Technical summary (internal):**
`requireAuth()` was checking `manage_options` capability on AJAX write operations, blocking non-admin users with a 403 on the Class Types admin page.

**Client output:**

> **What went wrong:** When a logged-in user tried to add or edit a class type, the system was checking whether they had full admin-level access before allowing the action. Because regular users don't have that level of access, the request was silently blocked.
>
> **What was fixed:** I relaxed the check so that anyone with edit-level access on the page can now add or edit class types. The admin page is working normally again.
>
> _(Fix: a3f21d9, align Class Types permission check with the page's access level)_
>
> @mariomaree

Three minutes of translation work. The client replies with a thumbs-up instead of a question. The next bug fix follows the same shape. Over 14 months, this template has saved more back-and-forth than almost anything else I've automated.

## Why it matters

Non-technical clients who receive technical updates develop two bad habits: they either **stop reading** (because it's noise) or they **over-trust** (because "nonce" sounds authoritative). Either outcome leaks goodwill.

A two-paragraph plain translation lets them stay engaged with their own project. It's also the honest form of the message, "the system checked for admin access where it shouldn't have, and it doesn't anymore" is what actually happened. The jargon was scaffolding, not substance.

## See also

- [[projects/wecoza-development|WeCoza 3.0]], the 14-month client engagement where this template earned its keep.
- [[decisions/postgres-alongside-wordpress|Why Postgres alongside WordPress]], the schema decisions this client reads, also in plain language (via a hand-maintained DBML file).
- [[about/clients|Clients & collaborators]], the through-line: every long client relationship on this page ran on clear, jargon-free updates.
