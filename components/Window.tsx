'use client';

import { X } from 'lucide-react';
import Draggable from 'react-draggable';
import { useRef } from 'react';
import { useGameStore } from '@/lib/game-store';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  forceOpen?: boolean;
  windowId: string;
}

export default function Window({
  title,
  onClose,
  children,
  width = 'w-[600px]',
  height = 'h-[400px]',
  forceOpen = false,
  windowId,
}: WindowProps) {
  const nodeRef = useRef(null);
  const { activeWindow, setActiveWindow } = useGameStore();
  const isActive = activeWindow === windowId;

  const handleMouseDown = () => {
    setActiveWindow(windowId);
  };

  return (
    <Draggable 
      handle=".window-title-bar" 
      nodeRef={nodeRef}
      bounds="parent"
      onStart={handleMouseDown}
    >
      <div
        ref={nodeRef}
        className={`absolute ${width} ${height} bg-zinc-900/95 backdrop-blur-md border rounded-lg shadow-2xl overflow-hidden flex flex-col ${
          isActive ? 'border-cyan-500/70 window-glow' : 'border-cyan-900/30'
        }`}
        style={{ 
          top: '15%', 
          left: '20%', 
          zIndex: isActive ? 100 : 50,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={`window-title-bar px-4 py-2 flex items-center justify-between cursor-move border-b ${
          isActive ? 'bg-gradient-to-r from-cyan-900 to-zinc-900 border-cyan-700/50' : 'bg-gradient-to-r from-zinc-800 to-zinc-900 border-cyan-900/30'
        }`}>
          <span className={`text-sm font-mono font-semibold ${
            isActive ? 'text-cyan-300' : 'text-cyan-500/70'
          }`}>{title}</span>
          {!forceOpen && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-red-500 transition-colors hover:scale-110"
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
