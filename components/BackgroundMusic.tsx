'use client';

import { useCallback, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/lib/audio-manager';
import { useGameStore } from '@/lib/game-store';

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const { gameStage, ending } = useGameStore();

  const startMusic = useCallback(async () => {
    const started =
      gameStage === 4 && ending
        ? await audioManager.playEndingMusic()
        : await audioManager.playBGMusic();
    setIsReady(true);
    return started;
  }, [gameStage, ending]);

  useEffect(() => {
    startMusic();

    const resumeMusic = () => {
      startMusic();
    };

    document.addEventListener('pointerdown', resumeMusic, { once: true });
    document.addEventListener('keydown', resumeMusic, { once: true });

    return () => {
      document.removeEventListener('pointerdown', resumeMusic);
      document.removeEventListener('keydown', resumeMusic);
    };
  }, [startMusic]);

  const toggleMute = () => {
    const newMuteState = audioManager.toggleMute();
    setIsMuted(newMuteState);
    audioManager.playClick();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {isReady && (
        <button
          onClick={toggleMute}
          className="bg-zinc-900/80 backdrop-blur-sm border border-cyan-700/50 p-3 rounded-lg hover:bg-zinc-800 transition-colors group shadow-lg"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX size={20} className="text-zinc-400 group-hover:text-zinc-200" />
          ) : (
            <Volume2 size={20} className="text-cyan-400 group-hover:text-cyan-300" />
          )}
        </button>
      )}
    </div>
  );
}
