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
