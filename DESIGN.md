---
name: Bianomics
description: A sharp editorial system on paper and near-black, textured with grain and halftone, where four practice colors work as a legend rather than a palette.
colors:
  bondi-blue: "#0094b3"
  accent-ink: "#00738b"
  accent-ink-deep: "#005b6e"
  first-love: "#ef4457"
  gooseberry: "#cfde56"
  trendy-orange: "#f28820"
  vision-ink: "#c43647"
  stage-ink: "#70782e"
  blueprint-ink: "#005b6e"
  groundwork-ink: "#ab6017"
  paper: "#ffffff"
  paper-subtle: "#f6f7f8"
  ink-canvas: "#060709"
  ink-text: "#0d0e11"
  ink-muted: "#444851"
  ink-subtle: "#626772"
  ink-inverse: "#f6f7f8"
  ink-inverse-muted: "#b8bcc4"
  hairline: "#d8dade"
  hairline-strong: "#b8bcc4"
  focus-ring: "#00849f"
  error: "#c43647"
  success: "#70782e"
typography:
  display:
    fontFamily: "Causten, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(3.25rem, 2rem + 6vw, 7rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Causten, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 1.9rem + 4.2vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Causten, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2.7vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Causten, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.22vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(0.875rem, 0.855rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
  quote:
    fontFamily: "HV Fitzgerald, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.7vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "normal"
rounded:
  hairline: "2px"
  card: "4px"
  field: "0.375rem"
  control: "0.5rem"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  "10": "8rem"
  section: "clamp(4rem, 2.5rem + 5.5vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.85em 1.5em"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-ink-deep}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.control}"
    padding: "0.85em 1.5em"
    height: "3.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.paper-subtle}"
    textColor: "{colors.ink-text}"
  field-control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.field}"
    padding: "0.75em 0.9em"
  chip-place:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.7rem"
  badge-lockup:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5em 1em"
  card-surface:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.card}"
  nav-shell:
    textColor: "{colors.ink-text}"
    rounded: "{rounded.control}"
    padding: "0.3rem"
  icon-button-round:
    textColor: "{colors.ink-text}"
    rounded: "{rounded.pill}"
    size: "2.75rem"
---

# Design System: Bianomics

## Overview

**Creative North Star: "The Drafting Room"**

Bianomics sells the layer underneath the visible result: *everything people notice about you was
decided somewhere they can't see*. The Drafting Room is that somewhere, made into an interface. The
page does not present conclusions the way a portfolio does; it shows the working surface where
conclusions get made. Sections carry numbers. Labels sit out in the margin in monospace, annotating
rather than announcing. Rules are single hairlines. The four practice colors behave like a legend on
a technical drawing: a color appears because the thing it marks belongs to that practice, never
because a card needed brightening.

The material is paper and ink, and it is never perfectly clean. A fine grain sits fixed over the
entire viewport so the page reads as a printed surface rather than a rendered one; a blue haze
occupies the right side of the light canvas; halftone dot screens fade in and out of section
transitions like a press screen. Depth is entirely honest — there are no shadows anywhere in the
system, and the shadow tokens were removed on purpose. What separates one plane from another is
canvas contrast and a 1px hairline, nothing else.

Type carries the authority. Headings run at a single weight (400) across the whole site and get
their hierarchy from size and negative tracking, which is why the display type reads as chiselled
rather than shouted. Two weights ship in total: 400 for everything read, 600 for small UI that has
to be picked out. Controls are quiet until touched — flat and still at rest, then answering
precisely: a 2px lift, an arrow that flies out of its badge while its twin flies in, glass chrome
that re-tints against whichever canvas has scrolled underneath it.

**Key Characteristics:**

- Paper is home; near-black is punctuation that has to earn its place.
- Zero shadows. Depth is canvas contrast plus one hairline.
- One weight for every heading (400). Size and tracking carry the hierarchy.
- Monospace is the margin voice, never the headline and never the body.
- Four practice colors used as a legend, one CTA color site-wide.
- Every surface is textured. A flat, clean plane is off-system.
- Sharp content surfaces (4px), blocky controls (8px), pills reserved for tags.

## Colors

Two-material palette — white paper and near-black ink — with a single blue that carries every call
to action, and four saturated practice colors that function as a coded index to the four labs.

### Primary

- **Bondi Blue** (`{colors.bondi-blue}`): the brand color and the logo dot. Used for decorative
  fills, large shapes, and the accent dot in the lockup badge. It reaches only 3.57:1 on white, so
  it never carries text or small UI on a light canvas.
