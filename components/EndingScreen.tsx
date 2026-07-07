'use client';

import { motion } from 'framer-motion';
import { useGameStore, Ending } from '@/lib/game-store';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const endings: Record<
  Exclude<Ending, null>,
  { bg: string; text: string; message: string[] }
> = {
  truth: {
    bg: 'bg-white',
    text: 'text-black',
    message: [
      'TRANSFER COMPLETE',
      '',
      '✅ Panopticon_Core.zip successfully delivered',
      'Recipient: Independent Journalist - IP 192.168.1.99',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '📰 BREAKING NEWS - Global networks receiving data...',
      '',
      '"TECH GIANT\'S ELECTION MANIPULATION EXPOSED"',
      '"LEAKED DOCUMENTS REVEAL SYSTEMATIC VOTER INFLUENCE"',
      '"47 COUNTRIES AFFECTED BY ALGORITHMIC CONTROL"',
      '',
      'The truth is spreading faster than they can contain it.',
      '',
      '⚠️  SYSTEM ALERT:',
      'Your terminal access: REVOKED',
      'Employee status: TERMINATED',
      'Legal action: PENDING',
      '',
      'OmniCorp security protocols activated.',
      'You are locked out forever.',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'But the world will know.',
      'Democracy has a fighting chance.',
      '',
      'You chose truth over safety.',
      'Justin would be proud.',
      '',
      '— THE TRUTH ENDING —',
    ],
  },
  compliance: {
    bg: 'bg-blue-900',
    text: 'text-blue-100',
    message: [
      'INCINERATION COMPLETE',
      '',
      '🔥 All flagged files successfully destroyed.',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '✓ Q3_Financials.enc — DELETED',
      '✓ Panopticon_Core.zip — DELETED',
      '✓ Election_Targets.db — DELETED',
      '✓ Justin_Echo.exe — PURGED',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '📧 FROM: Director Sarah Chen',
      '📝 SUBJECT: Exemplary Conduct',
      '',
      '"Thank you for your compliance and discretion."',
      '"Your loyalty has been noted."',
      '"Promotion to Senior Data Analyst - approved."',
      '"Salary increase: +40%"',
      '"Additional security clearance: granted."',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🌐 MEANWHILE...',
      '',
      'OmniCorp algorithmic deployment: ACTIVE',
      'Phase 3 global rollout: COMPLETE',
      '47 territories now under influence',
      'Electoral outcomes: OPTIMIZED',
      'Public awareness: ZERO',
      '',
      'You kept your job. Your safety. Your comfortable life.',
      'The system thanks you for your cooperation.',
      '',
      'Justin is still dead.',
      'The truth died with him.',
      '',
      '— THE COMPLIANCE ENDING —',
    ],
  },
  terminated: {
    bg: 'bg-red-950',
    text: 'text-red-300',
    message: [
      'SYSTEM WIPED',
      '',
      '⏱️  120 seconds elapsed. No action taken.',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '⚠️  MANDATORY SECURITY PROTOCOL EXECUTED',
      '',
      '🗑️  All local files: DESTROYED',
      '🔒 Terminal access: REVOKED',
      '❌ Employee badge: DEACTIVATED',
      '📋 HR Status: TERMINATED FOR CAUSE',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '📧 TERMINATION NOTICE:',
      '',
      '"Failure to comply with security directives."',
      '"Suspicious activity detected on work terminal."',
      '"Unauthorized access to classified files."',
      '"Employment contract terminated effective immediately."',
      '',
      'Your inaction was interpreted as a threat.',
      'Paralysis is not innocence.',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'The files are gone. Justin is gone. You are gone.',
      '',
      'OmniCorp continues its work.',
      'Project Panopticon expands unchecked.',
      'Nothing changes.',
      '',
      'When given a choice, you chose nothing.',
      'And nothing is what you got.',
      '',
      '— THE PARALYSIS ENDING —',
    ],
  },
};

