'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  from: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, from, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-zinc-900 border border-cyan-500 rounded-lg shadow-2xl p-4 max-w-md z-50"
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
