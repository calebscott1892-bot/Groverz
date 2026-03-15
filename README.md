# Groverz Tax Pro

Frontend codebase for the Groverz Tax and Accounting Solutions website.

## Stack

- React 18
- Vite 6
- React Router
- Tailwind CSS
- shadcn/ui-style component primitives

## Requirements

- Node.js 20+ recommended
- npm 10+ recommended

## Local Setup

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Build the production bundle with `npm run build`.
4. Run the handoff verification suite with `npm run check`.

## Available Scripts

- `npm run dev` - start the local dev server
- `npm run build` - create a production build
- `npm run check` - run formatting, linting and production build checks
- `npm run lint` - run ESLint
- `npm run format` - format the codebase with Prettier
- `npm run format:check` - check formatting without writing changes
- `npm run preview` - preview the production build locally

## Build Output

- Production files are generated into `dist/`
- No environment variables are currently required for local development or deployment
- The contact form uses Netlify Forms when deployed on Netlify

## Deployment

This project is a static Vite single-page app with client-side routing. The best fit is Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA route handling is included via `public/_redirects`
- The enquiry form is configured for Netlify Forms with a static detection form in `index.html`

If you deploy elsewhere, configure a rewrite so all non-file routes fall back to `/index.html`.

## Notes

- The homepage is the current visual reference for the site.
- The project is being cleaned up for direct ownership and a normal Git-based workflow.
- No environment variables are currently required.
- Netlify form submissions should be tested on a Netlify deploy preview or production deploy, not only in local Vite development.

## Pre-Launch Checks

- Replace the About page headshot placeholder with a real team image or portrait.
- Confirm all business details, registration wording, service list, phone numbers and opening hours.
