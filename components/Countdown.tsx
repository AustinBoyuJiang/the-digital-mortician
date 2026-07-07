'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game-store';

export default function Countdown() {
  const { countdown, setCountdown, gameStage, setGameStage, setEnding } =
    useGameStore();

  useEffect(() => {
    if (gameStage !== 3) return;

    const interval = setInterval(() => {
      setCountdown(countdown - 1);
      if (countdown <= 1) {
        clearInterval(interval);
        setGameStage(4);
        setEnding('terminated');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, gameStage, setCountdown, setGameStage, setEnding]);

  if (gameStage !== 3) return null;

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-mono text-xl px-6 py-3 rounded-lg shadow-2xl z-50 border-2 border-red-400"
    >
      MANDATORY WIPE IN: {countdown}s
    </motion.div>
  );
}
