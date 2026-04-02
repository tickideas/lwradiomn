# Phase 1 — "Look Legit" Implementation Plan

> **REQUIRED SUB-SKILL:** Use `/skill:subagent-driven-development` (recommended) or `/skill:executing-plans` to implement this plan task-by-task.

**Goal:** Add a sticky audio player, program schedule, and configurable social links to make loveworldradio.mn look like a real radio platform.

**Architecture:** Centralize all configurable data (stream URL, social links, schedule) in `src/config.ts`. Build two new components (`StickyPlayer`, `Schedule`), update `Footer` with config-driven social links, remove the old `RadioPlayer`, and wire everything into `App.tsx`. The sticky player uses HTML5 `<audio>` with React state for playback/volume control.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Lucide React, HTML5 Audio API

**Design spec:** `docs/plans/2026-04-02-phase1-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| CREATE | `src/config.ts` | All configurable values: stream URL, social links, program schedule |
| CREATE | `src/components/StickyPlayer.tsx` | Fixed-bottom audio player with play/pause, volume, live indicator |
| CREATE | `src/components/Schedule.tsx` | Program schedule section with card grid |
| UPDATE | `src/App.tsx` | Remove RadioPlayer, add Schedule + StickyPlayer |
| UPDATE | `src/components/Footer.tsx` | Use social links from config instead of hardcoded URLs |
| UPDATE | `src/index.css` | Add bottom padding for sticky player |
| DELETE | `src/components/RadioPlayer.tsx` | No longer needed |

---

### Task 1: Create config file

**TDD scenario:** Trivial change — config is just data exports, no logic to test.

**Files:**
- Create: `src/config.ts`

**Why this task exists:** Centralizes all values that will change between environments or as the station grows. Every other task imports from here.

- [ ] **Step 1: Create `src/config.ts`**

```ts
// src/config.ts
// Centralized configuration for Loveworld Radio Mongolia
// Edit this file to update stream URL, social links, and schedule
// RELEVANT FILES: src/components/StickyPlayer.tsx, src/components/Schedule.tsx, src/components/Footer.tsx

/** Live audio stream URL — replace with your own Icecast/Shoutcast stream */
export const STREAM_URL = 'https://radio.superfm963.com/proxy/lwradio/stream';

/**
 * Social media links — leave empty string to hide the icon.
 * Only platforms with a non-empty URL will be rendered in the footer.
 */
export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  youtube: '',
  twitter: '',
  kingschat: '',
} as const;

/** Program schedule — displayed in the Schedule section */
export const PROGRAMS = [
  { name: 'Morning Devotion', time: '6:00 AM – 7:00 AM', days: 'Mon – Fri', description: 'Start your day with prayer and the Word of God.' },
  { name: 'Rhapsody of Realities', time: '7:00 AM – 7:30 AM', days: 'Daily', description: 'Daily devotional guide for Christian living.' },
  { name: 'Music Hour', time: '12:00 PM – 1:00 PM', days: 'Mon – Fri', description: 'Uplifting gospel music to brighten your afternoon.' },
  { name: 'Evening Worship', time: '6:00 PM – 7:00 PM', days: 'Mon – Fri', description: 'Wind down with worship songs and teachings.' },
  { name: 'Sunday Service', time: '9:00 AM – 12:00 PM', days: 'Sunday', description: 'Live broadcast of the Sunday worship service.' },
] as const;
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run types`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/config.ts
git commit -m "feat(config): add centralized config for stream, socials, and schedule"
```

---

### Task 2: Create StickyPlayer component

**TDD scenario:** New UI component — verify manually in browser.

**Files:**
- Create: `src/components/StickyPlayer.tsx`

**Why this task exists:** This is the core feature — a persistent audio player fixed to the bottom of the viewport. Uses HTML5 `<audio>` with React state for play/pause and volume. Does not autoplay (browser policy). Imports stream URL from config.

- [ ] **Step 1: Create `src/components/StickyPlayer.tsx`**

```tsx
// src/components/StickyPlayer.tsx
// Sticky bottom audio player with play/pause, volume, and live indicator
// Provides persistent audio playback that stays visible during scroll
// RELEVANT FILES: src/config.ts, src/App.tsx, src/components/Header.tsx

import { useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { STREAM_URL } from '@/config';

export default function StickyPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      // Reset src to stop buffering the live stream
      audio.src = '';
      setIsPlaying(false);
    } else {
      // Re-set src to get the latest point in the live stream
      audio.src = STREAM_URL;
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch(() => {
        // Browser blocked autoplay — user needs to interact first
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [isPlaying, volume, isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    },
    [],
  );

  return (
    <>
      {/* Spacer so footer content isn't hidden behind the sticky player */}
      <div className="h-16 sm:h-[72px]" />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between h-16 sm:h-[72px] px-4 sm:px-8 lg:px-20 xl:px-36">
          {/* Left: Play button + station info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-orange hover:bg-brand-orange/80 transition-colors duration-200 shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </button>

            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base font-semibold truncate">
                Loveworld Radio
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            </div>
          </div>

          {/* Right: Volume controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Volume slider — hidden on mobile */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="hidden sm:block w-24 lg:w-32 h-1 accent-brand-gold cursor-pointer"
            />

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <audio ref={audioRef} preload="none" />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run types`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/StickyPlayer.tsx
git commit -m "feat(player): add sticky bottom audio player component"
```

---

### Task 3: Create Schedule component

**TDD scenario:** New UI component — verify manually in browser.

**Files:**
- Create: `src/components/Schedule.tsx`

**Why this task exists:** Displays the weekly program schedule in a card grid, making the site feel like an active radio station. Data comes from config so it's easy to update.

- [ ] **Step 1: Create `src/components/Schedule.tsx`**

```tsx
// src/components/Schedule.tsx
// Program schedule section displaying weekly radio programs in a card grid
// Shows program name, time, days, and description from centralized config
// RELEVANT FILES: src/config.ts, src/App.tsx, src/components/About.tsx

