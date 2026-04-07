# Mobile View & Functionality Audit

**Date:** 2026-04-08
**Scope:** All pages, layout components, sections, UI primitives, CSS, and HTML — assessed against mobile viewports (320 px–480 px).

---

## Overall Assessment

The codebase makes good use of Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) and the site is fundamentally mobile-friendly. There are, however, a handful of concrete issues that will affect real-world phone usage ranging from tap-target sizes to layout overflow to performance on low-end devices.

---

## Critical Issues

### 1. Homepage hero CTA button is wrapped in a `<Link>` but has no full-width treatment on mobile

**File:** `src/pages/HomePage.jsx` (hero section)
**Problem:** The "Book a Free Consultation" `<Button>` sits inside an unstyled `<Link>`. On mobile the button renders at its intrinsic width, which means the tap target is narrower than the full content column. Surrounding `<span>` text ("Individual returns from $80") stacks below as expected, but the button itself doesn't expand.
**Impact:** Reduced conversion — the primary CTA on the most important page could be larger.
**Recommendation:** Add `w-full sm:w-auto` to the `<Button>` (or the wrapping `<Link>`) so it stretches edge-to-edge on small screens, matching the pattern already used on the contact form submit button.

### 2. Mobile menu lacks scroll lock and focus trap

**File:** `src/components/layout/SiteHeader.jsx`
**Problem:** When `isMobileMenuOpen` is true, the menu renders as a static `<div>` that pushes page content down. The body remains scrollable behind it (no `overflow-hidden` on `<body>`), and keyboard focus can escape to elements underneath. There is no `<FocusTrap>` or `aria-modal` pattern.
**Impact:** Users can scroll the page while the menu is open, creating a confusing layered experience. Keyboard and screen-reader users can tab out of the menu.
**Recommendation:**
  - Toggle `document.body.style.overflow = 'hidden'` when the menu opens and revert on close.
  - Consider rendering the menu as a full-screen overlay (`fixed inset-0`) with `z-50` instead of an inline push-down, or at minimum set a max-height with overflow-y auto so long nav lists don't push offscreen.
  - Add focus management (trap focus while open, return focus on close).

### 3. FloatingMathBackground canvas runs continuous rAF on mobile

**File:** `src/components/common/FloatingMathBackground.jsx`
**Problem:** The canvas animation runs a full requestAnimationFrame loop with O(n²) collision detection (n = 28–36 particles) on every frame. This fires on every page that uses `PageHeroSection` or the homepage hero — i.e. every page.
**Impact:** Drains battery and drops frame rate on mid/low-tier phones. The animation is barely visible (opacity 0.03–0.18) on small screens and offers little value relative to cost.
**Recommendation:**
  - Gate the animation behind a `prefers-reduced-motion` media query check — skip init when the user prefers reduced motion.
  - Optionally reduce `count` on mobile (e.g. halve it below 768 px), or pause the loop when the canvas is not intersecting the viewport (`IntersectionObserver`).

---

## High-Priority Issues

### 4. Penalty info modal has no scroll-safe sizing

**File:** `src/pages/HomePage.jsx` — `isPenaltyInfoOpen` modal
**Problem:** The modal is a `fixed inset-0` overlay with `items-center justify-center` and `p-4`, but the inner card (`max-w-lg`) has no `max-h` or `overflow-y-auto`. On shorter mobile screens (especially landscape or phones with bottom bars), the card can exceed the viewport and the bottom CTA button becomes unreachable.
**Impact:** Users on short-viewport phones cannot dismiss or fully read the modal.
**Recommendation:** Add `max-h-[90vh] overflow-y-auto` (or `max-h-[calc(100dvh-2rem)]`) to the inner card div.

### 5. Service filter pills can overflow and wrap awkwardly

**File:** `src/pages/ServicesPage.jsx`
**Problem:** The filter buttons use `flex flex-wrap justify-center gap-2`. On a 320 px screen, five pills ("All services", "Personal", "Business", "Trusts & Companies", "Finance") will wrap to 2–3 rows, and "Trusts & Companies" is long enough to push the last pill to its own row, leaving uneven spacing.
**Impact:** Visual messiness and potentially confusing touch targets that sit too close together.
**Recommendation:** Use a horizontally scrollable row on mobile (`overflow-x-auto flex-nowrap`) with snap points, or shorten the label "Trusts & Companies" → "Trusts & Co." at the `sm:` breakpoint.

