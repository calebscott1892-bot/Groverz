# Groverz Tax & Accounting — Visual & UX Style Guide

## 1. Design Theme: "Steady-Hand Professional"

**In one line:** Authoritative navy depth, grounded by warm parchment tones, punctuated by a single decisive red action colour.

This is not corporate polish and it's not startup whimsy. The visual language says: *"I know what I'm doing, and I respect your time."* The feel is closer to a trusted solicitor's office than a tech company — clean surfaces, warm lighting, no visual noise.

### Why this works for a local tax practice

Tax is an anxiety-laden topic for most people. The design must do two things simultaneously:

1. **Signal competence** — you need to trust this person with your financial data.
2. **Signal approachability** — you need to feel okay calling with a "dumb question."

Navy and cream solve both. Red gives the visitor somewhere to click when they're ready.

### Real-world inspiration

| Reference | What to learn from it |
|---|---|
| **Bench.co** (bookkeeping SaaS) | Uses deep navy + warm tones. The restraint in colour makes CTAs unmissable. Section rhythm alternates light/dark consistently so visitors always know "where they are" on the page. |
| **Pilot.com** (accounting for startups) | Clean card layouts, generous whitespace, single accent colour. Services explained through human outcomes, not feature lists. |
| **Wealthsimple.com** | The gold standard for financial services UX — warm neutrals, editorial typography, breathing room. Every element earns its space. Proves you can feel premium without being corporate. |
| **H&R Block Australia** (counter-example) | Over-saturated green, cluttered layouts, banner ads competing with CTAs. This is what Groverz should look *nothing* like — it's what people are relieved to escape when they find a local practice. |

---

## 2. Colour Palette

### Primary Colours

| Token | Hex | HSL | Role | Reasoning |
|---|---|---|---|---|
| **Navy** | `#1e1b4b` | `243° 47% 20%` | Headings, header/footer, hero backgrounds, trust elements | Deep indigo-navy is authoritative without being cold. It's distinctly *not* black (warmer, more human) and *not* corporate blue (too common, too generic). This specific hue has enough violet to feel unique to Groverz. |
| **Navy Mid** | `#312e81` | `243° 47% 34%` | Gradient stops, hover states on navy, estimator tool background | Provides tonal lift in dark sections. Used sparingly in gradients — never as a flat background on its own. |
| **Action Red** | `#b91c1c` | `0° 73% 42%` | CTA buttons, eyebrow labels, icon tints, links, interactive accents | A *restrained* red — not fire-engine, not neon. Sits at 42% lightness so it reads as confident, not alarming. This is the only warm saturated colour in the palette, which makes every CTA magnetically prominent. |
| **Red Hover** | `#991b1b` | `0° 70% 35%` | Button hover/active states | 7% darker for clear tactile feedback on press. |

### Neutral Surfaces

| Token | Hex | Role | Reasoning |
|---|---|---|---|
| **Parchment** | `#faf8f4` | Alternating section backgrounds (`section-cream`) | Warmer than `gray-50` (`#f9fafb`). The yellow undertone (`f4` blue channel) creates a paper-like warmth that makes the site feel lived-in rather than templated. Inspired by Wealthsimple's warm neutral palette. |
| **White** | `#ffffff` | Card surfaces, form backgrounds, primary content areas | Pure white only on surfaces that "sit on top" of parchment. Creates clear visual layering without needing heavy shadows. |
| **Warm Gray 50** | `#f8f5ef` | PhotoPlaceholder background, inset callout cards | A distinct "craft paper" tone for special elements that need to feel artisanal — the founder card, credential badges. |

### Text Hierarchy

| Usage | Colour | Opacity/Variant | Reasoning |
|---|---|---|---|
| Headings | `#1e1b4b` (navy) | 100% | Headings in brand navy instead of black creates cohesion. The slight blue warmth reduces harshness on white/cream backgrounds. |
| Body copy | Tailwind `gray-600` | `#4b5563` | Standard readable gray. High enough contrast for accessibility (WCAG AA on white), soft enough to not compete with headings. |
| Supporting / secondary | Tailwind `gray-500` | `#6b7280` | Service card descriptions, form hints. Clearly subordinate to body. |
| Micro labels / eyebrows | `#1e1b4b` at 45–60% opacity | e.g. `text-[#1e1b4b]/55` | The opacity approach (rather than a separate gray) keeps labels tonally connected to the brand navy. |
| On navy backgrounds | `white` at 60–80% | e.g. `text-white/70` | Body text on dark sections. 70% prevents harsh contrast while maintaining readability. |

