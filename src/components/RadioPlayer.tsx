// src/components/RadioPlayer.tsx
// Embedded radio player section with placeholder for the streaming service embed
// Designed to accept any iframe-based radio embed (e.g., Airtime, Radio.co, Shoutcast, etc.)
// RELEVANT FILES: src/App.tsx, src/components/Hero.tsx, src/components/About.tsx

import { Radio, Headphones, Volume2 } from 'lucide-react';

/**
 * CONFIGURATION:
 * Replace the placeholder below with the actual embed code from your radio streaming service.
 *
 * Common services and their embed formats:
 *
 * Radio.co:
 *   <iframe src="https://embed.radio.co/player/YOUR_ID.html" width="100%" height="200" frameBorder="0" />
 *
 * Airtime Pro / LibreTime:
 *   <iframe src="https://YOUR_STATION.airtime.pro/embed/player?stream=auto" width="100%" height="200" frameBorder="0" />
 *
 * Shoutcast:
 *   <iframe src="https://YOUR_SERVER:PORT/played.html" width="100%" height="200" frameBorder="0" />
 *
 * Zeno.FM:
 *   <iframe src="https://zeno.fm/player/YOUR_STATION" width="100%" height="200" frameBorder="0" />
 *
 * Live365:
 *   <iframe src="https://embed.live365.com/player?station=YOUR_ID" width="100%" height="200" frameBorder="0" />
 *
 * Simply replace the RADIO_EMBED_URL constant or swap the placeholder div with your embed iframe.
 */

// TODO: Replace with actual embed URL from chosen radio service
const RADIO_EMBED_URL = '';

export default function RadioPlayer() {
  return (
    <section id="player" className="relative py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Player card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          {/* Decorative top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

          <div className="p-6 sm:p-8">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
              <Headphones className="w-5 h-5 text-brand-gold" />
              <span className="text-sm font-semibold text-brand-gold tracking-wide uppercase">
                Listen Live
              </span>
            </div>

            {RADIO_EMBED_URL ? (
              /* Actual radio player embed */
              <div className="w-full rounded-xl overflow-hidden bg-black/20">
                <iframe
                  src={RADIO_EMBED_URL}
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allow="autoplay"
                  title="Loveworld Radio Mongolia Live Stream"
                  className="w-full"
                  style={{ minHeight: '200px' }}
                />
              </div>
            ) : (
              /* Placeholder — shown until embed URL is configured */
              <div className="w-full rounded-xl bg-black/20 border border-white/5 p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-4">
                  <Radio className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Radio Player</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Coming soon — stay tuned!
                </p>
              </div>
            )}

            {/* Info bar below player */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Volume2 className="w-4 h-4" />
                <span>Broadcasting 24/7 from Mongolia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-green-400 font-medium">On Air</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
