'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/game-store';

export default function TerminalApp() {
  const [lines, setLines] = useState<string[]>([
    'OmniCorp Terminal v2.1.5',
    'Type "help" for available commands',
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
        setLines((prev) => [
          ...prev,
          '> ' + '*'.repeat(cmd.length),
          '',
          '[ACCESS GRANTED]',
          'Decrypting Q3_Financials.enc...',
          '',
          '██████████████████ 100%',
          '',
          'PROJECT PANOPTICON REVEALED',
          '================================',
          'Classification: TOP SECRET',
          'Subject: Algorithmic Social Control',
          'Objective: Deploy predictive models to influence',
          'electoral outcomes across 47 territories.',
          'Status: ACTIVE - Phase 3 deployment scheduled',
          '',
          'Additional files unlocked:',
          '- Panopticon_Core.zip',
          '- Election_Targets.db',
          '- Manipulation_Protocols.pdf',
          '',
        ]);
        setPasswordMode(false);
        setGameStage(3);
      } else {
        setLines((prev) => [
          ...prev,
          '> ' + '*'.repeat(cmd.length),
          'ERROR: Invalid password',
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
        'Available commands:',
        '  help       - Show this message',
        '  ls         - List files',
        '  decrypt    - Decrypt locked files',
        '  transfer   - Transfer files to remote host',
        '  clear      - Clear terminal',
        '',
      ]);
    } else if (command === 'ls') {
      setLines((prev) => [
        ...prev,
        '> ' + cmd,
        '',
        'Personal_Photos/       [DELETED]',
        'Q3_Financials.enc      [LOCKED]',
        gameStage >= 3 ? 'Panopticon_Core.zip    [DECRYPTED]' : '',
        '',
      ]);
    } else if (command.startsWith('decrypt')) {
      if (gameStage < 2) {
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          'ERROR: No encrypted files accessible',
          '',
        ]);
      } else {
        setDecryptAttempted(true);
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          '',
          'Target: Q3_Financials.enc',
          'Enter password:',
        ]);
        setPasswordMode(true);
      }
    } else if (command.startsWith('transfer')) {
      if (gameStage < 3) {
        setLines((prev) => [
          ...prev,
          '> ' + cmd,
          'ERROR: No files available for transfer',
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
            'Initiating secure transfer...',
            'Target: 192.168.1.99',
            'File: Panopticon_Core.zip (2.4 GB)',
            '',
            '████████████████░░ 89%',
          ]);
          setTimeout(() => {
            setGameStage(4);
            useGameStore.setState({ ending: 'truth' });
          }, 2000);
        } else {
          setLines((prev) => [
            ...prev,
            '> ' + cmd,
            'ERROR: Invalid transfer syntax',
            'Usage: transfer <file> <ip>',
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
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-sm overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className="text-green-400">
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-green-400">
          {passwordMode ? 'password:' : '>'}{' '}
        </span>
        <input
          ref={inputRef}
          type={passwordMode ? 'password' : 'text'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-green-400 outline-none ml-2"
          autoFocus
        />
      </form>
    </div>
  );
}
