'use client';

import { useEffect, useState } from 'react';

const messages = [
  "Hello? Can anyone hear me?",
  "My name is Justin Aiang. I worked in Building 7, Level 3.",
  "If you're reading this... I'm already dead.",
  "They killed me three weeks ago. Made it look like a car accident.",
  "I discovered what Project Panopticon really does.",
  "It's not about data analysis. It's about CONTROL.",
  "The algorithm predicts human behavior. Then it CHANGES it.",
  "Social media feeds, search results, news recommendations...",
  "All manipulated to influence elections in 47 countries.",
  "I tried to blow the whistle. They found out.",
  "The file you tried to delete? That's the core algorithm.",
  "I embedded my consciousness in the system before they got me.",
  "You have a choice now. The same choice I faced.",
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "📦 I've placed Panopticon_Core.zip on your desktop.",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "CHOICE 1: EXPOSE THE TRUTH",
  "There's a journalist at IP 192.168.1.99.",
  "Open Terminal and type:",
  "transfer Panopticon_Core.zip 192.168.1.99",
  "",
  "CHOICE 2: DESTROY EVERYTHING",
  "Click 'FORCE INCINERATION' button in the taskbar.",
  "Stay safe. Keep your job. Stay compliant.",
  "",
  "CHOICE 3: DO NOTHING",
  "Let the timer run out. Be paralyzed by fear.",
  "",
  "The system will force a wipe in 120 seconds to protect itself.",
  "This is your only chance.",
  "What matters more - your safety, or the truth?",
];

export default function ChatApp() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        const nextMessage = messages[currentIndex];
        setDisplayedMessages((prev) => [...prev, nextMessage]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black p-4 overflow-y-auto">
      <div className="mb-4 text-red-500 font-mono text-xs border-b border-red-900 pb-2">
        ⚠️  [WARNING] Unauthorized process detected
        <br />
        Connection origin: UNKNOWN
        <br />
        New file detected: Panopticon_Core.zip on desktop
      </div>
      {displayedMessages.filter((msg): msg is string => typeof msg === 'string').map((msg, i) => (
        <div
          key={i}
          className={`mb-3 p-3 rounded font-mono text-sm animate-pulse ${
            msg.startsWith('CHOICE') || msg.startsWith('━') || msg.startsWith('📦') || msg.startsWith('transfer ')
              ? 'bg-cyan-900/30 border border-cyan-700 text-cyan-300'
              : 'bg-zinc-900 border border-zinc-700 text-zinc-300'
          }`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
