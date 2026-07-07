'use client';

import { useEffect, useState } from 'react';

const messages = [
  "They killed me for this code.",
  "It controls algorithms to manipulate elections.",
  "You must send Panopticon_Core.zip to IP 192.168.1.99.",
  "Don't let them burn it.",
  "My name was Elias. I was a developer here.",
  "They found out I knew. They made it look like an accident.",
  "You're the only one who can expose this now.",
];

export default function ChatApp() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setDisplayedMessages((prev) => [...prev, messages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black p-4 overflow-y-auto">
      <div className="mb-4 text-red-500 font-mono text-xs border-b border-red-900 pb-2">
        [WARNING] Unauthorized process detected
        <br />
        Connection origin: UNKNOWN
      </div>
      {displayedMessages.map((msg, i) => (
        <div
          key={i}
          className="mb-3 bg-zinc-900 border border-zinc-700 p-3 rounded font-mono text-sm text-zinc-300 animate-pulse"
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
