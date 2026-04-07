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
- The contact form posts to `/api/contact`
- Server-side email delivery requires Resend environment variables in development and production

## Deployment

This project is a static Vite single-page app with client-side routing and a single serverless contact endpoint. It is now ready for Vercel deployment:

- Build command: `npm run build`
- Output directory: `dist`
- Vercel project root: repository root
- The SPA fallback is configured in `vercel.json`
- Contact form submissions are handled by `api/contact.js`

In Vercel, add these environment variables to every environment that should send email:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`

If you deploy elsewhere, configure a rewrite so all non-file routes fall back to `/index.html` and map `/api/contact` to a compatible serverless function.

## Email Setup (Resend)

1. Install dependencies with `npm install`.
2. Create `.env.local` from `.env.example` and set `RESEND_API_KEY` to your real Resend API key.
3. Leave `CONTACT_FROM_EMAIL=onboarding@resend.dev` until your sending domain is verified in Resend.
4. In the Resend dashboard, verify `groverztax.com.au` and add the DNS records Resend provides.
5. After domain verification is complete, change `CONTACT_FROM_EMAIL` to `noreply@groverztax.com.au` locally and in your production environment.
6. In Vercel project settings, add the same environment variables so the contact function can access them server-side.

The contact form sends a JSON request from the React app to `/api/contact`. In local development, Vite serves that endpoint through middleware. In production on Vercel, the same path is handled by `api/contact.js`. The server validates and sanitizes the submission, applies a basic rate limit, and sends a structured email through Resend to `ankit@groverztax.com.au`.

## Notes

- The homepage is the current visual reference for the site.
- The project is being cleaned up for direct ownership and a normal Git-based workflow.
- Resend delivery requires valid environment variables in both local and production environments.

## Pre-Launch Checks

- Replace the About page headshot placeholder with a real team image or portrait.
- Confirm all business details, registration wording, service list, phone numbers and opening hours.
