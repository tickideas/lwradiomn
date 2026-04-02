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
