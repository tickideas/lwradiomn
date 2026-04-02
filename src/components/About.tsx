// src/components/About.tsx
// About section describing Loveworld Radio Mongolia's mission
// Provides context and key features below the radio player
// RELEVANT FILES: src/App.tsx, src/components/RadioPlayer.tsx, src/components/Footer.tsx

import { Heart, Globe, Music, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Inspiring Messages',
    description: 'Life-changing teachings and sermons to uplift your spirit every day.',
  },
  {
    icon: Music,
    title: 'Uplifting Music',
    description: 'Worship songs and gospel music that bring peace and joy to your heart.',
  },
  {
    icon: BookOpen,
    title: 'Bible Studies',
    description: 'In-depth study of the Word to deepen your understanding and faith.',
  },
  {
    icon: Globe,
    title: 'Reaching Mongolia',
    description: 'Broadcasting the gospel across Mongolia in the local language, 24/7.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Loveworld Radio Mongolia is dedicated to spreading the message of God's love
            to every corner of Mongolia through inspiring radio programming.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