### 6. Homepage service cards: 7-column grid creates orphan on tablet

**File:** `src/pages/HomePage.jsx` — service cards grid
**Problem:** `grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` with 7 items. At `sm` (2 cols), the 7th card sits alone in a full-width row. At `lg` (3 cols), there's a lone 7th card again. At `xl` (4 cols), three cards orphan.
**Impact:** Every common breakpoint leaves a visually imbalanced final row.
**Recommendation:** Either remove or add a card to reach an even count (6 or 8), or use `lg:grid-cols-4` (4 cols × 2 rows = 8, with one gap — less awkward than 3 + 3 + 1).

### 7. Tap targets on footer links are too small

**File:** `src/components/layout/SiteFooter.jsx`
**Problem:** Footer nav links use `py-1` padding on items in a `space-y-1.5` list. This gives ~28 px vertical tap targets — below the recommended 44 px minimum (WCAG 2.5.8 / Apple HIG).
**Impact:** Frustrating for users trying to tap "About" or "BAS & GST Lodgement" on a phone.
**Recommendation:** Increase to `py-2` or `py-2.5` on mobile, or add `min-h-[44px]` to the link elements.

### 8. Contact page: sticky sidebar loads a Google Maps iframe eagerly at 220 px height

**File:** `src/pages/ContactPage.jsx`
**Problem:** On mobile the sidebar stacks below the form (good), but the iframe is not lazy on all browsers — `loading="lazy"` is a hint, not a guarantee. The `sandbox="allow-scripts allow-same-origin"` is correct, but the 220 px fixed height can feel cramped on mobile where you'd want either a smaller or taller embed.
**Impact:** Extra network requests and rendering cost on initial load for a map users haven't scrolled to yet. Cramped map on mobile.
**Recommendation:** Consider wrapping the iframe in an IntersectionObserver-based loader, or simply omit the iframe on mobile and provide a "View on Google Maps" link instead. This saves significant mobile bandwidth.

---

## Medium-Priority Issues

### 9. About page: lg:grid-cols-5 layout has no intermediate breakpoint

**File:** `src/pages/AboutPage.jsx`
**Problem:** The profile section uses `lg:grid-cols-5` (2 + 3 split). Below `lg` (1024 px) it collapses to a single column. Between ~640 px and 1023 px (tablets, large phones in landscape) the PhotoPlaceholder renders full-width and very tall, pushing the bio section far down the page.
**Impact:** Long scroll distance before reaching the main content on mid-size screens.
**Recommendation:** Add a `md:grid-cols-5` or `md:grid-cols-2` intermediate treatment to keep the two-column layout active earlier.

### 10. PhotoPlaceholder inner card has a 220 px min-height box that is oversized on 320 px screens

**File:** `src/components/common/PhotoPlaceholder.jsx`
**Problem:** `min-h-[220px]` on the inner gradient box. On a 320 px-wide phone, the card already has large padding and a nested border structure. The 220 px min-height creates a tall, mostly empty area (it only holds initials and a short name).
**Impact:** Wasted vertical space on the About page's most prominent element.
**Recommendation:** Reduce to `min-h-[160px] sm:min-h-[220px]`.

### 11. Tax refund estimator results stack below the form on mobile — but the form stays in view

**File:** `src/components/sections/TaxRefundEstimatorSection.jsx`
**Problem:** On mobile the two-column grid collapses, and the result cards render above the form (in DOM order, the left column is first). After submitting, the user has to scroll *up* to see their result because the lg:grid on mobile stacks the result column above the form column.
**Impact:** Users press "Estimate My Refund", the page doesn't scroll, and the result is above the fold line or off-screen above.
**Recommendation:** Either reorder the columns on mobile (form first, result second) using `order-last lg:order-first`, or programmatically scroll the result into view after calculation.

### 12. Header logo uses Framer Motion spring animations on every hover

