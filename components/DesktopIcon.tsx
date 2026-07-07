'use client';

import { LucideIcon } from 'lucide-react';
import { audioManager } from '@/lib/audio-manager';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

export default function DesktopIcon({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  draggable = false,
  onDragStart,
}: DesktopIconProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      audioManager.playClick();
      onClick();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!disabled && onDragStart) {
      audioManager.playDragStart();
      onDragStart(e);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      audioManager.playHover();
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 w-28 h-28 ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
      } hover:bg-cyan-900/10 rounded-lg transition-all group border border-transparent hover:border-cyan-900/30`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      draggable={!disabled && draggable}
      onDragStart={handleDragStart}
    >
      <Icon
        size={48}
        className={`${
          disabled ? 'text-zinc-700' : 'text-cyan-500/80 group-hover:text-cyan-400 group-hover:icon-glow'
        } transition-all group-hover:scale-110`}
      />
      <span
        className={`text-xs font-mono mt-2 ${
          disabled ? 'text-zinc-700' : 'text-zinc-400 group-hover:text-cyan-400'
        } transition-colors`}
      >
        {label}
      </span>
    </div>
  );
}