- **Accent Ink** (`{colors.accent-ink}`): the darker step of the same blue ramp (5.49:1 on white).
  This is the working blue — every primary button background, every blue text accent, the ring on
  the "International" chip. When a design calls for "the blue," this is almost always the one.
- **Accent Ink Deep** (`{colors.accent-ink-deep}`): the primary button's hover state, and
  Blueprint's AA-safe text shade. The only blue below Accent Ink.

### Secondary

The four practices, each with a saturated fill and an AA-safe ink. The fill is for graphics, dots,
bars, and color-field panels; the ink is for text and small UI on white.

- **First Love** (`{colors.first-love}`) → **Vision Ink** (`{colors.vision-ink}`): Vision Lab.
  Story, brand, press, creative.
- **Gooseberry** (`{colors.gooseberry}`) → **Stage Ink** (`{colors.stage-ink}`): Stage. Events,
  launches, rooms. Also the Opportunity Lab accent.
- **Bondi Blue** → **Blueprint Ink** (`{colors.blueprint-ink}`): Blueprint. Systems, operations,
  project management. Blueprint shares the brand blue because Blueprint is the structural practice.
- **Trendy Orange** (`{colors.trendy-orange}`) → **Groundwork Ink** (`{colors.groundwork-ink}`):
  Groundwork™. Workforce development, regulation-first training.

### Neutral

- **Paper** (`{colors.paper}`): the default canvas and every card surface.
- **Paper Subtle** (`{colors.paper-subtle}`): the faint section tint that marks a canvas change
  without going dark.
- **Ink Canvas** (`{colors.ink-canvas}`): the near-black inverse canvas. Not pure black — it holds
  grain and photography without crushing them.
- **Ink Text** (`{colors.ink-text}`) / **Ink Muted** (`{colors.ink-muted}`) / **Ink Subtle**
  (`{colors.ink-subtle}`): the three-step reading hierarchy on paper. Subtle is where mono labels
  live.
- **Ink Inverse** (`{colors.ink-inverse}`) / **Ink Inverse Muted** (`{colors.ink-inverse-muted}`):
  the same two tiers on the dark canvas.
- **Hairline** (`{colors.hairline}`) / **Hairline Strong** (`{colors.hairline-strong}`): the only
  dividers in the system. On dark they become white at 14% and 28% alpha.

### Named Rules

**The Legend Rule.** The four practice colors are an index, not a palette. A color appears on an
element because that element belongs to that practice — a Groundwork case study is orange because
it is Groundwork, not because the grid needed variety. Never assign a practice color decoratively,
and never introduce a fifth.

**The Fill / Ink Rule.** Every practice color exists twice: `-fill` for shapes you look at, `-text`
for anything you read. Gooseberry and Trendy Orange fail AA on white outright. Setting text in a raw
brand color on a light canvas is a contrast bug, not a style choice.

**The One CTA Rule.** There is exactly one call-to-action color site-wide (`{colors.accent-ink}`),
and it is the darker ramp step rather than the raw brand blue, because the CTA has to carry white
text at AA. A second CTA color anywhere on the site is a defect.

**The Ink-on-Color Rule.** All four fills clear 5.8:1 against near-black, which is why a saturated
practice panel always takes ink type (`{colors.ink-canvas}` at full, 84%, and 82% alpha for the
three tiers) and never flips to white. Those alphas are set by the worst case — Vision red — where
anything lower drops below AA.

## Typography

**Display Font:** Causten (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Causten — the same family; this system does not pair a display face against a body face
**Label / Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo)
**Quote Font:** HV Fitzgerald (with Georgia, Times New Roman, serif)

**Character:** One geometric sans does nearly all the work, held at a single weight so the page
reads as one voice rather than a hierarchy of shouting. The monospace is a second voice used only in
the margin — counters, section markers, tags, metadata — which is what gives the page its drafting-
table quality. The serif is the rarest thing in the system, reserved for a single elevated moment.

### Hierarchy

- **Display** (400, `clamp(3.25rem, 2rem + 6vw, 7rem)`, line-height 1, tracking -0.04em): the page's
  single largest statement. Hero only. One per page.
- **Headline** (400, `clamp(2.75rem, 1.9rem + 4.2vw, 5.25rem)`, line-height 1.02, tracking -0.04em):
  major section openers — What We Do, How It Works, Results, the closing CTA.
- **Title** (400, `clamp(2.25rem, 1.7rem + 2.7vw, 3.75rem)`, line-height 1.06, tracking -0.03em):
  standard section openers.