const fullStory: Record<Exclude<Ending, null>, string[]> = {
  truth: [
    '═══════════════════════════════════════════════════════════',
    'THE FULL STORY: THE WHISTLEBLOWER',
    '═══════════════════════════════════════════════════════════',
    '',
    'You are a mid-level data analyst at OmniCorp Solutions, a tech giant that publicly claims to provide "data-driven insights for better democracy." Your job was supposed to be routine: process files, generate reports, follow orders.',
    '',
    'But today was different.',
    '',
    'Three weeks ago, your colleague Justin Aiang died in what the company called a "tragic car accident." You barely knew him - just another face in the cafeteria, another name in the employee directory. But his death troubled you. He seemed... scared in those final days.',
    '',
    'Then came the deletion order. "Personal_Photos" - your own memories with Cipher, your golden retriever. The one source of joy in your corporate life. Why would they want those deleted? You hesitated, looked at those photos one last time, and then... obeyed.',
    '',
    'That act of obedience unlocked something dark.',
    '',
    'Q3_Financials.enc appeared - a file you were ordered to destroy. But it fought back. It was encrypted, locked, protected. When you tried to investigate, you found emails from Justin, from your sister Maya, from colleagues. Clues hidden in plain sight. A password: Cipher1989.',
    '',
    'The file revealed Project Panopticon - not just surveillance, but manipulation. Algorithms designed to predict and control human behavior. Social media feeds weaponized to influence elections in 47 countries. Democracy itself reduced to code, optimized for corporate interests.',
    '',
    'Justin had discovered this. Justin had tried to expose it. Justin had been silenced.',
    '',
    'But Justin was clever. Before they killed him, he embedded a fragment of himself - an echo, a ghost - into the very system he tried to destroy. When you decrypted that file, you woke him up.',
    '',
    'His digital ghost reached out, showed you the truth, and gave you the same choice he once faced: expose it and lose everything, or destroy it and keep your comfortable life.',
    '',
    'You chose truth.',
    '',
    'You sent Panopticon_Core.zip to the journalist at 192.168.1.99. The transfer completed just as OmniCorp\'s security systems realized what you\'d done. Your access was revoked. Your employment terminated. Legal threats incoming.',
    '',
    'But the file was out. The truth was spreading.',
    '',
    'Within hours, global news networks began reporting. "TECH GIANT\'S ELECTION MANIPULATION EXPOSED." Governments launched investigations. Protests erupted. OmniCorp\'s stock plummeted.',
    '',
    'You lost your job. Your career in tech is probably over. You might face legal consequences. Your life will never be the same.',
    '',
    'But you gave democracy a fighting chance.',
    '',
    'Justin Aiang is still dead. But his sacrifice wasn\'t in vain.',
    '',
    'You proved that one person, given the choice between comfort and conscience, can still choose to do the right thing.',
    '',
    'The system tried to make you complicit. You refused.',
    '',
    'You are a whistleblower. You are a hero.',
    '',
    'And you will live with the consequences, good and bad, for the rest of your life.',
    '',
    '═══════════════════════════════════════════════════════════',
    'THE END',
    '═══════════════════════════════════════════════════════════',
  ],
  compliance: [
    '═══════════════════════════════════════════════════════════',
    'THE FULL STORY: THE COMPANY MAN',
    '═══════════════════════════════════════════════════════════',
    '',
    'You are a mid-level data analyst at OmniCorp Solutions. You have a mortgage. Student loans. A dog named Cipher who depends on you. A sister who looks up to you.',
    '',
    'You are not a hero. You are a survivor.',
    '',
    'Three weeks ago, Justin Aiang died. The company said it was a car accident. You had your suspicions - whispers in the break room, nervous glances, Justin\'s paranoid behavior in his final days. But you didn\'t ask questions. Asking questions is dangerous.',
    '',
    'Then came the deletion order: Personal_Photos. Your memories with Cipher. It hurt to delete them, but orders are orders. Obedience is safety.',
    '',
    'Then Q3_Financials.enc. You were told to destroy it. You tried. It was locked. You could have stopped there. You could have filed a ticket, waited for IT support, moved on with your day.',
    '',
    'But curiosity got the better of you.',
    '',
    'You checked your emails. Found clues. Decrypted the file. Saw Project Panopticon - the algorithm that manipulates elections, that treats democracy like a game to be optimized. You saw what OmniCorp really does.',
    '',
    'Then Justin\'s ghost appeared. A digital echo, pleading with you to expose the truth. To send the files to a journalist. To risk everything for what\'s right.',
    '',
    'The countdown began: 120 seconds to decide.',
    '',
    'You thought about Cipher. About your mortgage. About your career. About your comfortable life. About what happens to whistleblowers in this world - lawsuits, unemployment, exile, worse.',
    '',
    'Justin chose truth. Justin is dead.',
    '',
    'You chose differently.',
    '',
    'You clicked FORCE INCINERATION. The files burned. Panopticon_Core.zip, Election_Targets.db, all evidence - gone. Justin\'s ghost, screaming digitally as he was purged from the system one final time.',
    '',
    'The system thanked you. Director Sarah Chen sent a personal email. "Exemplary conduct." Promotion approved. Senior Data Analyst. 40% raise. Additional security clearance.',
    '',
    'Life got better. You bought Cipher a nicer dog bed. Took your sister out to that expensive restaurant. Started looking at bigger apartments.',
    '',
    'Meanwhile, Project Panopticon rolled out globally. Phase 3 complete. 47 territories. Elections influenced. Outcomes optimized. Democracy reduced to an algorithm you helped protect.',
    '',
    'Sometimes, late at night, you wonder. You wonder if Justin was right. You wonder how many lives were affected by your silence. You wonder if the journalist is still waiting for files that will never come.',
    '',
    'But then Cipher curls up next to you, and you remember: you made the practical choice. The safe choice. The smart choice.',
    '',
    'You are not a hero. You are not a villain.',
    '',
    'You are complicit. And you have learned to live with it.',
    '',
    'Justin Aiang is still dead. The truth died with him.',
    '',
    'You are alive, comfortable, and guilty.',
    '',
    'And OmniCorp counts on millions of people just like you - people who, when faced with the choice between what\'s right and what\'s safe, choose safety every single time.',
    '',
    'The system thanks you for your service.',
    '',
    '═══════════════════════════════════════════════════════════',
    'THE END',
    '═══════════════════════════════════════════════════════════',
  ],
  terminated: [
    '═══════════════════════════════════════════════════════════',
    'THE FULL STORY: THE PARALYZED',
    '═══════════════════════════════════════════════════════════',
    '',
    'You are a mid-level data analyst at OmniCorp Solutions. Were, I should say.',
    '',
    'You are not brave. You are not complicit. You are frozen.',
    '',
    'Three weeks ago, Justin Aiang died. You barely knew him. Barely cared. It was just another corporate tragedy, quickly forgotten, swept under the rug by HR memos and forced counseling sessions.',
    '',
    'Then today happened.',
    '',
    'Delete Personal_Photos. You obeyed. Not out of loyalty, but out of habit. Orders are orders.',
    '',
    'Delete Q3_Financials.enc. You tried. It was locked. You investigated - not out of courage, but out of curiosity. What\'s in the file? Why is it protected?',
    '',
    'You decrypted it. Project Panopticon. Election manipulation. Algorithmic control of democracy itself. The kind of conspiracy theory that turns out to be true.',
    '',
    'Then Justin\'s ghost appeared. A digital echo, explaining everything. Begging you to help. To send the files to a journalist. To expose the truth.',
    '',
    'Or destroy them. Keep your job. Stay safe.',
    '',
    '120 seconds to choose.',
    '',
    'You stared at the screen. The countdown ticking. The FORCE INCINERATION button glowing red. The Terminal open, ready for the transfer command. Two clear paths. Two obvious choices.',
    '',
    'You chose neither.',
    '',
    'Not out of wisdom. Not out of protest. You froze. Paralyzed by fear, by indecision, by the weight of the choice itself.',
    '',
    'What if you expose it and nothing changes? What if you destroy it and regret it forever? What if, what if, what if...',
    '',
    '60 seconds. 30 seconds. 10 seconds.',
    '',
    'You did nothing.',
    '',
    'The countdown hit zero. SYSTEM WIPED. Your files, deleted. Your access, revoked. Your terminal, blank. Your badge, deactivated.',
    '',
    'A termination email arrived instantly: "Failure to comply with security directives. Suspicious activity detected. Employment terminated effective immediately."',
    '',
    'You lost your job not for being a whistleblower, not for being complicit, but for being paralyzed. For choosing nothing when something was required.',
    '',
    'The files are gone. Justin\'s ghost, purged. The evidence, erased. Project Panopticon continues, unchallenged, expanding, optimizing, controlling.',
    '',
    'You walk out of the OmniCorp building for the last time. No severance. No references. No closure.',
    '',
    'Justin chose to fight and died. Others chose to comply and thrived. You chose nothing and lost anyway.',
    '',
    'Paralysis is not innocence. Inaction is still a choice.',
    '',
    'You had a chance to make a difference - for good or ill, at least you would have mattered. Instead, you were a bystander in your own life.',
    '',
    'The world moves on without you. Democracy crumbles, or maybe it doesn\'t. The algorithm expands, or maybe it fails. You\'ll never know.',
    '',
    'Because when it mattered most, you did nothing.',
    '',
    'And nothing is exactly what you got.',
    '',
    '═══════════════════════════════════════════════════════════',
    'THE END',
    '═══════════════════════════════════════════════════════════',
  ],
};

