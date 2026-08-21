# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: the decision-maker at a purpose-driven organization who is already warm.** They lead a
social-impact nonprofit, a workforce board, a school district, a civic institution, or a
mission-driven employer. They arrive mostly by referral — a conversation with Bianca, a panel, a
partner introduction, a recommendation from another client — not from cold search. They are not
discovering the category on this page; they are deciding whether this specific firm is worth a
first real conversation. Their job on the site is narrow: decide, then request a free Snapshot.

**Second audience, named on the site but converting elsewhere: organizations and career seekers
served by Groundwork.** Workforce programs (Beyond Duty and the rest) are presented on the page,
but participants apply through the program's own off-site form, not the Snapshot flow. The site
speaks about this audience more than it speaks to it.

## Product Purpose

Bianomics is a human systems company. It brings strategy, story, people, and operations into one
coherent system so ambitious work can earn belief, build momentum, and last. Four connected
practices deliver that, plus a nonprofit arm that funds the same work for organizations that could
not otherwise afford it.

The site is currently **Phase 1: a single production-quality long-scroll landing page, live and
iterating.** Its one job is converting a warm visitor into a submitted Snapshot request. Success is
a submitted Snapshot, not time on page and not traffic. Sections were built to lift into a Phase 2
multi-page site; the route map for that expansion is already recorded in `src/lib/routes.ts` and
the Phase-2 nav links are authored and hidden behind `phase2Only`.

## Positioning

The locked framing: *"Everything people notice about you was decided somewhere they can't see.
That's where we work."* Bianomics sells the layer underneath the visible output, not the output.

The structural moat is the combination, and no neighboring firm can truthfully copy it: a strategic
communications practice, a nervous-system-informed workforce development practice with owned
curriculum and a proprietary assessment, and a nonprofit funding arm — all under one roof, feeding
each other. `_source/Bianomics-Competitor-Landscape.md` documents the field: none of the four real
El Paso / Borderplex competitors (Sanders\Wingo, Mithoff Burton, CultureSpan, EFO Media) has an
events vertical, an owned training curriculum, or a nonprofit funding structure. CultureSpan is the
closest analog on the comms half alone.

Three further claims a competitor structurally cannot make:

- **The team that scopes the work builds it.** No sell-team / build-team handoff.
- **Built to run without them.** The engagement is designed to make Bianomics unnecessary; most
  partners keep them anyway.
- **Methodology as IP.** Nervous-system regulation as the first step of workforce training —
  the step every other program skips, and the stated reason the rest of the training sticks.

The site's job is to make that structural difference *visible* rather than to claim "different."

## Operating Context

**The Snapshot** is the entire conversion mechanism. It is a complimentary, straight read of a
prospect's communications or brand position, done by the team they would actually work with. A
limited number are taken each month because each is reviewed personally; every submission goes to
Bianca directly, and a fit gets a reply within three business days. Mechanically: the form posts to
`/api/snapshot`, which delivers through the `deliverSnapshot` seam (Resend today, swappable for a
CRM).

**The four practices** are Vision Lab (mode: Express), Stage (Resonate), Blueprint (Structure), and
Groundwork™ (Regulate). **Opportunity Lab is the nonprofit arm and is not a lab** — it has its own
section and its own color treatment, and conflating it with the four is a factual error, not a
stylistic one. Groundwork's programs are Beyond Duty (veteran workforce readiness), Bridge
(emotional intelligence and regulation), Agent Z (AI operator training), Builders (trades
apprenticeship), Money with Purpose (bilingual financial literacy), and PowerPrint (the proprietary
Career DNA assessment).

**Time-bound content** exists on the page. The program banner (a Beyond Duty cohort) is authored as
a single removable block precisely so it comes off the page when the cohort closes rather than
going stale.

**Content is read through accessors**, never imported raw: `src/content/index.ts` is the seam, and
its return types are the contract. Phase 2 swaps each accessor body for a Sanity GROQ fetch with no
component changes. PostHog carries typed event wrappers, consent handling, and a cookie banner.

## Capabilities and Constraints

Live surfaces: the landing page, `/snapshot`, `/privacy`, `/terms`, and a 404. Everything below
`snapshot` in `routes.ts` is Phase 2 and not yet built.

Factual constraints future work must preserve:

- **Locked brand language in `src/content/site.ts` is used verbatim and never paraphrased.** The
  anchor, descriptor, tagline, framework, eyebrows, and clarifier are approved copy, not drafts.
- **Reach is "eight markets," never "eight states."** The footprint is seven states plus
  Washington D.C., a federal district. A states count would be a false public claim.
