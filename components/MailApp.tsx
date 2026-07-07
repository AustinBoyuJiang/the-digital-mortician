'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const emails = [
  {
    id: 1,
    from: 'hr@omnicorp.sys',
    subject: 'Mandatory Cyber Security Training',
    date: 'Today, 9:15 AM',
    body: `All employees must complete the new cyber security training module by end of week.

Access via the employee portal with your credentials.

Failure to comply will result in system access revocation.

Remember: Strong passwords save lives. Use memorable combinations like pet names + important years.

- Human Resources Department
OmniCorp Solutions`,
  },
  {
    id: 2,
    from: 'maya.torres@personal.net',
    subject: 'Happy Birthday Little Bro! 🎂',
    date: 'Today, 8:03 AM',
    body: `Hey!

Can't believe you're 35 today! Feels like yesterday we were kids playing in the backyard. Remember building that treehouse in 1989? Good times.

Mom says you're working too hard at OmniCorp. Don't forget to take care of yourself. That place gives me weird vibes tbh.

Also - saw you got a dog! What did you name him again? I forgot but I remember it was something cool and mysterious sounding.

Love you! Come visit soon!
- Maya 💕`,
  },
  {
    id: 3,
    from: 'jin.park@omnicorp.sys',
    subject: 'Re: Lunch plans + cute dog pic!',
    date: 'Yesterday, 4:47 PM',
    body: `Yo!

Just saw the photo you posted in the break room! Your golden retriever is ADORABLE. Cipher is such a perfect name for a tech worker's dog haha. Very fitting for someone working in data security.

Still down for lunch next week? There's this new ramen place downtown.

BTW - did you hear about Justin? They said it was a car accident but... something feels off. He was working on some classified project and then suddenly... gone. 

Maybe I'm being paranoid. This job is getting to me.

Anyway, let me know about lunch!
- Jin`,
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
            className={`p-3 border-b border-zinc-800 cursor-pointer hover:bg-cyan-900/20 transition-colors ${
              selectedEmail === email.id ? 'bg-cyan-900/30 border-l-2 border-l-cyan-500' : ''
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
              <div className="text-xs font-mono text-zinc-500 mb-1">DATE</div>
              <div className="text-sm font-mono text-zinc-400">
                {emails.find((e) => e.id === selectedEmail)?.date}
              </div>
            </div>
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
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
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
