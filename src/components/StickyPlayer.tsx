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