import { Clock, Calendar } from 'lucide-react';
import { PROGRAMS } from '@/config';

export default function Schedule() {
  return (
    <section id="schedule" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Program{' '}
            <span className="bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent">
              Schedule
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Tune in to our weekly programs — inspiring messages, worship, and the Word of God.
          </p>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.07]"
            >
              <h3 className="text-base font-semibold mb-3">{program.name}</h3>

              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span className="text-brand-gold font-medium">{program.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-gray-400">{program.days}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run types`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Schedule.tsx
git commit -m "feat(schedule): add program schedule section component"
```

---

### Task 4: Update Footer with config-driven social links

**TDD scenario:** Modifying existing code — verify visually.

**Files:**
- Modify: `src/components/Footer.tsx`

**Why this task exists:** The footer currently has hardcoded social links pointing to the TV site's accounts. This replaces them with config-driven links that only render when a URL is provided, and adds KingsChat and Twitter/X support.

- [ ] **Step 1: Rewrite `src/components/Footer.tsx`**

```tsx
// src/components/Footer.tsx
// Site footer with config-driven social links and link to TV site
// Only renders social icons for platforms with a configured URL
// RELEVANT FILES: src/config.ts, src/App.tsx, src/components/Header.tsx

import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config';
import type { ComponentType } from 'react';

/** Social platform definitions — order determines display order */
const PLATFORMS: { key: keyof typeof SOCIAL_LINKS; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'twitter', label: 'X / Twitter', icon: Twitter },
  {
    key: 'kingschat',
    label: 'KingsChat',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
];

/** Filter to only platforms with a configured URL */
const activePlatforms = PLATFORMS.filter((p) => SOCIAL_LINKS[p.key]);

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">
          {/* Top row: Copyright and Social */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Loveworld Radio Mongolia. All rights reserved.
            </p>

            {/* Social links — only shown if at least one is configured */}
            {activePlatforms.length > 0 && (
              <div className="flex items-center gap-4">
                {activePlatforms.map((platform) => (
                  <a
                    key={platform.key}
                    href={SOCIAL_LINKS[platform.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.label}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <platform.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 border-t border-white/10">
            <a
              href="https://loveworldtv.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Loveworld TV Mongolia
            </a>
            <a
              href="https://loveworldtv.mn/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="https://loveworldtv.mn/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run types`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "refactor(footer): use config-driven social links with auto-hide"
```

---

### Task 5: Wire everything into App.tsx, remove RadioPlayer, add body padding

**TDD scenario:** Integration — verify full page layout in browser.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Delete: `src/components/RadioPlayer.tsx`

**Why this task exists:** Final integration — swaps RadioPlayer for Schedule, adds StickyPlayer, and ensures content isn't hidden behind the fixed player.

- [ ] **Step 1: Rewrite `src/App.tsx`**

```tsx
// src/App.tsx
// Root application component — single-page layout for Loveworld Radio Mongolia
// Composes header, hero, schedule, about section, footer, and sticky player
// RELEVANT FILES: src/components/Header.tsx, src/components/StickyPlayer.tsx, src/components/Schedule.tsx

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Schedule from '@/components/Schedule';
import About from '@/components/About';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';

export default function App() {
  return (
    <>
      <Header />
      <main className="grow">
        <Hero />
        <Schedule />
        <About />
      </main>
      <Footer />
      <StickyPlayer />
    </>
  );
}
```

- [ ] **Step 2: Delete `src/components/RadioPlayer.tsx`**

```bash
rm src/components/RadioPlayer.tsx
```

- [ ] **Step 3: Verify TypeScript**

Run: `npm run types`
Expected: No errors.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Verify lint**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: wire phase 1 — schedule, sticky player, remove old RadioPlayer

- Replace RadioPlayer with Schedule section in page layout
- Add StickyPlayer fixed to bottom of viewport
- Delete RadioPlayer.tsx (replaced by StickyPlayer)
- All config centralized in src/config.ts"
```

---

## Verification Checklist

After all tasks are complete:

1. `npm run types` — no TypeScript errors
2. `npm run build` — production build succeeds
3. `npm run lint` — no lint errors
4. `npm run preview` — open in browser and verify:
   - Sticky player bar visible at bottom
   - Play button starts audio from the stream
   - Pause button stops audio
   - Volume slider works (desktop), mute toggle works (mobile + desktop)
   - Live indicator shows pulsing green dot
   - Schedule section shows 5 program cards
   - Footer shows no social icons (all URLs empty in config)
   - No reference to RadioPlayer anywhere
   - Page content not obscured by sticky player
   - Responsive: check mobile (375px) and desktop (1440px)
