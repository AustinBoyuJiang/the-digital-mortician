'use client';

import { X } from 'lucide-react';
import Draggable from 'react-draggable';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  forceOpen?: boolean;
}

export default function Window({
  title,
  onClose,
  children,
  width = 'w-[600px]',
  height = 'h-[400px]',
  forceOpen = false,
}: WindowProps) {
  return (
    <Draggable handle=".window-title-bar" bounds="parent">
      <div
        className={`absolute ${width} ${height} bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden flex flex-col`}
        style={{ top: '20%', left: '25%', zIndex: 50 }}
      >
        <div className="window-title-bar bg-zinc-800 px-4 py-2 flex items-center justify-between cursor-move border-b border-zinc-700">
          <span className="text-sm font-mono text-zinc-300">{title}</span>
          {!forceOpen && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </Draggable>
  );
}