### Semantic / Utility Colours

| Colour | Usage | Source |
|---|---|---|
| Amber 400–500 | Warning states (penalty notice, stars, urgency callouts) | Tailwind `amber-400`/`amber-500` |
| Green 100/600 | Success states (form confirmation) | Tailwind `green-100`/`green-600` |
| Red 50/200/700 | Error states (form validation) | Tailwind `red-50`/`red-200`/`red-700` |

### Colour rules

1. **Red is only for actions and attention markers.** Never use `#b91c1c` for decorative purposes, backgrounds, or large surface areas.
2. **Navy headings, never black.** All `h1`–`h4` elements use navy. This single rule creates more brand consistency than any other.
3. **No more than 3 background surfaces per page:** white → parchment → navy. Alternate in rhythm. If a section is white, the next should be cream or navy. Never stack two of the same.
4. **Opacity for hierarchy, not new colours.** On dark backgrounds, use `white/40`, `white/60`, `white/70`, `white/80`, `white/90` — not new grays.

---

## 3. Typography

### Font Stack

```css
/* Current — Tailwind default (system fonts) */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**This is deliberate, not lazy.** System fonts:
- Load in 0ms (no font flash, no layout shift)
- Feel native and trustworthy on every device
- Perform exceptionally on mobile connections (important for Perth locals on the go)

If a custom font is ever introduced, consider **Inter** (geometric clarity, excellent at small sizes) or **DM Sans** (slightly warmer geometry, good for approachable professional brands). Avoid serif fonts — they add formality that contradicts the "call Ankit directly" brand voice.

### Type Scale

| Element | Size (mobile → desktop) | Weight | Tracking | Leading | Usage |
|---|---|---|---|---|---|
| **Hero H1** | `text-4xl` → `text-5xl` → `text-6xl` | `font-bold` (700) | `tracking-tight` (-0.025em) | `leading-tight` (1.25) | One per page, max. The negative tracking at large sizes prevents letters from feeling disconnected. |
| **Section H2** | `text-3xl` → `text-4xl` | `font-bold` (700) | `tracking-tight` | Default | Main section headings. Always preceded by an eyebrow label. |
| **Card / Subsection H3** | `text-lg` – `text-xl` | `font-semibold` (600) | Default | Default | Service titles, FAQ questions, card headings. |
| **Eyebrow labels** | `text-sm` or `text-xs` | `font-semibold` (600) | `tracking-wider` (0.05em) or `tracking-[0.24em]` | Default | Always uppercase. Always in red (`text-[#b91c1c]`). Precedes every H2. Functions as a section category marker. |
| **Body** | `text-base` or `text-lg` | `font-normal` (400) | Default | `leading-relaxed` (1.625) | The generous `leading-relaxed` is critical — tax/accounting content is dense by nature. Line spacing lets it breathe. |
| **Small / supporting** | `text-sm` | `font-normal` | Default | `leading-relaxed` | Card descriptions, form hints, secondary copy. |
| **Micro** | `text-xs` or `text-[11px]` | `font-semibold` | `tracking-[0.24em]` | Default | Uppercase metadata labels (e.g., "PRINCIPAL / FOUNDER", "OFFICE LOCATION"). The extreme tracking at tiny sizes ensures legibility. |

### Typography rules

1. **Every section heading (H2) gets an eyebrow above it.** Format: `<p class="text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">LABEL</p>` then `<h2>`. This creates a consistent visual rhythm and helps scanners understand page structure.
2. **`tracking-tight` only above `text-3xl`.** At smaller sizes, negative tracking hurts readability.
3. **`leading-relaxed` on all body text.** Non-negotiable. The extra line-height is what keeps dense service/tax content from feeling suffocating.
4. **Never use `font-light` or `font-thin`.** These weights break down on Windows ClearType rendering and undermine the trustworthy feel.
5. **Max content width: `max-w-3xl` for body text paragraphs.** Lines beyond ~75 characters per line degrade reading speed.

---

## 4. Spacing System

### Vertical section rhythm

```
Section padding:  py-16 (mobile) → py-20 (desktop)
                  = 64px → 80px
```

This is the heartbeat of the page. Every `<section>` uses `py-16 sm:py-20` consistently. The predictability is the point — visitors subconsciously learn the rhythm, and each new section "arrives" at the expected interval.

**Exception:** Stats bar and warning bar use `py-5`–`py-8` (compact utility sections don't need full padding).

### Container

```
mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
```

- `max-w-7xl` = 1280px — wide enough for 4-column grid, narrow enough to prevent content from feeling lost on ultrawide displays.
- Horizontal padding: 16px → 24px → 32px. Mobile gets tighter padding; desktop gets breathing room.

### Component spacing

| Pattern | Value | Usage |
|---|---|---|
| Section heading → content | `mb-10` – `mb-12` | Gives headings enough breathing room to feel like titles, not just the first line of a paragraph. |
| Heading eyebrow → h2 | `mb-2` | Eyebrow tightly coupled to its heading. They're a visual unit. |
| H2 → supporting paragraph | `mt-4` | Close enough to read as a group, far enough to feel hierarchical. |
| Grid gap | `gap-5` | Consistent 20px gaps between cards. Large enough to separate, small enough to feel like a cohesive set. |
| Card internal padding | `p-5` – `p-6` | Cards feel "padded" rather than cramped. |
| Form field spacing | `space-y-5` | Vertical rhythm inside forms. 20px between fields gives room for labels + inputs without wasting space. |

### Spacing rules

1. **No `mt-1` or `mb-1` between major elements.** These micro-spaces create visual tension. Minimum meaningful space between distinct elements is `mt-2` / `mb-2`.
2. **Cards never touch.** Always `gap-4` minimum in grids. Adjacent cards with no gap look like a broken layout.
3. **Inverse relationship between element size and surrounding space.** Larger headings need more space above (`mt-10`+). Micro labels need minimal space (`mt-1`–`mt-3`).

---

## 5. UI Patterns

### Hero Sections

**Home hero** (full-bleed, immersive):
```
- Background: hero-gradient (navy → indigo → navy at 135°)
- Decorative: Two offset white circles at 5% opacity (subtle depth, not distracting)
- Content: Left-aligned, max-w-2xl
- Social proof badge: Pill above headline with star icon
- H1 → body → CTA button + price anchor
- Bottom: 1px red accent line (signature element)
```

**Interior page hero** (PageHeroSection — compact):
```
- Same gradient background, shorter padding (py-14 → py-20)
- H1 + subtitle only, optional CTA button
- Same 1px red line at bottom
```

**Why this works:** The consistent gradient + red accent line creates a "stamp" at the top of every page. Visitors instantly know they're on Groverz. The left-aligned text (not centered) feels more natural and is faster to scan — centered hero text is a cliché that actually hurts readability on wide screens.

### CTA Behaviour

| Variant | Pattern | Usage |
|---|---|---|
| **Primary** | `bg-[#b91c1c] hover:bg-[#991b1b]`, white text, `px-7 py-3`, sometimes with arrow icon | The only CTA that should drive the main conversion action per section. One per section max. |
| **Secondary / Ghost** | `border-[#1e1b4b] text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white` | "Learn more" actions, secondary paths. Hover fills to navy — the transformation is satisfying and unexpected. |
| **On dark backgrounds** | `border-white/30 text-white hover:bg-white/10` | Phone number CTAs, secondary actions in CTA sections and footer. |

**CTA rules:**
1. **One red button per viewport height.** If two red buttons are visible simultaneously, the visitor's eye has nowhere to land.
2. **Every CTA has an arrow icon** (`ArrowRight` or `Phone`). Icons increase click-through by making the button feel actionable rather than static.
3. **CTA copy is always specific.** "Book a Free Consultation" beats "Contact Us". "See What's Included" beats "Learn More". The verb tells the visitor what will happen.

### Service Cards

```
rounded-xl border border-gray-100 bg-white p-6
hover: border-[#b91c1c]/20 shadow-lg
transition-all duration-300
```

- **Icon containers:** 48×48px rounded-lg with red tint background (`bg-[#b91c1c]/10`), darkening on card group hover (`group-hover:bg-[#b91c1c]/20`).
- **No images inside service cards.** Icons are more scannable, load instantly, and prevent the inconsistency of mixing stock photos with real content.
- **Card height equalisation:** All cards in a grid row are `h-full`. Uneven cards break the visual grid.

**Why no card images:** Compare Bench.co (icon cards, clean) vs. H&R Block (stock photo cards, messy). When you don't have 7 unique, high-quality service photographs, icons are the honest choice. They also scan faster — a visitor can evaluate all 7 services in 3 seconds.

### Accordion Pattern (Services)

```
Collapsed: rounded-xl border-gray-100, hover adds red tint + shadow
Expanded: border-[#b91c1c]/30, shadow-lg, Framer Motion height animation
Icon: transforms from tinted-background to filled-red on expand
Chevron: rotates 180° with 300ms easeInOut
```

**Why accordions beat tabs or pages for services:** The visitor likely came for 1–2 specific services. Accordions let them find theirs without loading a new page, while the closed cards still surface all other service names (passive discovery). The Framer Motion animation makes expansion feel physical rather than jumpy.

### Trust Builder Elements

| Element | Pattern | Reasoning |
|---|---|---|
| **Stats bar** | 4-col grid below hero, bold number + small label | Immediate credibility. "500+" and "$80" answer the two biggest questions before the visitor has to scroll. |
| **Social proof pill** | `border border-white/20 bg-white/10` pill with star icon | Positioned above the hero H1. Wealthsimple uses this pattern — it creates a "newspaper endorsement" feel. |
| **Testimonial cards** | Star ratings + quote + name/role/location | The location detail (e.g., "Joondalup", "Cannington") is critical — it tells Perth visitors these are real local people, not fake reviews. |
| **Registration badge** | Small pill with "Registered Tax Agent — Tax Practitioners Board" | Appears in header sidebar area, contact page sidebar, and form header. Repetition builds credibility subconsciously. |
| **Penalty warning bar** | Amber icon + clickable text + modal | Creates urgency without being aggressive. The click-to-learn-more pattern respects the visitor's intelligence rather than screaming "ACT NOW." |

### Form Design

```
- Labels above fields (never floating/inside)
- Input: rounded border, focus ring via Radix
- Grid: 2-col for name/email, phone/service; full-width for message
- Helper text below fields in gray-400, text-xs
- Submit: full-width on mobile, auto-width on desktop
- Honeypot field hidden for spam protection
- Success state: centered, green checkmark, human confirmation copy
```

**Why labels above, not inside fields:** Placeholder-as-label is an accessibility anti-pattern (the label disappears when you start typing). Above-field labels are scannable before interaction and meet WCAG requirements without workaround hacks.

---

## 6. Interactive Patterns & Micro-Interactions

| Element | Interaction | Duration | Easing |
|---|---|---|---|
| Buttons | Background colour shift | `transition-colors` (150ms default) | CSS default ease |
| Cards (hover) | Border colour + shadow appears | `duration-300` | `ease-in-out` |
| Service accordion expand | Height reveals, opacity fades in | `300ms` | Framer Motion `easeInOut` |
| Chevron rotation | 180° rotation on accordion toggle | `duration-300` | CSS `ease-in-out` |
| Modal overlay | Backdrop appears at 50% opacity | Instant (no transition) | — |
| Outline buttons (hover) | Background fills, text color inverts | `transition-colors` | CSS default |
| Navigation link | Background tint appears | `transition-colors` | CSS default |
| Mobile menu | Appears below header (no animation currently) | Instant | Consider adding `slide-down` |

**Interaction rules:**
1. **300ms is the ceiling for UI transitions.** Anything longer feels sluggish.
2. **No entry animations on page load** (no fade-in, no slide-up on scroll). These are distracting on a utility-first business site and delay content access.
3. **Hover effects are hints, not features.** They should confirm "this is interactive" — not perform a dance.
4. **Touch targets:** All interactive elements (buttons, accordion triggers, links) are minimum 44×44px tap area per WCAG 2.5.5.

---

## 7. Border & Shadow System

### Borders

| Token | Value | Usage |
|---|---|---|
| Card borders | `border border-gray-100` | Default. Nearly invisible — just enough to define the edge on white backgrounds. |
| Active/focused borders | `border-[#b91c1c]/30` | Expanded accordion, focused input states. Red tint draws attention. |
| Section dividers | `border-b border-gray-100` or `border-t border-[#1e1b4b]/10` | Between sections. `gray-100` for light areas, `[#1e1b4b]/10` on cream/warm backgrounds for tonal consistency. |
| On dark backgrounds | `border-white/10` | Subtle structure within navy sections. |

### Shadows

| Token | Value | Usage |
|---|---|---|
| Card resting | `shadow-sm` or none | Most cards have no shadow at rest — the border is sufficient. |
| Card hover | `shadow-lg` | Lift effect on interact. The jump from none → `shadow-lg` creates a satisfying "pick up" feeling. |
| Special cards | `shadow-[0_14px_40px_rgba(15,23,42,0.04)]` | Contact info cards. The custom shadow uses brand-navy as the shadow colour for warmth. |
| Featured element | `shadow-[0_20px_60px_rgba(15,23,42,0.08)]` | PhotoPlaceholder card. Heavier shadow for the most important visual element on the About page. |
| Dark card | `shadow-[0_20px_50px_rgba(30,27,75,0.22)]` | Navy sidebar on contact page. Dark shadow on dark card creates depth without looking out of place. |

**Shadow rule:** Always use brand navy (`rgba(15,23,42,...)` or `rgba(30,27,75,...)`) as the shadow colour, never pure black. This keeps shadows warm and visually connected to the palette.

---

## 8. Border Radius System

| Size | Token | Usage |
|---|---|---|
| Standard cards | `rounded-xl` (12px) | Service cards, FAQ items, general content cards |
| Featured / large cards | `rounded-2xl` (16px) | Contact info cards, sidebar sections, call-out boxes |
| Photographic / hero cards | `rounded-[24px]`–`rounded-[28px]` | PhotoPlaceholder (the extra rounding creates a premium, editorial feel) |
| Buttons | `rounded-md` (6px) via Shadcn defaults | Tighter radius on buttons feels more decisive than pill-shaped buttons |
| Pills / badges | `rounded-full` | Category filters, registration badges, social proof pills |
| Icon containers | `rounded-lg` (8px) | Service card icons, contact card icons — slightly softer than buttons |

**Radius rule:** Larger elements get larger radii. A 12px radius on a small button looks bloated; a 6px radius on a full-width card looks cheap. The radius should scale with the element's surface area.

---

## 9. Responsive Strategy

| Breakpoint | Grid behaviour | Key changes |
|---|---|---|
| **Mobile** (< 640px) | Single column, full-width cards | Hero text stacks, CTA full-width, stats become 2×2, mobile nav hamburger |
| **SM** (640px) | 2-column grids begin | Service cards 2-col, form fields 2-col, testimonials 2-col |
| **MD** (768px) | Desktop nav appears | Hamburger menu hides, desktop nav + phone number visible |
| **LG** (1024px) | 4-column grids, side-by-side layouts | Stats 4-col, services 4-col, About page 2/3 split, Contact form + sidebar |
| **XL** (1280px) | Max content width reached | `max-w-7xl` container stops growing, content centered |

### Mobile-specific patterns
- Hero minimum height: `min-h-[420px]` ensures hero feels substantial even on short screens
- Sticky header: `h-16` on mobile (`h-20` desktop) — smaller to preserve screen real estate
- Contact sidebar: Stacks below form on mobile (natural priority: form first, info second)
- Accordion cards remain full-width at all breakpoints (complex content needs horizontal space)

---

## 10. Accessibility Baseline

| Requirement | Implementation |
|---|---|
| **Colour contrast** | Navy on white: 14.5:1 (AAA). Red on white: 5.3:1 (AA). White on navy: 14.5:1 (AAA). All pass WCAG AA minimum. |
| **Focus indicators** | Radix primitives provide `outline-ring/50` focus rings. All interactive elements receive visible focus state. |
| **Touch targets** | Buttons: minimum `py-2.5 px-5` = ~44px height. Accordion triggers: full-width `p-6` hit area. |
| **Form labels** | All inputs have explicit `<Label htmlFor>` associations. Placeholders supplement, never replace, labels. |
| **Semantic HTML** | `<section>`, `<nav>`, `<main>`, `<footer>`, `<header>` used correctly. `role="alert"` on form errors, `role="status"` on success. |
| **Reduced motion** | The `tailwindcss-animate` plugin respects `prefers-reduced-motion`. Framer Motion should add `reducedMotion="user"` prop. |
| **Screen reader** | Mobile menu toggle has `aria-expanded` and `aria-label`. Hidden honeypot field uses `tabIndex={-1}`. |

---

## Summary: Design Principles Checklist

1. **Navy for authority, cream for warmth, red for action.** No other saturated colours.
2. **One red CTA per viewport.** Don't dilute the conversion signal.
3. **Eyebrow + H2 on every section.** Creates scannable structure.
4. **`leading-relaxed` on all body text.** Tax content needs room to breathe.
5. **System fonts only.** Speed is a feature.
6. **`py-16 sm:py-20` on every section.** Predictable rhythm.
7. **Cards: border on rest, shadow on hover.** Subtle → responsive.
8. **Shadows use brand navy, never black.** Warm > harsh.
9. **One font weight for body (400), one for headings (700), one for labels (600).** Three weights, no more.
10. **Every design choice should be defensible.** If you can't explain *why*, remove it.
