---
target: src/app/page.tsx
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-21T13-57-53Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a20ce08c3ea0d4a12 · B: a67283b2297a96fab) — parallel, isolated, live at localhost:3000.

Target: src/app/page.tsx · Mode: Persuade · Inspected at 1440x900, 390x844, 360px, 320px.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 24 desktop / 31 mobile screen-lengths, zero position feedback. Nav IntersectionObserver only flips tone; no aria-current, no active section. |
| 2 | Match System / Real World | 3 | "Get in touch" in the FAQ routes to a 6-field application, not a contact route. |
| 3 | User Control and Freedom | 1 | 4.5 viewport-heights of pinned scroll for 4 cards, unskippable. Nothing links to #snapshot. |
| 4 | Consistency and Standards | 1 | Five verbs for one action (Book x6 / Apply / Start / Get in touch / Apply Now). Four H2 treatments: 84px, 60px, 52px, 15px mono. |
| 5 | Error Prevention | 3 | 7/7 fields required incl. two essays; no required legend, no length guidance, no time cost. |
| 6 | Recognition Rather Than Recall | 2 | Four practice colors act as a legend across five sections; the legend is never printed. |
| 7 | Flexibility and Efficiency | 3 | Nav CTA is a real one-click path, undercut by being a self-link on /snapshot. |
| 8 | Aesthetic and Minimalist Design | 3 | System real and largely honored, but void-heavy: ~400px hero dead zone, ~250px hole in each of 8 case rows. |
| 9 | Error Recovery | 3 | Strong wiring, undone by seven simultaneous role="alert" regions and no error summary. |
| 10 | Help and Documentation | 3 | Well-placed FAQs, but one answer is a marked placeholder shipped live. |
| **Total** | | **24/40** | **Acceptable — significant improvements needed** |

All ten heuristics applied. 24/40 = 60%.

## Design Specificity Verdict

