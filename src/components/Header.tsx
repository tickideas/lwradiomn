// src/components/Header.tsx
// Fixed navigation header with logo and links to TV site
// Provides consistent branding matching loveworldtv.mn
// RELEVANT FILES: src/App.tsx, src/components/Footer.tsx, public/assets/logo.png

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-sm shadow-lg border-b border-white/5">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 lg:px-20 xl:px-36">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/assets/logo.png"
              alt="Loveworld Radio Mongolia"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-wide leading-tight">
                Loveworld Radio
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-widest uppercase leading-tight">
                Mongolia
              </span>
            </div>
          </a>

          {/* Link to TV site */}
          <a
            href="https://loveworldtv.mn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Visit Loveworld TV
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
