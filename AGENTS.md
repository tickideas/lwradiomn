# AGENTS.md - Loveworld Radio Mongolia

## Project Overview
Static single-page website for Loveworld Radio Mongolia (loveworldradio.mn). Features an embedded radio player from an online streaming service, responsive design across desktop and mobile, and branding consistent with loveworldtv.mn.

## Tech Stack
- **Frontend**: React 19, TypeScript 5.7, Tailwind CSS 4, Lucide React
- **Build**: Vite 6, @vitejs/plugin-react
- **Deployment**: Docker (multi-stage: Node build → Nginx Alpine), Dokploy
- **Domain**: loveworldradio.mn

## File Header Comments (MANDATORY)
Every file must start with 4 comment lines:
1. File location path  2. What the file does  3. Why it exists  4. RELEVANT FILES: 2-4 related files

## Key Directories
- `src/` - Source code
- `src/components/` - React components (Header, Hero, RadioPlayer, About, Footer)
- `public/assets/` - Static assets (favicon, logos, images)
- `docker/` - Nginx configuration

## Commands
- `npm run dev` - Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run types` - TypeScript check
- `npm run lint` - ESLint with auto-fix

## Radio Player Configuration
The radio player embed URL is configured in `src/components/RadioPlayer.tsx`. Replace the `RADIO_EMBED_URL` constant with the actual embed URL from the chosen streaming service. See the file for supported service examples.

## Brand Colors (matches loveworldtv.mn)
- `brand-primary`: #1A4B8C (blue)
- `brand-dark`: #0D2E5C (dark navy)
- `brand-light`: #2E6DB8 (lighter blue)
- `brand-orange`: #C8102E (red/CTA)
- `brand-gold`: #D4A542 (gold accent)

## Font
Instrument Sans from bunny.net (same as TV site)

## Deployment
- **Platform**: Dokploy (same instance as loveworldtv.mn)
- **Dockerfile**: Multi-stage (node:22-alpine → nginx:alpine), ~15MB image
- **Exposed port**: 80
- **Domain**: loveworldradio.mn

## Related Project
- **Loveworld TV Mongolia**: loveworldtv.mn (Laravel 12 + React 19, separate repo)

## Code Quality
1. `npm run types` - Fix all TypeScript errors
2. `npm run lint` - Fix all ESLint issues
