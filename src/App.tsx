// src/App.tsx
// Root application component — single-page layout for Loveworld Radio Mongolia
// Composes header, hero, radio player, about section, and footer into one page
// RELEVANT FILES: src/components/Header.tsx, src/components/RadioPlayer.tsx, src/components/Footer.tsx

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RadioPlayer from '@/components/RadioPlayer';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main className="grow">
        <Hero />
        <RadioPlayer />
        <About />
      </main>
      <Footer />
    </>
  );
}
