// src/components/Hero.tsx
// Hero section with animated background, headline, and live indicator
// Creates an engaging first impression with brand-consistent design
// RELEVANT FILES: src/App.tsx, src/components/RadioPlayer.tsx, src/index.css

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-primary/30 to-brand-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-orange/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-gold/10 blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-light/5 blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full px-4 py-1.5 mb-6 sm:mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange" />
          </span>
          <span className="text-sm font-semibold text-brand-orange tracking-wide">LIVE NOW</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
          Loveworld Radio{' '}
          <span className="bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent">
            Mongolia
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Inspiring messages, uplifting music, and life-changing programs — broadcasting live 24/7 across Mongolia.
        </p>
      </div>
    </section>
  );
}
