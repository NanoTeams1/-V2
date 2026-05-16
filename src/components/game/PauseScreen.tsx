'use client';

import { motion } from 'framer-motion';
import { SettingsMenu } from '@/components/game/SettingsMenu';
import { useGameStore } from '@/store/gameStore';

export function PauseScreen() {
  const resumeGame = useGameStore((state) => state.resumeGame);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
        <SettingsMenu />
        <button onClick={resumeGame} className="mt-4 w-full rounded border border-konbini-cyan/50 bg-konbini-cyan/10 py-3 text-konbini-cyan">
          テープを再生する
        </button>
      </motion.div>
    </div>
  );
}
