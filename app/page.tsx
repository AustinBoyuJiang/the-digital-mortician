'use client';

import { useEffect, useState } from 'react';
import { Mail, Terminal, Flame, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import Taskbar from '@/components/Taskbar';
import MailApp from '@/components/MailApp';
import TerminalApp from '@/components/TerminalApp';
import ChatApp from '@/components/ChatApp';
import Toast from '@/components/Toast';
import ErrorModal from '@/components/ErrorModal';
import Countdown from '@/components/Countdown';
import EndingScreen from '@/components/EndingScreen';
import { useGameStore } from '@/lib/game-store';

export default function Home() {
  const {
    gameStage,
    isGlitching,
    openWindows,
    openWindow,
    closeWindow,
    setGameStage,
    setGlitching,
    decryptAttempted,
  } = useGameStore();

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastFrom, setToastFrom] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (gameStage === 0) {
      setToastMessage(
        "Welcome, Operator. Drag 'Personal_Photos' to the Incinerator."
      );
      setToastFrom('System_Admin');
      setShowToast(true);
    }
  }, [gameStage]);

  useEffect(() => {
    if (gameStage === 3) {
      setGlitching(true);
      setTimeout(() => {
        openWindow('Elias_Echo.exe');
        setToastMessage('Unauthorized protocol. Mandatory wipe in 60s.');
        setToastFrom('System_Admin');
        setShowToast(true);
      }, 1000);
    }
  }, [gameStage, setGlitching, openWindow]);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem === 'Personal_Photos' && gameStage === 0) {
      setGameStage(1);
      setToastMessage('File deleted. System unlocked.');
      setToastFrom('System_Admin');
      setShowToast(true);
    } else if (draggedItem === 'Q3_Financials' && gameStage >= 1) {
      setShowError(true);
      if (gameStage === 1) {
        setGameStage(2);
      }
    }
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main className="relative w-screen h-screen bg-zinc-950 overflow-hidden">
      <motion.div
        animate={
          isGlitching
            ? {
                x: [0, -2, 2, -2, 0],
                filter: [
                  'hue-rotate(0deg)',
                  'hue-rotate(90deg)',
                  'hue-rotate(180deg)',
                  'hue-rotate(0deg)',
                ],
              }
            : {}
        }
        transition={{ repeat: isGlitching ? Infinity : 0, duration: 0.3 }}
        className="w-full h-full"
      >
        <div className="p-8 grid grid-cols-6 gap-4">
          <DesktopIcon
            icon={Mail}
            label="Mail"
            onClick={() => openWindow('Mail')}
            disabled={gameStage === 0}
          />
          <DesktopIcon
            icon={Terminal}
            label="Terminal"
            onClick={() => openWindow('Terminal')}
            disabled={gameStage === 0 || (gameStage === 2 && !decryptAttempted)}
          />
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="cursor-pointer"
          >
            <DesktopIcon icon={Flame} label="Incinerator" />
          </div>
          <DesktopIcon
            icon={Folder}
            label="Personal_Photos"
            disabled={gameStage !== 0}
            draggable={gameStage === 0}
            onDragStart={() => handleDragStart('Personal_Photos')}
          />
          {gameStage >= 1 && (
            <DesktopIcon
              icon={Folder}
              label="Q3_Financials"
              draggable={true}
              onDragStart={() => handleDragStart('Q3_Financials')}
            />
          )}
        </div>

        {openWindows.includes('Mail') && (
          <Window title="Mail" onClose={() => closeWindow('Mail')}>
            <MailApp />
          </Window>
        )}

        {openWindows.includes('Terminal') && (
          <Window
            title="Terminal"
            onClose={() => closeWindow('Terminal')}
            width="w-[700px]"
            height="h-[500px]"
          >
            <TerminalApp />
          </Window>
        )}

        {openWindows.includes('Elias_Echo.exe') && (
          <Window
            title="Elias_Echo.exe [UNAUTHORIZED]"
            onClose={() => {}}
            forceOpen={true}
            width="w-[500px]"
            height="h-[450px]"
          >
            <ChatApp />
          </Window>
        )}

        <Toast
          message={toastMessage}
          from={toastFrom}
          show={showToast}
          onClose={() => setShowToast(false)}
        />

        <ErrorModal show={showError} onClose={() => setShowError(false)} />

        <Countdown />

        <Taskbar />

        <EndingScreen />
      </motion.div>
    </main>
  );
}
