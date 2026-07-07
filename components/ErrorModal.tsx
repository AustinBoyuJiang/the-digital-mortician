'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { audioManager } from '@/lib/audio-manager';

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
}

export default function ErrorModal({ show, onClose }: ErrorModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-red-950/95 backdrop-blur-md border-4 border-red-600 rounded-lg p-8 max-w-md shadow-2xl shadow-red-900/50"
      >
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle size={48} className="text-red-500" />
          <div>
            <div className="text-2xl font-mono font-bold text-red-500">
              ERROR 0x88
            </div>
            <div className="text-sm font-mono text-red-300">
              PERMISSION DENIED
            </div>
          </div>
        </div>
        <div className="font-mono text-sm text-zinc-300 mb-6">
          File locked by external node.
          <br />
          Unauthorized access attempt logged.
          <br />
          Contact System Administrator.
        </div>
        <button
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-mono py-2 px-4 rounded"
        >
          ACKNOWLEDGE
        </button>
      </motion.div>
    </div>
  );
}
