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
import BackgroundMusic from '@/components/BackgroundMusic';
import PhotosApp from '@/components/PhotosApp';
import { useGameStore } from '@/lib/game-store';
import { audioManager } from '@/lib/audio-manager';

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
    ending,
  } = useGameStore();

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastFrom, setToastFrom] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (gameStage === 0) {
      setToastMessage(
        "Welcome, Operator. Open Personal_Photos to inspect the assigned file."
      );
      setToastFrom('System_Admin');
      setShowToast(true);
      audioManager.playNotification();
    }
  }, [gameStage]);

  useEffect(() => {
    if (gameStage === 3) {
      setGlitching(true);
      audioManager.playGlitch();
      setTimeout(() => {
        openWindow('Justin_Echo.exe');
        setToastMessage('Unauthorized protocol. Mandatory wipe in 120s. Panopticon_Core.zip now on desktop!');
        setToastFrom('System_Admin');
        setShowToast(true);
        audioManager.playNotification();
      }, 1000);
    }
  }, [gameStage, setGlitching, openWindow]);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleOpenPhotos = () => {
    openWindow('Personal_Photos');
    if (gameStage === 0) {
      setToastMessage('Inspection complete. Drag the Personal_Photos folder to the Incinerator.');
      setToastFrom('System_Admin');
      setShowToast(true);
      audioManager.playNotification();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem === 'Personal_Photos' && gameStage === 0) {
      closeWindow('Personal_Photos');
      audioManager.playDrop();
      audioManager.playSuccess();
      setGameStage(1);
      setTimeout(() => {
        setToastMessage('Personal photos deleted. New task: Drag Q3_Financials to the Incinerator.');
        setToastFrom('System_Admin');
        setShowToast(true);
      }, 1000);
    } else if (draggedItem === 'Q3_Financials' && gameStage >= 1) {
      audioManager.playDrop();
      audioManager.playError();
      setShowError(true);
      if (gameStage === 1) {
        setGameStage(2);
        setTimeout(() => {
          setToastMessage('File locked. Use Terminal to investigate, then check Mail for clues.');
          setToastFrom('System');
          setShowToast(true);
        }, 2000);
      }
    } else if (draggedItem === 'Panopticon_Core' && gameStage >= 3) {
      audioManager.playDrop();
      setToastMessage('Cannot delete Panopticon_Core.zip directly! Use Terminal "transfer" command or Force Incineration button.');
      setToastFrom('System');
      setShowToast(true);
    }
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main className="relative w-screen h-screen bg-zinc-950 overflow-hidden desktop-bg grid-pattern">
      <BackgroundMusic />
      
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
        <div className="h-[calc(100vh-3.5rem)] box-border p-8 flex flex-col flex-wrap content-start items-start gap-6 overflow-hidden">
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
            disabled={gameStage === 0}
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
            onClick={gameStage === 0 ? handleOpenPhotos : undefined}
          />
          {gameStage >= 1 && gameStage < 4 && (
            <DesktopIcon
              icon={Folder}
              label="Q3_Financials"
              draggable={gameStage < 3}
              onDragStart={gameStage < 3 ? () => handleDragStart('Q3_Financials') : undefined}
            />
          )}
          {gameStage >= 3 && (
            <DesktopIcon
              icon={Folder}
              label="Panopticon_Core"
              draggable={true}
              onDragStart={() => handleDragStart('Panopticon_Core')}
            />
          )}
        </div>

        {openWindows.includes('Personal_Photos') && (
          <Window
            title="Personal_Photos"
            onClose={() => closeWindow('Personal_Photos')}
            width="w-[800px]"
            height="h-[600px]"
            windowId="Personal_Photos"
          >
            <PhotosApp />
          </Window>
        )}

        {openWindows.includes('Mail') && (
          <Window title="Mail" onClose={() => closeWindow('Mail')} windowId="Mail">
            <MailApp />
          </Window>
        )}

        {openWindows.includes('Terminal') && (
          <Window
            title="Terminal"
            onClose={() => closeWindow('Terminal')}
            width="w-[700px]"
            height="h-[500px]"
            windowId="Terminal"
          >
            <TerminalApp />
          </Window>
        )}

        {openWindows.includes('Justin_Echo.exe') && (
          <Window
            title="Justin_Echo.exe [UNAUTHORIZED]"
            onClose={() => {}}
            forceOpen={true}
            width="w-[500px]"
            height="h-[450px]"
            windowId="Justin_Echo.exe"
          >
            <ChatApp />
          </Window>
        )}

        <Toast
          message={toastMessage}
          from={toastFrom}
          show={showToast && gameStage !== 4 && !ending}
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