- **Body** (400, `clamp(1rem, 0.96rem + 0.22vw, 1.125rem)`, line-height 1.5): all reading copy.
  Measure caps around 65–75ch; the stat labels run tighter at 22ch by design.
- **Label** (mono, 400, `clamp(0.875rem, 0.855rem + 0.1vw, 0.9375rem)`, tracking 0.12em, uppercase):
  the margin voice. Counters, section markers, tags, metadata, the lockup badge.
- **Quote** (serif, 400, `clamp(1.75rem, 1.4rem + 1.7vw, 2.75rem)`, line-height 1.16): elevated
  statements only.

### Named Rules

**The Single Weight Rule.** Every heading in the system is weight 400. Tiers are set by size, and
tracking tightens as size grows (-0.015em at 22–30px, -0.03em at 44–60px, -0.04em at 84–112px).
Bolding a heading to make it more important breaks the system — add a size step or tighten the
tracking instead. Only two weights ship: 400 for everything read, 600 for small UI that must be
picked out. 500 and 700 were retired deliberately and remain defined only so the tokens resolve.

**The Mono Margin Rule.** The monospace voice annotates; it never leads. It is allowed on counters,
section markers, tags, and metadata, and it sits in its own column. Never a headline, never body
copy, and never stacked directly above a title where it becomes an eyebrow.

**The 14px Floor Rule.** No text on this site is smaller than 14px, including mono labels and legal
copy. The floor was raised on purpose and it is why `xs` and `sm` sit unusually close together; they
stay separate steps because `xs` is the label size and `sm` is small copy.

## Layout

A single 1440px content maximum (`90rem`) with fluid gutters that run from 20px on a phone to 48px
on desktop (`clamp(1.25rem, 0.5rem + 3vw, 3rem)`). Prose and centered blocks narrow to 768px
(`48rem`). Vertical rhythm between top-level sections is one fluid value —
`clamp(4rem, 2.5rem + 5.5vw, 7.5rem)` — so the whole page's breathing scales together.

The spacing scale is a ten-step ramp from 4px to 128px, tightest at the bottom (4 / 8 / 12 / 16 /
24px) and doubling through the top (32 / 48 / 64 / 96 / 128px). Component internals live in steps
1–6; section-scale gaps live in 7–10.

Breakpoints are `min-width` and cluster at four real thresholds: **40rem** (640px, small tablet),
**48rem** (768px, the phone/desktop button behavior split), **52rem** (832px, the most common grid
change), and **60rem** (960px, the primary desktop layout). The nav takes its own at **62rem** where
its mobile shell dissolves. Mobile overrides are written as `max-width: 47.99rem` /
`61.999rem` to avoid overlapping the min-width rules.

### Named Rules

**The Shared Boundary Rule.** Where two same-canvas sections meet, both full paddings would stack
into a gap twice the intended size, so each halves its padding at the shared edge. Sections that
change canvas (`.section-tinted`, `.section-inverse`) are excluded — there the full padding gives
the color band room to breathe. This is automatic in `utilities.css`; do not hand-tune section
padding to compensate for it.

**The Tone Rule.** Components reference the contextual `--tone-*` roles (text, muted, subtle,
border), never absolute colors. That is what makes re-tinting a whole section from light to dark a
one-line class change instead of an edit to every color declaration in its module. Reaching past
`--tone-*` to an absolute color inside a component is how a section stops being re-tintable.

## Elevation & Depth

**There is no elevation in this system, and that is a decision rather than an omission.** The shadow
tokens were removed from the scale deliberately, with a comment saying not to reintroduce them.
Depth comes from two sources only: canvas contrast (paper against near-black against the faint
`{colors.paper-subtle}` tint) and 1px hairlines.

The one apparent exception is not one. `box-shadow` appears twice in the codebase, both times as a
3px focus ring around a form control (`0 0 0 3px` in blue-100, or red-100 when invalid). A ring is
state feedback, not elevation, and it has no blur and no offset.

The nav is the only element with any spatial trick at all: its floating shells use
`backdrop-filter: blur(14px)` over a translucent tint, which reads as glass rather than as a lifted
plane. It changes tint, not altitude.

### Named Rules

**The No-Shadow Rule.** No `box-shadow` with a blur or offset, anywhere, for any reason. If a
surface needs to separate from what is behind it, change the canvas or add a hairline. A card that
appears to float is off-system.

**The Hairline Rule.** The *divider* vocabulary is exactly one item: `1px solid` in
`{colors.hairline}` (or `{colors.hairline-strong}` when it needs to hold its own). No dashed rules,
no double rules, no 2px rules, no gradient dividers.

