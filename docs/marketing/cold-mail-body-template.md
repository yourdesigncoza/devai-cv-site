---
purpose: Canonical cold-mail body template for DevAi outbound to content-heavy SA installer / EPC / B2B service businesses
voice_version: v2
locked: 2026-05-12
based_on: Zendesk patterns #5 (straight to business) + #6 (paint a picture)
gemini_reply_rate_estimate: 15-20 per 100
supersedes: v1 ("Saw <Company>'s site while looking at...")
---

# Cold-mail body template (v2)

Generic template. Per-recipient personalisation lives in the bracketed slots. Replace each slot with one short, specific sentence drawn from defuddle output. Do not introduce em-dashes, intensifiers, or AI-attribution language.

## Template

```
Subject: A quieter inbox for the <Company> sales team

Hi <Name>,

It's late Thursday afternoon. One of your sales
engineers is replying to email number nine for the
day, all the same question phrased two different
ways: <plain-language version of the recurring
prospect question>.

The next prospect who emails won't hear back until
Monday. <one short line that shows you know
<Company>'s scale or content depth>.

Imagine the same prospect on the <Company> site
at 8pm, typing that question into a search box,
and reading a cited answer pulled straight from
your own <specific page/content area> in under five
seconds.

The Monday backlog shrinks. The prospects
who still reach out are qualified for high-value
conversations, like <one specific high-value
conversation type their senior staff want more of>.

I build the second picture. Live SA commercial-solar
example I built for this market:

https://demo.devai.co.za/commercial-solar
(Try a real question, e.g., "what NRS 097 compliance
applies to a 50 kWp rooftop in Cape Town?" or "Victron
MultiPlus II options for a 200 kVA factory backup?")

If this looks useful, I can build you a private demo
in 48 hours, using about twenty <Company> pages,
so you can try it on your own content before any
commitment.

Worth 15 minutes?

Thanks,
John
- - - - - - - - -
Web: https://devai.co.za
Mobile: +27 79 177 1970
```

## Canonical filled example (Solareff / DeVilliers Botha)

Use this as the voice reference when filling other recipients.

```
Subject: A quieter inbox for the Solareff sales team

Hi DeVilliers,

It's late Thursday afternoon. One of your sales
engineers is replying to email number nine for the
day, all the same question phrased two different
ways: should the prospect sign a PPA or go capex,
and which grid-code applies to their rooftop.

The next prospect who emails won't hear back until
Monday. Solareff's site has the answers, somewhere
across three divisions and four hundred pages of
case studies, but most prospects won't dig.

Imagine the same prospect on the Solareff site
at 8pm, typing that question into a search box,
and reading a cited answer pulled straight from
your own Solutions and Finance pages in under five
seconds.

The Monday backlog shrinks. The prospects
who still reach out are qualified for high-value
conversations, like a PPA structuring call with
Stanlib.

I build the second picture. Live SA commercial-solar
example I built for this market:

https://demo.devai.co.za/commercial-solar
(Try a real question, e.g., "what NRS 097 compliance
applies to a 50 kWp rooftop in Cape Town?" or "Victron
MultiPlus II options for a 200 kVA factory backup?")

If this looks useful, I can build you a private demo
in 48 hours, using about twenty Solareff pages,
so you can try it on your own content before any
commitment.

Worth 15 minutes?

Thanks,
John
- - - - - - - - -
Web: https://devai.co.za
Mobile: +27 79 177 1970
```

## Day-3 follow-up

```
Subject: Re: A quieter inbox for the <Company> sales team

Hi <Name>,

Just checking this reached you.

Thanks,
John
```

## Day-7 follow-up

```
Subject: Re: A quieter inbox for the <Company> sales team

Hi <Name>,

One last try. Is reducing repetitive pre-sales email a
priority for <Company> right now?

If timing's wrong I'll close the loop. If it's worth a
look, the live demo is at https://demo.devai.co.za/commercial-solar.

Thanks,
John
```

## Slot-fill rules

| Slot | What to write |
|---|---|
| `<plain-language version of the recurring prospect question>` | Plain English, not jargon. Two related sub-questions joined by "and" reads naturally. Translate from the defuddle's SA-specific question into language a *prospect* would type, not a CCO. E.g., "should they sign a PPA or go capex, and which grid-code applies to their rooftop" not "NRS 097-2-1 parallel-coupling protection settings". |
| `<one short line that shows you know <Company>'s scale or content depth>` | Weave one concrete detail from defuddle that proves you've actually looked: number of divisions, named partner, named landmark project, employee count, number of case studies. One detail, woven into the sentence, not a list. |
| `<specific page/content area>` | Name an actual page or section from their site (Solutions page, Commercial page, Projects gallery, FAQ, O&M handbook). The prospect "reading a cited answer pulled straight from your own X" needs X to be real and findable on their site. |
| `<one specific high-value conversation type their senior staff want more of>` | What does their senior staff want MORE of, that the portal frees them up for? PPA structuring, technical design review for utility-scale, agri sizing site-visits, retainer scoping calls. Map to their wedge. |

## Voice rules (hard)

- **Zero em-dashes anywhere.** Period, comma, colon, parentheses, or restructure.
- **No intensifiers / aphorisms:** "really", "very", "far", "huge", "surprisingly", "simply", "actually", "The takeaway:", etc.
- **Bare URLs only.** No markdown link wrapping (`[text](url)` renders literally in plain-text mail).
- **No asterisks** for emphasis (renders literally).
- **Plain "Thanks,"** not "Thanks for the work,".
- **Subject:** keep the "A quieter inbox for the <Company> sales team" frame across the batch. Consistency matters if any prospects share employees.
- **No AI-attribution language** (no "Claude", "Anthropic", "generated with..."). The phrase "AI-assisted portals" is approved and intentional in body copy.

## When to use a different template

This template assumes:
- Content-heavy site with a real services / projects / FAQ surface
- 20+ employees so the "sales engineer at email number nine" picture is plausible
- B2B buyer with a sales-engineering function (not a transactional retail business)
- A named senior contact reachable by direct email

For thin-content sites, residential-only outfits, or aggregator businesses, drop them from the batch rather than re-voice the template. The drop list in `cold-batch-01-commercial-solar.md` shows the disqualification patterns.
