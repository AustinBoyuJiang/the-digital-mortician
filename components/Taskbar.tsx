'use client';

import { useEffect, useState } from 'react';
import { Wifi, Flame } from 'lucide-react';
import { useGameStore } from '@/lib/game-store';
import { audioManager } from '@/lib/audio-manager';

export default function Taskbar() {
  const [time, setTime] = useState('');
  const { openWindows, gameStage } = useGameStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleForceIncineration = () => {
    audioManager.playClick();
    audioManager.playSuccess();
    useGameStore.setState({ gameStage: 4, ending: 'compliance' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-950 via-zinc-950 to-zinc-950/90 backdrop-blur-md border-t border-cyan-900/30 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        {openWindows.map((windowId) => (
          <div
            key={windowId}
            className="px-4 py-2 bg-zinc-800/80 backdrop-blur-sm border border-cyan-900/30 rounded text-xs font-mono text-cyan-400 shadow-lg"
          >
            {windowId}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {gameStage === 3 && (
          <button
            onClick={handleForceIncineration}
            className="px-4 py-2 bg-red-600 text-white text-xs font-mono font-bold rounded animate-pulse hover:bg-red-700 shadow-lg shadow-red-900/50 border border-red-500"
          >
            <Flame className="inline mr-1" size={14} />
            FORCE INCINERATION
          </button>
        )}
        <div className="flex items-center gap-3 text-cyan-400 bg-zinc-900/50 px-3 py-2 rounded border border-cyan-900/30">
          <Wifi size={16} className="animate-pulse" />
          <span className="text-sm font-mono font-semibold">{time}</span>
        </div>
      </div>
    </div>
  );
}