**The Practice Marker.** The one bar in the system that is not a divider: a 3px band across the top
edge of a media frame, filled with the practice colour of the work inside it. It appears on the
eight case-study frames and the four process step frames, and it is a legend mark rather than a
rule — which is why it is allowed a width the Hairline Rule forbids. Its bounds are exact: 3px, the
top edge only, a practice `-fill` colour only, and only on a frame whose content belongs to that
practice. An engagement that genuinely spans two practices splits the marker between them at a hard
stop, never a blend — a gradient between two coded colours reads as a third colour that means
nothing. Two is the limit. A coloured bar on any other edge, at any other width, or in any other
colour is the side-tab anti-pattern and is off-system.

## Shapes

Sharp editorial geometry, split by function. **Content surfaces are near-square** — cards, images,
panels, and media all take a 4px radius, just enough to avoid a hard mechanical corner without
reading as rounded. **Controls are blocky** at 8px (`0.5rem`): buttons, the nav shells, the floating
group. **Pills are reserved** for tags, chips, and round icon buttons, where the 999px radius marks
the element as a token rather than a surface. A 2px radius exists only for focus rings and
hairline-scale details, and form inputs take 6px (`0.375rem`), one notch softer than a button.

Borders are 1px almost everywhere. The two exceptions are load-bearing: form controls and the
secondary button use 1.5px, because at 1px a light stroke on a white plate visually disappears.

The recurring silhouettes are the hairline-bordered pill (the lockup badge, the place chips), the
inset square badge (the 2.5rem dark square that sits inside the primary button, carrying the arrow),
and the round 2.75rem icon button used for carousel controls.

### Named Rules

**The Surface / Control Split.** If you can read it, it is a surface and it is 4px. If you can click
it, it is a control and it is 8px. If it is a token or a tag, it is a pill. There is no fourth case;
a new radius value is almost always a mistake.

## Components

Every control follows one philosophy: **quiet until touched.** Flat and still at rest, then
answering precisely.

### Buttons

- **Shape:** blocky, not pill (8px / `{rounded.control}`).
- **Height:** every button stands exactly 3.5rem, stated once on the base class.
- **Primary:** Accent Ink background with white text, `0.85em 1.5em` padding. Hover deepens to
  Accent Ink Deep.
- **Secondary:** a filled white plate with ink text and a 1.5px hairline border — deliberately not a
  transparent outline, because both places it appears sit on the hero photograph where a hairline
  over a busy image disappears. Hover tints to Paper Subtle and strengthens the border. There is no
  separate inverse treatment; a white plate with ink on it reads correctly on either canvas.
- **Hover / Active:** `translateY(-2px)` on hover, back to 0 on active, at 160ms on the standard
  ease. Disabled drops to 0.55 opacity and kills pointer events.
- **Arrow variant:** a 2.5rem near-black square inset inside the button, holding two stacked arrow
  glyphs. On hover or focus the resting glyph flies out along its diagonal while its twin flies in
  from the opposite corner, over 640ms — slow on purpose, because at hover speed the travel does not
  read. Under reduced motion the twin is removed entirely rather than animated.
- **Mobile (below 48rem):** both variants go full width and the primary drops its arrow badge, since
  an inset square marooned at the far edge of a viewport-wide button is a long way from the words it
  belongs to.

### Inputs / Fields

- **Style:** white background, 1.5px hairline border, 6px radius, `0.75em 0.9em` padding.
- **Focus:** border shifts to blue-700 and a 3px blue-100 ring appears. The outline is removed only
  because the ring replaces it.
- **Error:** border and message both take `{colors.error}`; the focus ring switches to red-100. The
  error message itself is set at weight 600.
- **Select:** native appearance removed, with a CSS chevron built from two 2px borders rotated 45°.
- **Honeypot:** positioned off-canvas at `left: -9999px` and hidden from the accessibility tree.

### Chips / Tags

- **Style:** 1px hairline-strong border, pill radius, `0.35rem 0.7rem` padding, label-size type on a
  72% paper wash (`color-mix`) so a textured bed shows faintly through.
- **Signature use:** the place chips in the About stat card, where the last chip —
  "International" — takes the accent color on both border and text, because it is not a place, it is
  the rest of the world.

### Cards / Containers

- **Corner Style:** 4px.
- **Background:** paper on light, or the section's own bed on dark.
- **Shadow Strategy:** none — see Elevation & Depth. Separation is a hairline.
- **Internal Padding:** spacing steps 5–7 (24–48px) depending on card scale.

