# PRODUCTION READINESS — Remaining Items

> Generated: 15 April 2026
> Status: **Build passes, lint clean, all code-level fixes applied.**
> These items require human action, external service configuration, or design decisions.

---

## MUST-DO BEFORE LAUNCH

### 1. Verify Resend domain and set `RESEND_API_KEY`
The contact form relies on [Resend](https://resend.com) for email delivery. Right now
the sender falls back to `onboarding@resend.dev` (a Resend demo address).

**Action:**
- Sign in to Resend → add and verify `groverztax.com.au` domain (DNS TXT/DKIM records).
- Generate a production API key.
- Set `RESEND_API_KEY` in Vercel (or Netlify) environment variables.
- Optionally set `CONTACT_FROM_EMAIL=noreply@groverztax.com.au`.
- **Test the contact form end-to-end** in production after deploy.

### 2. Rate limiting is in-memory only
`server/contact/contact-service.js` stores rate-limit counters in a `Map` on
`globalThis`. On serverless platforms this resets every cold start and is not shared
across instances — meaning spam protection is very soft.

**Action (choose one):**
- Accept this as "good enough" for a low-traffic small-business site (realistic).
- Move to Vercel KV / Upstash Redis for persistent, cross-instance rate limiting.

### 3. Confirm pricing across all copy
The hero and stats bar both show **$99** for individual returns.
`MOBILE_AUDIT.md` references **$80**. Confirm with the business owner which price is
current, then update `businessDetails.displayPrice` in `src/config/site.js` and anywhere
else the old price appears.

### 4. Custom domain + SSL
Ensure the Vercel (or Netlify) deployment is wired to `groverztax.com.au` with a valid
TLS certificate and proper redirects from `www.` ↔ naked domain.

---

## SHOULD-DO (Accessibility & UX)

### 5. Mobile-menu focus trapping
The mobile nav locks body scroll but doesn't trap keyboard focus. A screen-reader user
can Tab past the overlay onto hidden page content.

**Fix:** Add a focus-trap (e.g. `focus-trap-react` or manual first/last-element keydown
listener) inside `SiteHeader.jsx` when `isMobileMenuOpen` is true.

### 6. Google Maps embed URL in config
The iframe URL in `ContactPage.jsx` is a long hardcoded string with coordinates. If the
business relocates, a developer must edit JSX.

**Optional:** Move the embed URL to `businessDetails.googleMapsEmbedUrl` in
`src/config/site.js`.

---

## NICE-TO-HAVE (Polish)

### 7. Structured logging for serverless contact endpoint
`console.error` in `contact-service.js` works but offers no searchable structure. If
contact failures become hard to debug:
- Add a timestamp + request ID prefix, or
- Integrate Sentry / LogFlare / Axiom.

### 8. Tax bracket annual review reminder
The tax estimator now shows **2025-26** rates (Stage 3, unchanged from 2024-25). If the
ATO changes rates for **2026-27**, the `taxBrackets` array in
`TaxRefundEstimatorSection.jsx` needs updating before 1 July 2026. A code comment has
been added as a reminder.

### 9. `_c4-credit-portable/` folder
This untracked folder contains a portable version of the footer credit component that
already exists under `src/components/c4-footer-credit/`. Decide whether to:
- Add it to `.gitignore` (if it's a distribution artefact), or
- Commit it (if it's meant for external consumers).

---

## ALREADY FIXED IN THIS COMMIT

| Fix | File |
|---|---|
| Added `ErrorBoundary` wrapper to catch runtime crashes | `src/App.jsx` |
| Fixed `jsconfig.json` deprecation warning (`ignoreDeprecations`) | `jsconfig.json` |
| Updated tax estimator year label from 2024-25 → 2025-26 | `TaxRefundEstimatorSection.jsx` |
| Added tax bracket review comment | `TaxRefundEstimatorSection.jsx` |
| Centralised `displayPrice` + `whatsAppNumber` in config | `src/config/site.js` |
| WhatsApp button now reads number from `businessDetails` | `WhatsAppButton.jsx` |
| Added environment variables table to README | `README.md` |

---

*Copy this file into your project management tool or hand it to the next developer.*
