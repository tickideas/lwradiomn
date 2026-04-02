# Loveworld Radio Mongolia

Single-page website for **loveworldradio.mn** — a live radio streaming site for Loveworld Radio Mongolia.

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS 4
- Vite 6
- Docker (Nginx Alpine)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Configuring the Radio Player

Edit `src/components/RadioPlayer.tsx` and set the `RADIO_EMBED_URL` constant to your streaming service's embed URL:

```tsx
const RADIO_EMBED_URL = 'https://embed.radio.co/player/YOUR_ID.html';
```

Supported services: Radio.co, Airtime Pro, Shoutcast, Zeno.FM, Live365, and any iframe-based player.

## Production Build

```bash
npm run build
npm run preview  # Preview locally
```

## Docker Deployment

```bash
docker build -t loveworldradio .
docker run -p 80:80 loveworldradio
```

On Dokploy, point a new service to this repo with:
- **Build target**: default (uses multi-stage Dockerfile)
- **Exposed port**: 80
- **Domain**: loveworldradio.mn

## Related

- [Loveworld TV Mongolia](https://loveworldtv.mn) — TV streaming platform (separate repo)
