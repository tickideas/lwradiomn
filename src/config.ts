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
