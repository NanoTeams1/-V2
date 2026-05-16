'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { AudioStatus } from '@/components/game/AudioStatus';
import { Documents } from '@/components/game/Documents';
import { EndingScreen } from '@/components/game/EndingScreen';
import { EventLog } from '@/components/game/EventLog';
import { Hud } from '@/components/game/Hud';
import { PauseScreen } from '@/components/game/PauseScreen';
import { RegisterSystem } from '@/components/game/RegisterSystem';
import { SecurityCameras } from '@/components/game/SecurityCameras';
import { ShelfRestocking } from '@/components/game/ShelfRestocking';
import { TitleScreen } from '@/components/game/TitleScreen';
import { useGameStore } from '@/store/gameStore';

export function GameShell() {
  const { phase, station, startGame, tick, settings, sanity } = useGameStore();

  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = window.setInterval(tick, 5000);
    return () => window.clearInterval(interval);
  }, [phase, tick]);

  if (phase === 'title') return <TitleScreen onStart={startGame} />;
  if (phase === 'ended') return <EndingScreen />;

  return (
    <div className={`min-h-screen ${settings.reducedMotion ? '' : 'animate-flicker'}`}>
      <Hud />
      <div className="pointer-events-none fixed inset-0 z-20 opacity-30">
        <div className="absolute inset-x-0 top-1/3 h-10 bg-konbini-cyan/5 blur-xl" />
        {sanity < 35 ? <div className="absolute inset-0 bg-red-950/10" /> : null}
      </div>
      <main className="mx-auto grid max-w-7xl gap-4 p-4 lg:grid-cols-[1fr_320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={station}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: settings.reducedMotion ? 0 : 0.2 }}
          >
            {station === 'register' ? <RegisterSystem /> : null}
            {station === 'shelves' ? <ShelfRestocking /> : null}
            {station === 'cameras' ? <SecurityCameras /> : null}
            {station === 'documents' ? <Documents /> : null}
          </motion.div>
        </AnimatePresence>
        <aside className="space-y-4">
          <AudioStatus />
          <EventLog />
          <div className="rounded-xl border border-konbini-red/20 bg-red-950/10 p-4 text-xs leading-6 text-konbini-paper/60">
            <p className="text-konbini-red">店長からの留守電</p>
            <p>「二時を過ぎたら、客の顔を覚えようとするな。防犯カメラの四番は存在しない」</p>
          </div>
        </aside>
      </main>
      {phase === 'paused' ? <PauseScreen /> : null}
    </div>
  );
}