- **Groundwork™ carries the only trademark.** The other three practices held it provisionally and
  no longer do.
- **The word "senior" was removed from the site** by client instruction. Do not reintroduce it.
- **No hardcoded hex in components.** Only `src/app/tokens/palette.css` holds hex; components
  consume semantic tokens. The guard is `grep -rEn '#[0-9a-fA-F]{6}' src/components`, which must
  return nothing.
- **`src/content/types.ts` is the authority** for every editable piece of the page.

Explicitly undecided, recorded rather than invented:

- The final answer to the "what size organizations do you work with" FAQ is pending the founder's
  confirmation. The current copy is a marked placeholder.
- The international-reach claim in the location FAQ is pending Bianca's confirmation before it can
  be treated as published truth.
- All copy on the standalone `/snapshot` page (`src/content/snapshotPage.ts`) was written in-house
  and is pending the founder's pass. Unlike `site.ts`, it is **not** locked language — treat it as
  draft until confirmed.
- Font license confirmation for Causten and HV Fitzgerald was logged as a pre-launch open item and
  is not confirmed in this record.

## Brand Commitments

- **Name:** Bianomics. Self-described as "The Anti-Agency."
- **Voice:** plain owner language. Direct, unhedged, no spin, no agency abstraction. The site's own
  principle is to state the approach simply.
- **Typefaces, with fixed roles:** Causten for everything structural; HV Fitzgerald reserved for
  pull-quotes and elevated statements only; JetBrains Mono reserved for section counters, margin
  labels, tags, and metadata — never headlines, never body copy.
- **No weight above 700 is ever set.** Causten 800 is deliberately not loaded; hierarchy comes from
  size and tracking, not weight.
- **Contact facts:** hello@bianomics.com · (915) 252-0712 · academy.bianomics.com · LinkedIn ·
  YouTube. Founder: Bianca Cervantes.
- Logo files live in `public/`. Sourcing the official set was logged as a pre-launch open item.

## Evidence on Hand

**Real and usable:**

- **Eight case studies** with named clients, verbatim client-supplied copy, and artwork present in
  `public/results/`: Groundwork Youth Program, Beyond Duty, Workforce Solutions Borderplex, The
  Challenge Foundation El Paso, El Paso Leadership Academy, ReadyOne Industries, Way Out West, and
  Driven Against Silence.
- **Thirteen published team members** with real headshots in `public/team/` and bios taken verbatim
  from the client's documents.
- **Recognition marks:** TEDC, IEDC, NAWB.
- **Competitor research:** `_source/Bianomics-Competitor-Landscape.md`.

**Absences that must not be filled by invention:**

- **There are no testimonials.** `results.testimonials` is an empty array by design and stays empty
  until approved quotes land. Never author a quote, an attribution, a role, or a star rating.
- **There is no pricing, no benchmark, and no client metric** anywhere on the site. Do not
  introduce one.
- **Leila Azzam** is authored in `teamPending` and unpublished because her headshot is outstanding.
- Never point a case study at another engagement's image, and never fall back to another person's
  photo under a name.

## Product Principles

1. **One page, one action.** Every section either moves a warm visitor toward a submitted Snapshot
   or earns its place by removing a specific hesitation. Nothing is on the page to be thorough.
2. **Warm, not cold.** The visitor has usually already been introduced. The page's job is
   confirmation and conviction, not category education — resist copy that explains from zero.
3. **Locked language is not raw material.** Approved copy gets reset, re-typeset, and re-sequenced,
   never rewritten. Ask before changing a factual claim or adding one.
4. **Show the structure, don't claim the difference.** The 4+1 architecture, the single team, and
   the regulation-first method are the argument. "Different" asserted in prose is not.
5. **Absences stay visible as absences.** Empty testimonials, a missing headshot, a pending FAQ
   answer — these render as honest gaps or not at all. Fabricating proof is the one unrecoverable
   failure for a firm selling trust.
6. **Built to lift.** Sections are constructed so Phase 2 can promote them to their own routes
   without a rebuild. Tokens, content accessors, and the route map are the seams that make that
   true.

## Accessibility & Inclusion

**WCAG 2.2 AA is the self-imposed target**, not a contractual or procurement requirement. It is the
floor for contrast, focus visibility, and keyboard paths on every surface.

Motion already honors `prefers-reduced-motion` across the token layer, the `Reveal` wrapper, the
`Intro` sequence, and individual components; that behavior is a commitment, not an implementation
detail to be traded away.