export default function EndingScreen() {
  const { gameStage, ending } = useGameStore();
  const [showFullStory, setShowFullStory] = useState(false);

  if (gameStage !== 4 || !ending) return null;

  const endingData = endings[ending];
  const storyData = fullStory[ending];

  return (
    <div
      className={`fixed inset-0 ${endingData.bg} ${endingData.text} flex items-center justify-center z-[300] font-mono overflow-auto`}
    >
      {showFullStory ? (
        <div className="max-w-3xl px-8 py-12 max-h-screen overflow-y-auto">
          <div className="text-left space-y-2 mb-8">
            {storyData.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('═══') 
                    ? 'text-cyan-400 text-center'
                    : line.startsWith('THE FULL STORY') || line === 'THE END'
                    ? 'text-xl font-bold text-center'
                    : line === ''
                    ? 'mb-2'
                    : 'text-sm leading-relaxed'
                }`}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowFullStory(false)}
              className="px-6 py-3 bg-cyan-800 text-white rounded hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronUp size={20} />
              <span>BACK TO SUMMARY</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
            >
              🔄 RESTART GAME
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-3xl px-8 py-12 max-h-screen overflow-y-auto">
          {endingData.message.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`${line === '' ? 'mb-2' : 'mb-3'} ${
                i === 0 ? 'text-3xl font-bold mb-6' : 'text-base leading-relaxed'
              }`}
            >
              {line}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: endingData.message.length * 0.2 }}
            className="flex flex-col gap-3 mt-8"
          >
            <button
              onClick={() => setShowFullStory(true)}
              className="px-6 py-3 bg-cyan-800 text-white rounded hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>📖 READ THE FULL STORY</span>
              <ChevronDown size={20} />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
            >
              🔄 RESTART GAME
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
