'use client';

import { motion } from 'framer-motion';
import { useGameStore, Ending } from '@/lib/game-store';

const endings: Record<
  Exclude<Ending, null>,
  { bg: string; text: string; message: string[] }
> = {
  truth: {
    bg: 'bg-white',
    text: 'text-black',
    message: [
      'FILE TRANSFERRED',
      '',
      'Panopticon_Core.zip successfully delivered to IP 192.168.1.99',
      '',
      'Global news networks receiving data...',
      'Truth exposed.',
      '',
      'Your terminal access has been revoked.',
      'OmniCorp security protocols activated.',
      '',
      'You are locked out forever.',
      '',
      'But the world will know.',
      '',
      '— END —',
    ],
  },
  compliance: {
    bg: 'bg-blue-900',
    text: 'text-blue-100',
    message: [
      'INCINERATION COMPLETE',
      '',
      'All flagged files successfully destroyed.',
      'Q3_Financials.enc — DELETED',
      'Panopticon_Core.zip — DELETED',
      '',
      'Thank you for your compliance.',
      '',
      'OmniCorp algorithmic deployment: ACTIVE',
      'Phase 3 rollout: 47 territories',
      'Electoral outcomes: OPTIMIZED',
      '',
      'Your cooperation has been noted.',
      'Promotion pending review.',
      '',
      '— END —',
    ],
  },
  terminated: {
    bg: 'bg-red-950',
    text: 'text-red-300',
    message: [
      'SYSTEM WIPED',
      '',
      'Mandatory security protocol executed.',
      '',
      'All local files destroyed.',
      'Terminal access: REVOKED',
      'Employee status: TERMINATED',
      '',
      'Failure to comply with directives.',
      '',
      'You have been removed from the system.',
      '',
      'OmniCorp thanks you for your service.',
      '',
      '— END —',
    ],
  },
};

export default function EndingScreen() {
  const { gameStage, ending } = useGameStore();

  if (gameStage !== 4 || !ending) return null;

  const endingData = endings[ending];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 ${endingData.bg} ${endingData.text} flex items-center justify-center z-50 font-mono`}
    >
      <div className="text-center max-w-2xl px-8">
        {endingData.message.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.3 }}
            className={`${line === '' ? 'mb-2' : 'mb-4'} ${
              i === 0 ? 'text-3xl font-bold' : 'text-lg'
            }`}
          >
            {line}
          </motion.div>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: endingData.message.length * 0.3 }}
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
        >
          RESTART
        </motion.button>
      </div>
    </motion.div>
  );
}
