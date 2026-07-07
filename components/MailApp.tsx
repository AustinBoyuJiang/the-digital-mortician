'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const emails = [
  {
    id: 1,
    from: 'hr@omnicorp.sys',
    subject: 'Mandatory Cyber Security Training',
    body: 'All employees must complete the new cyber security training module by end of week. Access via the employee portal. Failure to comply will result in system access revocation.',
  },
  {
    id: 2,
    from: 'sister_maya@personal.net',
    subject: 'Happy 35th Birthday!',
    body: "Can't believe it's been so long since 1989! Remember when we used to play in the backyard? Time flies. Hope work isn't too stressful. Love you!",
  },
  {
    id: 3,
    from: 'colleague_jin@omnicorp.sys',
    subject: 'Cute pic of your dog!',
    body: "Just saw the photo you posted! Is Cipher a golden retriever? He's adorable! We should grab coffee sometime and you can tell me more about him.",
  },
];

export default function MailApp() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-zinc-700 overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email.id)}
            className={`p-3 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800 ${
              selectedEmail === email.id ? 'bg-zinc-800' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Mail size={12} className="text-cyan-500" />
              <div className="text-xs font-mono text-zinc-400">
                {email.from}
              </div>
            </div>
            <div className="text-sm font-mono text-zinc-300">
              {email.subject}
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-4 overflow-y-auto">
        {selectedEmail ? (
          <div>
            <div className="mb-4">
              <div className="text-xs font-mono text-zinc-500 mb-1">FROM</div>
              <div className="text-sm font-mono text-zinc-300">
                {emails.find((e) => e.id === selectedEmail)?.from}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs font-mono text-zinc-500 mb-1">
                SUBJECT
              </div>
              <div className="text-sm font-mono text-zinc-300">
                {emails.find((e) => e.id === selectedEmail)?.subject}
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-500 mb-1">MESSAGE</div>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed">
              {emails.find((e) => e.id === selectedEmail)?.body}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-sm">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}
