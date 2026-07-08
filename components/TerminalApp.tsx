'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/game-store';
import { audioManager } from '@/lib/audio-manager';

export default function TerminalApp() {
  const [lines, setLines] = useState<string[]>([
    '╔═══════════════════════════════════════════╗',
    '║       OmniCorp Terminal v2.1.5            ║',
    '║       Secure Data Management System       ║',
    '╚═══════════════════════════════════════════╝',
    '',
    '👤 User: operator_7734',
    '📅 Date: ' + new Date().toLocaleDateString(),
    '⏰ Time: ' + new Date().toLocaleTimeString(),
    '',
    '💡 Type "help" to see available commands',
    '💡 Type "ls" to list files',
    '',
  ]);
  const [input, setInput] = useState('');
  const [passwordMode, setPasswordMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { gameStage, setGameStage, decryptAttempted, setDecryptAttempted } =
    useGameStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    if (passwordMode) {
      if (command === 'cipher1989') {
        audioManager.playSuccess();
        setLines((prev) => [
          ...prev,
          '> ' + '*'.repeat(cmd.length),
          '',
          '✅ [ACCESS GRANTED]',
          '═══════════════════════════════════════',
          '',
          '🔓 Decrypting Q3_Financials.enc...',
          '',
          '██████████░░░░░░░░░░ 50%',
          '████████████████████ 100%',
          '',
          '📄 FILE DECRYPTED SUCCESSFULLY',
          '',
          '╔═══════════════════════════════════════════════╗',
          '║     PROJECT PANOPTICON - TOP SECRET           ║',
          '╚═══════════════════════════════════════════════╝',
          '',
          'Classification: LEVEL 5 - EYES ONLY',
          'Project Lead: Director Sarah Chen',
          'Status: ACTIVE - Phase 3 Deployment',
          '',
          '📋 OBJECTIVE:',
          'Deploy predictive behavioral algorithms across',
          'social media platforms to influence electoral',
          'outcomes in 47 target territories.',
          '',
          '🎯 METHODOLOGY:',
          '- Real-time sentiment manipulation',
          '- Targeted misinformation distribution',
          '- Echo chamber reinforcement',
          '- Opposition voice suppression',
          '',
          '📊 SUCCESS METRICS:',
          '- 23 elections successfully influenced',
          '- 89% target outcome achievement',
          '- Zero public awareness maintained',
          '',
          '⚠️  SECURITY NOTICE:',
          'This information is classified. Unauthorized',
          'disclosure will result in immediate termination.',
          '',
          '📦 Additional files now accessible:',
          '   • Panopticon_Core.zip [2.4 GB]',
          '   • Election_Targets.db',
          '   • Manipulation_Protocols.pdf',
          '',
          '💡 Type "ls" to see updated file list',
          '',
        ]);
        setPasswordMode(false);
        setGameStage(3);
      } else {
        audioManager.playError();
        setLines((prev) => [
          ...prev,
          '> ' + '*'.repeat(cmd.length),
          '',
          '❌ ERROR: Invalid password',
          '',
          '💡 Hint: Remember the emails!',
          '   Dog name: Starts with "C"',
          '   Special year: Mentioned by your sister',
          '',
        ]);
        setPasswordMode(false);
      }
      return;
    }

    if (command === 'help') {
      setLines((prev) => [
        ...prev,
        '> ' + cmd,
        '',
        '╔════════════════════════════════════════╗',
        '║        AVAILABLE COMMANDS              ║',
        '╚════════════════════════════════════════╝',
        '',
        '  help       - Show this help message',
        '  ls         - List all files in directory',
        '  decrypt    - Decrypt locked files',
        '             Usage: decrypt <filename>',
        '  transfer   - Send files to remote host',
        '             Usage: transfer <file> <ip>',
        '  clear      - Clear terminal screen',
        '',
        '💡 TIP: Check your emails for password hints!',
        '',
      ]);
    } else if (command === 'ls') {
      setLines((prev) => [
        ...prev,
        '> ' + cmd,
        '',
        '📁 Directory Listing:',
        '─────────────────────────────────────',
        '',
        '  Personal_Photos/       [DELETED]',
        gameStage >= 3
          ? '  Q3_Financials.enc      🔓 [DECRYPTED]'
          : gameStage >= 1
            ? '  Q3_Financials.enc      🔒 [LOCKED - needs password]'
            : '',
        gameStage >= 3 ? '  Panopticon_Core.zip    [DECRYPTED - ready to transfer]' : '',
        '',
        gameStage < 3 ? '💡 TIP: Use "decrypt Q3_Financials" to unlock' : '',
        gameStage >= 3 ? '💡 TIP: Use "transfer Panopticon_Core.zip 192.168.1.99"' : '',
        '',
      ]);
    } else if (command.startsWith('decrypt')) {
      if (gameStage < 2) {
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          '',
          '❌ ERROR: No encrypted files accessible',
          '',
          '💡 Hint: Try dragging Q3_Financials to the Incinerator first',
          '',
        ]);
      } else {
        setDecryptAttempted(true);
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          '',
          '🔐 Attempting to decrypt: Q3_Financials.enc',
          '─────────────────────────────────────',
          '',
          '⚠️  This file is password protected.',
          '',
          '💡 HINT: Check your emails!',
          '   • Your sister mentioned a special year',
          '   • Your colleague mentioned your dog\'s name',
          '   • Try combining them: <DogName><Year>',
          '',
          'Enter password:',
        ]);
        setPasswordMode(true);
      }
    } else if (command.startsWith('transfer')) {
      if (gameStage < 3) {
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          '',
          '❌ ERROR: No files available for transfer',
          '',
          '💡 You need to decrypt Q3_Financials first',
          '',
        ]);
      } else {
        const parts = command.split(' ');
        if (
          parts.includes('panopticon_core.zip') &&
          parts.includes('192.168.1.99')
        ) {
          setLines((prev) => [
            ...prev,
            '> ' + cmd,
            '',
            '📡 Initiating secure transfer...',
            '═══════════════════════════════════════',
            '',
            '🎯 Target Host: 192.168.1.99',
            '📦 File: Panopticon_Core.zip (2.4 GB)',
            '🔐 Encryption: AES-256',
            '',
            '████████████████░░ 89%',
            '',
            '⏳ Uploading...',
          ]);
          setTimeout(() => {
            audioManager.playSuccess();
            setGameStage(4);
            useGameStore.setState({ ending: 'truth' });
          }, 2000);
        } else {
          setLines((prev) => [
            ...prev,
            '> ' + cmd,
            '',
            '❌ ERROR: Invalid transfer syntax',
            '',
            '💡 Correct usage:',
            '   transfer Panopticon_Core.zip 192.168.1.99',
            '',
            '💡 TIP: You can copy-paste this command!',
            '',
          ]);
        }
      }
    } else if (command === 'clear') {
      setLines(['']);
    } else if (command === '') {
      setLines((prev) => [...prev, '']);
    } else {
      setLines((prev) => [
        ...prev,
        '> ' + cmd,
        `Command not found: ${cmd}`,
        '',
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      audioManager.playClick();
      handleCommand(input);
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioManager.playTerminalType();
    setInput(e.target.value);
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-sm overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className="text-green-400 mb-0.5">
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center mt-1">
        <span className="text-green-400">
          {passwordMode ? '🔐 password:' : '>'}{' '}
        </span>
        <input
          ref={inputRef}
          type={passwordMode ? 'password' : 'text'}
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-transparent text-green-400 outline-none ml-2"
          autoFocus
          placeholder={passwordMode ? '' : 'Type "help" for commands'}
        />
      </form>
    </div>
  );
}
