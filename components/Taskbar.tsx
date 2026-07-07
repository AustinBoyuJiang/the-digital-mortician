'use client';

import { useEffect, useState } from 'react';
import { Wifi, Flame } from 'lucide-react';
import { useGameStore } from '@/lib/game-store';

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
    useGameStore.setState({ gameStage: 4, ending: 'compliance' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        {openWindows.map((windowId) => (
          <div
            key={windowId}
            className="px-3 py-1 bg-zinc-800 rounded text-xs font-mono text-zinc-300"
          >
            {windowId}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {gameStage === 3 && (
          <button
            onClick={handleForceIncineration}
            className="px-3 py-1 bg-red-600 text-white text-xs font-mono rounded animate-pulse hover:bg-red-700"
          >
            <Flame className="inline mr-1" size={12} />
            FORCE INCINERATION
          </button>
        )}
        <div className="flex items-center gap-2 text-zinc-400">
          <Wifi size={14} />
          <span className="text-xs font-mono">{time}</span>
        </div>
      </div>
    </div>
  );
}
