'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { audioManager } from '@/lib/audio-manager';

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const startMusic = async () => {
    await audioManager.playBGMusic();
    setIsReady(true);
    setShowPlayButton(false);
  };

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (!isReady) {
        await startMusic();
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [isReady]);

  const toggleMute = () => {
    const newMuteState = audioManager.toggleMute();
    setIsMuted(newMuteState);
    audioManager.playClick();
  };

  const handleManualStart = async () => {
    await startMusic();
    audioManager.playClick();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {showPlayButton && (
        <button
          onClick={handleManualStart}
          className="bg-cyan-900/80 backdrop-blur-sm border border-cyan-500/50 p-3 rounded-lg hover:bg-cyan-800 transition-colors group shadow-lg animate-pulse"
          title="Start Music"
        >
          <Play size={20} className="text-cyan-400 group-hover:text-cyan-300" />
        </button>
      )}
      
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