LLM assessment: specificity sits in the wrong half. Evidentiary surfaces are unfakeable (8 case rows with real composed artwork, the 8-markets figure on survey-map texture, "International" ringed in accent because it isn't a place). The conversion machinery is generic: scroll-jacked carousel, checkmark comparison table, headshot rail, road-photo closing band. North star is "The Drafting Room" — the working surface — yet the page never shows a Bianomics working artifact, only finished client deliverables. The Snapshot is described nine times and shown zero times.

Deterministic scan: detect.mjs on src returned 10 findings; only 2 survive inspection.
- 6 design-system-color hits are #000 as an alpha stop inside mask-image (opacity channel, never paints). FALSE.
- 1 design-system-font hit is inside a transactional email body at src/lib/deliver.ts:57 where system-ui is correct. FALSE.
- 1 side-tab hit at src/components/form/SnapshotForm.module.css:59 is a rotated two-border checkmark glyph. FALSE.
- 2 TRUE: 3px practice-color stripes at src/components/sections/HowItWorks.module.css:171 and src/components/sections/Results.module.css:88. The in-browser detector flagged the Results one 8x live, so it is visible, not dead CSS. Deliberate coding, but a third rule width in a system whose DESIGN.md names one (1px).

In-browser scan: 28 flagged elements / 30 findings. Dominant family is 14 tight-leading hits (1.16 line-height on reading copy; >=1.3 wanted) across Hero .clarifier, all four WhyDifferent rows, Snapshot .point, Founder .quote, FAQ questions. Plus 3 all-caps-body (Results client/category, 32-35 chars) and 3 line-length (~85ch, Founder paragraphs).

Disagreement resolved: A flagged nav/footer links as WCAG 2.2 AA 2.5.8 target-size failures. B measured footer rows 36.3px apart vertically, 63.2px and 97.0px horizontally, zero pairs closer than 24px — AA spacing exception satisfied. 17 elements under the 44x44 comfort bar, none fail AA. B's measurement wins.

## Overall Impression

The system is better than the page. The token layer is excellent; the landing page violates it in five measurable places while burying its own conversion path under 18 screens. Biggest opportunity: the page is built for a cold visitor and sold to a warm one. PRODUCT.md says the job is confirmation, not category education — yet it runs 24 screens, spends 4.5 viewport-heights on four practices before the visitor has a reason to care, and defines "Snapshot" (in the nav at pixel zero) at screen 17.9.

## What's Working

1. The Results rows are the argument and they land. Full-width row, square mockup left, copy right, hairline between. Real composed artwork. Mono service pills plus the practice-color rule make each row read as a filed drawing. The Drafting Room premise actually delivered.
2. The form's failure handling beats most production forms. Verified: all 7 fields get aria-invalid + aria-describedby resolving to real role="alert" nodes with human copy; focus moves to first invalid field in DOM order; on partial fix attributes are correctly cleared on now-valid fields and focus advances. Honeypot properly hidden from AT.
3. The accessibility floor is solid: 33 headings, exactly one h1, zero skipped levels; 39 images, zero missing alt; all 15 tested tab stops have a visible focus indicator; zero horizontal overflow at 390px and 360px.

## Priority Issues

[P0] Hero's primary CTA invisible on first load at both widths.
Hero.module.css:4 (min-height: 100svh) + :76 (justify-content: space-between) pin the CTA row to the viewport floor; CookieBanner.module.css:4 (position: fixed; bottom: 0) covers it. Hero CTA at 0.88 screens desktop / 0.90 mobile; banner ~185px, ~22% of an 844px viewport. A Persuade surface opens on a frame with no way to act; the only visible CTA is a 40px nav button.
Fix: collapse hero to min-height: min(100svh, 46rem), move the CTA row up under the clarifier (the ~400px void does no work); give the banner a compact corner treatment so it never shares a band with a primary action.
Command: /impeccable layout

[P0] At 320px the mobile menu cannot be opened.
button[class*="menuToggle"] measured at left: 324.3, right: 364.3 against a 320px viewport — the whole 40x40 hamburger is past the right edge, and base.css:34 overflow-x: clip means it is cut off, not scrollable to. Root cause: .shell clientWidth 278 vs scrollWidth 343; logo (125.8px) + actions (191.1px) neither shrink. Page overflow at 320px is 22px; Team .controls drives the rest. Navigation is completely unreachable at 320px. The only task-blocking defect on the page.
Command: /impeccable adapt

[P1] The conversion path exists twice and the in-page copy is orphaned.
All eight conversion links use href={routes.snapshot} -> /snapshot. anchors.snapshot (src/lib/routes.ts:16) is defined and referenced by nothing, while src/app/page.tsx:33 renders 1,226px of <Snapshot> — heading, reassurance bullets, and a complete duplicate SnapshotForm — reachable only by scrolling past it. Two copies of the most important interaction; the one built into its own page is unreachable by any link, and its conversion is unmeasurable.
Fix: pick one. Either point in-page CTAs at #snapshot and make /snapshot referral-only, or delete the section and keep its reassurance copy as a lead-in band.
Command: /impeccable distill

[P1] The form's ask contradicts the page's own promise.
Seven required fields including two 4-row essays and a screening select serving Bianomics, not the visitor. No required legend, no length guidance, no time cost. src/content/snapshotPage.ts says "Nothing formal. A link to your site or socials... is enough" — and the form never asks for the link. The page says free/no-obligation nine times, then presents two blank essay boxes.
Fix: make biggestChallenge optional, drop or optionalize the agency-history select, add the site-link field the copy promises, and put "About 3 minutes · Bianca reads every one · Reply in 3 business days" directly above submit, not in a column that scrolls away on mobile.
Command: /impeccable clarify

[P1] 4.5 viewport-heights of pinned scroll to show four cards, no escape.
WhatWeDo.module.css:71 — height: calc((var(--slides) + 0.5) * 100vh). Sits at screen 2.1, before the visitor has a reason to invest. Neighbouring cards bleed in at both edges so three practice colors are always on screen, destroying the legend reading the color system depends on. Mobile already falls back to a stack, proving the stack suffices. ~3,000px of the page's most expensive real estate on a gesture DESIGN.md forbids.
Command: /impeccable distill

## Where the Code Contradicts Its Own DESIGN.md

- [P2] One real WCAG AA contrast failure: stage-ink #838d37 on white measures 3.54:1 (token math 3.60) on the HowItWorks step numeral "02". Needs 4.5. All other sampled pairs pass; 26 initial false failures were traced to mid-scroll and mid-crossfade sampling and ruled out.
- [P2] A 15px mono h2: HowItWorks.tsx:33 renders "Our process" as the section h2 at --text-xs mono uppercase. The section has no visible heading; its largest text is a body paragraph. Violates the Mono Margin Rule.
- [P2] Sixteen H3s at weight 600 (Results, HowItWorks, WhoWeWorkWith at 30px/600) alongside four at 84px/400 — two type systems at one outline level. Violates the Single Weight Rule.
- [P2] A blurred offset shadow: CookieBanner.module.css:12, box-shadow: 0 -12px 32px rgb(6 7 9 / 0.08). Violates the No-Shadow Rule, the system's first stated invariant.
- [P2] 14 tight-leading hits: --leading-snug (1.16) applied to reading copy where the system intends it for headings.

## Persona Red Flags

Jordan (Confused First-Timer): lands on a viewport with no visible CTA. "Snapshot" is a capitalized proper noun in the nav at pixel zero, undefined until screen 17.9. Clicks the six About capability pills and 24 underlined lab subservices — all 73 are inert <li>s wearing control affordances. Reads "RESONATE" over "Stage" with no gloss. The button says Apply, not Book, newly implying rejection at the moment of commitment.

Riley (Deliberate Stress Tester): empty submit fires seven role="alert" regions simultaneously — seven interrupting announcements with a screen reader, one visible error and no summary with eyes. Opens the mobile menu while parked on the Vision Lab card: the glass backdrop-filter renders the sheet as a pink wash with the red card bleeding through; nav has .onDark/.onLight and no onColor case. Clicks "Book a Snapshot" while on /snapshot: self-link, reload, form not focused. Finds primaryHref={routes.snapshot + '#top'} with no id="top" anywhere in the codebase. FAQ shows a marked placeholder as the published answer to the question a buyer most wants answered.

Casey (Distracted Mobile User): 31.5 screen-lengths; Results alone is 8,221px = 9.7 mobile screens. Eleven screens with no CTA between why-different (11.8) and form submit (24.5). Reassurance bullets stack above the form and scroll away. On the closing band the primary drops its arrow badge below 48rem, leaving two identical full-width rectangles where "See what we do" carries equal weight to the conversion action.

Dana (the Warm Referral) — project-specific, from PRODUCT.md: executive director of a purpose-driven nonprofit, introduced by a peer, arriving 80% sold, needing confirmation not education. Red flags: handed 24 screens of category explanation she does not need; the first three case studies are all Groundwork/workforce while she is a comms buyer whom the form asks about her "communications or brand challenge"; she scrolls past thirteen strangers on a team rail placed after the form; and via the Opportunity Lab path she lands in a commercial intake form with no way to say she cannot afford the work.

## Minor Observations

- The only third-party validation the firm owns is not on the site. TrustStrip.tsx renders TEDC/IEDC/NAWB and is imported by no page; Hero.tsx:69-72 notes the recognition row is "temporarily out at Pavle's request." With testimonials: [], every credibility claim on a 24-screen page is Bianomics narrating Bianomics. That, not the missing quotes, is the actual proof gap.
- Results carries its weight on evidence, not on voice. Eight named clients with real artwork beats anonymized quotes, but all eight are narrated in first person — 5,940px of the seller talking. Cheapest repair is "Reference available on request" per row, or restoring the three recognition marks. Both true today.
- 23 of 39 images carry alt=""; six are correctly decorative, 17 are arguably content (4 practice media, 7 Results project visuals, 4 process step images).
- Lab cards carry href: '#what-we-do' — a link to the section you are inside. Unrendered now, a Phase 2 footgun.
- The About h2 is a full sentence of body prose, which becomes the section's accessible name in the landmark outline.
- No draft persistence on the form; a mistaken back-navigation after ten minutes of essay-writing loses everything.

## Questions to Consider

1. What if the Snapshot were shown instead of described? One redacted spread would do more than the entire 5,940px Results section, and it is the only asset a competitor structurally cannot fake.
2. Why does a page for an already-referred visitor run 24 screens? If you cut to Hero -> the one differentiator -> three case studies -> form, what breaks?
3. Should the practice colors be a legend at all if the legend is never printed? Print the key once (~80px), or accept they are decorative and stop paying the consistency cost.
4. What would make the form feel like a conversation with Bianca rather than an application? Her portrait is already in the repo and already used in Founder.tsx.