### Navigation

Fixed floating chrome with no bar: the header spans nothing, and the visible elements are two
independent glass shells (logo, and a group holding links plus CTA), each with a translucent tint, a
1px border, and `backdrop-filter: blur(14px)`. Below 62rem they merge into one shell holding logo,
CTA, and toggle; above it, the shell dissolves via `display: contents` and hands its children back
to the flex row.

The nav observes the canvas beneath it and flips tone (`.onDark` / `.onLight`) with a full set of
per-tone custom properties, transitioning tint, border, and ink over 280ms. Two logo lockups ship
and one is hidden per tone, because the full-color mark is black type with a Bondi dot and a filter
inversion would take the dot orange.

### Texture Beds

The signature surface component. Four bed classes (`.bed-haze`, `.bed-dark`, `.bed-halftone`, plus
the page-level grain) share one strict contract: a `::before` pinned to the element at `z-index: -1`
inside an isolated stacking context, with `pointer-events: none`. Strength is set through a
`--bed-opacity` custom property rather than a selector override, because CSS Modules load in
nondeterministic order and anything set by selector would win or lose by chance.

The halftone takes its color from `currentColor`, so a section tints its dot screen to any practice
color simply by setting `color` on the bed, and a mask fades it out so it reads as a transition
rather than a pattern fill.

### Named Rules

**The Matched Height Rule.** Every button is 3.5rem tall, stated on the base class rather than
patched per variant, so a primary and a secondary side by side always align — arrow or no arrow.

**The Decorative-Only Rule.** Nothing in the texture layer may carry meaning, and nothing may sit
above content or intercept a click. A bed is always `z-index: -1` and always `pointer-events: none`.

**The Tooth Rule.** Grain is meant to be felt, not seen. It is held at 0.035 opacity and must never
exceed roughly 0.06, above which it reads as noise sitting on the type rather than as tooth in the
paper. It is fixed to the viewport, not scrolled with content, and it deliberately carries no blend
mode — a full-viewport blended layer would force the entire page to composite.

## Do's and Don'ts

### Do:

- **Do** start a new section on paper. Light is home; the near-black canvas is punctuation that has
  to earn its place, and it gets full section padding on both sides when it appears.
- **Do** set every heading at weight 400 and build the tier from size plus tracking.
- **Do** reach for `--tone-*` inside components so the section stays re-tintable with one class.
- **Do** put a texture on every surface. A flat, clean plane is off-system — pick the bed that fits
  (haze on light, one of the three dark grains on the inverse canvas, halftone on a transition).
- **Do** use a practice color only where the content genuinely belongs to that practice, and take
  the `-text` step whenever the color carries type on white.
- **Do** keep the monospace out in the margin, at 14px or above, uppercase, tracked at 0.12em.
- **Do** separate planes with a single 1px hairline or a canvas change.
- **Do** extend the reveal grammar to new surfaces, on the editorial easing
  (`cubic-bezier(0.16, 1, 0.3, 1)`) for long settled reveals and the standard curve
  (`cubic-bezier(0.22, 1, 0.36, 1)`) for state changes — always with a `prefers-reduced-motion`
  path.

### Don't:

- **Don't** add a `box-shadow` with blur or offset. The tokens were removed on purpose; a floating
  card is off-system.
- **Don't** bold a heading to raise its importance, and don't reach for weight 500 or 700 — both are
  retired and currently unreferenced anywhere in the codebase.
- **Don't** put a hex value in a component. Only `tokens/palette.css` holds hex; the guard is
  `grep -rEn '#[0-9a-fA-F]{6}' src/components` returning nothing.
- **Don't** set text in Gooseberry or Trendy Orange on a light canvas. Both fail AA outright.
- **Don't** introduce a second CTA color, or a fifth practice color.
- **Don't** stack a mono label directly above a title as an eyebrow. It belongs in the margin, in
  its own column.
- **Don't** drift toward the SaaS startup template: rounded-everything, purple-to-blue gradients,
  shadow-lifted cards on gray, or emoji feature icons.
- **Don't** drift toward agency showboating: gradient meshes, glow effects, autoplay hero reels, or
  any gesture whose subject is the firm's own taste.
- **Don't** drift toward corporate consultancy: navy-and-gray, stock handshake photography, or dense
  justified body copy where a story belongs.
- **Don't** drift toward brutalism: unstyled system fonts, harsh borders, or layout as provocation.
  This system's restraint is care, not a stunt.
- **Don't** add a new radius value. Surfaces are 4px, controls 8px, tags are pills; there is no
  fourth case.