**File:** `src/components/layout/SiteHeader.jsx`
**Problem:** The logo has `motion.div` with spring physics that animate padding, translateY, and boxShadow on hover. On mobile, hover events don't apply in the traditional sense, but touch-and-hold or slow taps can trigger them, creating a jarring animation when the user is just trying to navigate home.
**Impact:** Unexpected micro-animations on touch devices.
**Recommendation:** Disable the hover animation on touch devices via `@media (hover: hover)` or by checking `window.matchMedia('(hover: hover)')` and conditionally applying the motion props.

### 13. Desktop liquid-glass nav blob is hidden on mobile (good), but the desktop phone link is also hidden below `lg`

**File:** `src/components/layout/SiteHeader.jsx`
**Problem:** `<a href="..." className="hidden ... lg:flex">` hides the phone number link at `< lg`. The mobile menu does include a phone link, but it's only visible when the menu is open. A quick-access phone number (ideally tappable) is highly valuable real estate on mobile.
**Impact:** Users who land on the site on a phone and want to call have to open the hamburger menu first.
**Recommendation:** Surface the phone icon/link in the header bar next to the hamburger icon on mobile, or make the "Book a Consultation" button in the header a `tel:` link on small screens.

### 14. Select dropdown (Radix UI) can be hard to use on small screens

**File:** `src/components/ui/select.jsx`
**Problem:** Radix `SelectContent` renders as a positioned popover. On phones, native `<select>` gives the OS-level picker (wheel on iOS, bottom sheet on Android), which is significantly more usable. The custom dropdown can overflow the viewport or require precise tapping.
**Impact:** Degraded UX for the "What do you need help with?" field on the contact form — one of the most important conversion paths.
**Recommendation:** Consider using a native `<select>` on mobile and the Radix component on desktop, or ensure the Radix content panel is `position="item-aligned"` with viewport-aware collision padding.

---

## Low-Priority / Polish Issues

### 15. `text-balance` utility is applied on some headings but browser support is limited

**File:** `src/index.css`
**Problem:** `text-wrap: balance` is defined as a utility but is only supported in Chromium 114+ and Firefox 121+. Safari still lacks support (as of early 2026). On Safari mobile it's a no-op, so heading line breaks may look less polished than on Chrome.
**Impact:** Visual-only, minor.
**Recommendation:** No action needed unless headline appearance on Safari is a concern. If so, manually break long headlines with `<br className="sm:hidden" />`.

### 16. Homepage stats grid uses `grid-cols-2` at base, `md:grid-cols-4`

**File:** `src/pages/HomePage.jsx` — stats section
**Problem:** At 320 px, two columns of stats ("500+" / "Returns Lodged" side by side with "$80" / "Individual Returns From") can feel cramped — the label text wraps.
**Impact:** Minor readability issue.
**Recommendation:** Consider `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` so the stats stack vertically on the smallest screens.

### 17. Various `<Link>` components wrap `<Button>` elements

**Files:** Multiple (HomePage, AboutPage, ServicesPage, CallToActionSection)
**Problem:** React Router `<Link>` wrapping a `<Button>` means an `<a>` wraps a `<button>` — invalid HTML nesting. Most browsers handle it, but screen readers may announce the element inconsistently.
**Impact:** Accessibility, minor.
**Recommendation:** Use `<Link>` with the button's styling classes directly, or use the `<Button asChild>` pattern with `<Link>` as the child slot.

### 18. Testimonial cards hover animation (`hover:-translate-y-1`) fires on touch

**File:** `src/components/sections/TestimonialsSection.jsx`
**Problem:** CSS `hover:` states persist on mobile after a tap (sticky hover), causing the card to stay lifted until the user taps elsewhere.
**Impact:** Visual inconsistency — one testimonial card appears "selected" after tapping it.
**Recommendation:** Wrap hover effects in `@media (hover: hover)` via Tailwind's `hover:` modifier (which already respects this in Tailwind v3.4 if configured), or remove the `hover:-translate-y-1` on mobile using `md:hover:-translate-y-1`.

### 19. `ProcessTimelineSection` number badges use absolute positioning that can clip on narrow screens

