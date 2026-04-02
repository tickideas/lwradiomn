# Phase 1 Design — "Look Legit"

**Date:** 2026-04-02
**Goal:** Bring loveworldradio.mn closer to loveworldradio.fm with quick-win features that make the site feel like a real radio platform.

## Scope

1. Sticky bottom audio player (custom HTML5 audio)
2. Program schedule section
3. Social media links in footer
4. Remove current RadioPlayer placeholder section
5. Centralized config file for stream URL and social links

## Out of Scope

- Giving/Partnership/Donations
- App store buttons
- OAP profiles, blog, testimonies, music library
- CMS or backend integration
- User accounts

---

## 1. Sticky Bottom Audio Player

### File: `src/components/StickyPlayer.tsx`

**Behavior:**
- Fixed to the bottom of the viewport (`position: fixed; bottom: 0`)
- Always visible regardless of scroll position
- Uses HTML5 `<audio>` element with the stream URL
- Stream does NOT autoplay — user must click play (browser autoplay policies)
- Maintains playback state across scroll

**Controls:**
- Play/Pause toggle button (large, prominent)
- Volume slider (horizontal, hidden on mobile — just mute toggle on small screens)
- Mute/Unmute toggle

**Display:**
- Station name: "Loveworld Radio"
- Live indicator: pulsing green dot + "LIVE" text (always shown — it's a live stream)

**Styling:**
- Background: `brand-dark` (#0D2E5C) with subtle top border
- Height: ~64px on desktop, ~56px on mobile
- Full width
- z-index high enough to sit above all content
- Bottom padding added to `<main>` or `<body>` so the player doesn't obscure footer content

**Stream URL:**
- Default: `https://radio.superfm963.com/proxy/lwradio/stream`
- Sourced from `src/config.ts` so it's easy to swap

---

## 2. Program Schedule Section

### File: `src/components/Schedule.tsx`

**Position in page:** Between the Hero and About sections (replaces RadioPlayer's old position).

**Layout:**
- Section heading: "Program Schedule" with a Calendar/Clock icon
- Subheading: "Tune in to our weekly programs"
- Card-based grid showing programs
- Each card shows: Program name, time slot, day(s), brief description (optional)

**Placeholder data** (to be replaced with real schedule):

| Program | Time | Days |
|---|---|---|
| Morning Devotion | 6:00 AM – 7:00 AM | Mon – Fri |
| Rhapsody of Realities | 7:00 AM – 7:30 AM | Daily |
| Music Hour | 12:00 PM – 1:00 PM | Mon – Fri |
| Evening Worship | 6:00 PM – 7:00 PM | Mon – Fri |
| Sunday Service | 9:00 AM – 12:00 PM | Sunday |

**Styling:**
- Consistent with existing sections (dark background, white/gray text)
- Cards with `bg-white/5 border border-white/10 rounded-xl` (matching existing card pattern)
- Time shown in brand-gold accent color
- Responsive: 1 column on mobile, 2–3 columns on desktop

**Data source:**
- Array of objects in `src/config.ts` (easy to update without touching component code)

---

## 3. Social Media Links

### Updated file: `src/components/Footer.tsx`

**Platforms (structure ready, URLs configurable):**
- Facebook
- Instagram
- YouTube
- X (Twitter)
- KingsChat

**Behavior:**
- Only platforms with a non-empty URL are rendered
- Links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Icons from Lucide React where available (Facebook, Instagram, Youtube, Twitter)
- KingsChat uses a simple custom SVG or text fallback

**Styling:**
- Row of icon buttons in the footer
- Icons: `w-5 h-5`, hover effect (opacity or color shift)
- Grouped visually with a "Follow Us" label or similar

**Configuration:**
- All URLs stored in `src/config.ts` as an object:
  ```ts
  export const SOCIAL_LINKS = {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    kingschat: '',
  };
  ```

---

## 4. Remove RadioPlayer Placeholder

### Updated file: `src/components/RadioPlayer.tsx` → **DELETE**
### Updated file: `src/App.tsx`

- Remove `RadioPlayer` component entirely
- The sticky player replaces its function
- App layout becomes: `Header → Hero → Schedule → About → Footer` (+ StickyPlayer fixed)

---

## 5. Centralized Config

### New file: `src/config.ts`

All configurable values in one place:

```ts
/** Stream URL — replace with your own Icecast/Shoutcast stream */
export const STREAM_URL = 'https://radio.superfm963.com/proxy/lwradio/stream';

/** Social media links — leave empty to hide */
export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  youtube: '',
  twitter: '',
  kingschat: '',
};

/** Program schedule */
export const PROGRAMS = [
  { name: 'Morning Devotion', time: '6:00 AM – 7:00 AM', days: 'Mon – Fri' },
  { name: 'Rhapsody of Realities', time: '7:00 AM – 7:30 AM', days: 'Daily' },
  { name: 'Music Hour', time: '12:00 PM – 1:00 PM', days: 'Mon – Fri' },
  { name: 'Evening Worship', time: '6:00 PM – 7:00 PM', days: 'Mon – Fri' },
  { name: 'Sunday Service', time: '9:00 AM – 12:00 PM', days: 'Sunday' },
];
```

---

## File Changes Summary

| Action | File |
|---|---|
| CREATE | `src/config.ts` |
| CREATE | `src/components/StickyPlayer.tsx` |
| CREATE | `src/components/Schedule.tsx` |
| UPDATE | `src/App.tsx` — remove RadioPlayer, add Schedule + StickyPlayer |
| UPDATE | `src/components/Footer.tsx` — add social links |
| DELETE | `src/components/RadioPlayer.tsx` |

---

## Design Decisions

1. **No autoplay** — browsers block it anyway, and it's bad UX to blast audio on page load.
2. **Config file over env vars** — this is a static site, no server. A simple TS file is the easiest pattern for the team to update.
3. **Hide unconfigured socials** — cleaner than showing dead links or placeholder URLs.
4. **Placeholder schedule data** — realistic enough to look real if accidentally left in, easy to update in one file.
5. **Delete RadioPlayer vs repurpose** — the sticky player fully replaces it. No need for a mid-page player section when there's a persistent one.
