'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  from: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, from, show, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`${from}-${message}`}
          initial={{ opacity: 0, y: -28, scale: 0.88 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1.08, 1],
            x: [0, -6, 6, -3, 3, 0],
          }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="fixed top-20 right-4 bg-zinc-900/95 backdrop-blur-md border-2 border-cyan-300 rounded-lg shadow-2xl shadow-cyan-400/30 ring-4 ring-cyan-300/25 p-4 max-w-md z-[500] window-glow"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                From: {from}
              </div>
              <div className="text-sm font-mono text-zinc-300">{message}</div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 ml-4"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
