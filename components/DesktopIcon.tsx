'use client';

import { LucideIcon } from 'lucide-react';

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
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 w-24 h-24 ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
      } hover:bg-zinc-800/50 rounded-lg transition-all group`}
      onClick={disabled ? undefined : onClick}
      draggable={!disabled && draggable}
      onDragStart={!disabled && draggable ? onDragStart : undefined}
    >
      <Icon
        size={40}
        className={`${
          disabled ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-zinc-200'
        } transition-colors`}
      />
      <span
        className={`text-xs font-mono mt-2 ${
          disabled ? 'text-zinc-600' : 'text-zinc-300'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