**File:** `src/components/sections/ProcessTimelineSection.jsx`
**Problem:** The step number circles are `absolute left-0 top-0` with `pl-16` on the content. On a 320 px screen with `px-4` page padding, the usable width is 288 px, minus 64 px (pl-16) leaves 224 px for content — tight but workable. However, the 48 px circle plus the card border can sit very close to the left edge.
**Impact:** Feels cramped on the smallest phones.
**Recommendation:** Reduce `pl-16` to `pl-14` on base and use slightly smaller number circles on mobile (`h-10 w-10 sm:h-12 sm:w-12`).

### 20. No `meta viewport` issue, but missing `interactive-widget=resizes-content`

**File:** `index.html`
**Problem:** The viewport meta tag is standard (`width=device-width, initial-scale=1.0`), but does not include `interactive-widget=resizes-content`. On Android Chrome, when the virtual keyboard opens (e.g. contact form), the viewport doesn't resize, which can hide the active input behind the keyboard.
**Impact:** Form fields may be obscured when the keyboard opens on Android.
**Recommendation:** Add `interactive-widget=resizes-content` to the viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content" />
```

---

## Functionality Audit

### Form Behaviour

| Area | Status | Notes |
|------|--------|-------|
| Contact form submit | ✅ Good | Full-width button on mobile (`w-full … sm:w-auto`) |
| Contact form validation | ✅ Good | Server-side + client required attributes |
| Contact form error display | ✅ Good | Inline error banner with `role="alert"` |
| Contact form success state | ✅ Good | Clear success message with reset option |
| Tax estimator form | ✅ Good | `inputMode="numeric"` set correctly |
| Honeypot field | ✅ Good | `hidden` div, `tabIndex={-1}` |

### Navigation

| Area | Status | Notes |
|------|--------|-------|
| Mobile hamburger toggle | ✅ Works | `aria-expanded` set, `aria-label` present |
| Active page highlight | ✅ Good | White bg on active nav item |
| Route change scroll reset | ✅ Good | `SiteLayout` scrolls to top on pathname change |
| 404 page | ✅ Good | Mobile-friendly centered layout |
| Deep linking / SPA fallback | ✅ Good | Configured in `vercel.json` |

### Touch & Interaction

| Area | Status | Notes |
|------|--------|-------|
| All buttons ≥ 44 px | ⚠️ Mixed | CTA buttons are fine; footer links and some nav items are undersized |
| `tel:` links | ✅ Good | Phone numbers are tappable links throughout |
| `mailto:` links | ✅ Good | Email address triggers native mail client |
| External links open in new tab | ✅ Good | Google Maps link has `target="_blank"` and `rel="noopener noreferrer"` |
| Service accordion expand/collapse | ✅ Good | Touch-friendly, full-width tap target |
| FAQ accordion | ✅ Good | Uses Radix Accordion with keyboard support |

### Performance Considerations

| Area | Status | Notes |
|------|--------|-------|
| Bundle size | ✅ OK | Vite tree-shakes; no heavy deps beyond Framer Motion + GSAP |
| Image assets | ✅ Minimal | Only `logo.png` — photo placeholder is CSS/SVG |
| Canvas animation | ⚠️ Concern | Continuous rAF on every page hero; see issue #3 |
| Google Maps iframe | ⚠️ Concern | Loads on contact page even if not scrolled to; see issue #8 |
| Font loading | ✅ Good | System font stack, no custom web fonts |

---

## Summary of Recommended Fixes by Priority

| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 1 | Hero CTA full-width on mobile | Critical | 5 min |
| 2 | Mobile menu scroll lock + focus trap | Critical | 30 min |
| 3 | Canvas animation battery drain | Critical | 20 min |
| 4 | Penalty modal scroll safety | High | 5 min |
| 5 | Service filter pill overflow | High | 10 min |
| 7 | Footer link tap targets | High | 5 min |
| 8 | Maps iframe eager load | High | 15 min |
| 11 | Estimator result scroll-into-view | Medium | 10 min |
| 13 | Phone link visible in mobile header | Medium | 10 min |
| 14 | Native select on mobile | Medium | 20 min |
| 17 | Link wrapping Button (a11y) | Low | 15 min |
| 18 | Sticky hover on testimonials | Low | 5 min |
| 20 | Viewport interactive-widget | Low | 1 min |
