'use client';

import { clock, useGameStore } from '@/store/gameStore';
import type { WorkStation } from '@/types/game';

const stations: Array<{ id: WorkStation; label: string }> = [
  { id: 'register', label: 'POS' },
  { id: 'shelves', label: '棚補充' },
  { id: 'cameras', label: '監視' },
  { id: 'documents', label: '記録' },
];

export function Hud() {
  const { minute, sanity, station, setStation, pauseGame } = useGameStore();

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-200/10 bg-black/70 p-3 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-konbini-paper/45">KONBINI SYSTEM 98</p>
          <p className={`text-2xl font-black ${minute >= 120 ? 'animate-flicker text-konbini-red' : 'text-konbini-cyan'}`}>{clock(minute)}</p>
        </div>
        <div className="min-w-40 flex-1 sm:max-w-xs">
          <div className="mb-1 flex justify-between text-[10px] uppercase tracking-[0.25em] text-konbini-paper/55">
            <span>Sanity</span>
            <span>{sanity}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-white/10">
            <div className="h-full bg-gradient-to-r from-konbini-red via-konbini-amber to-konbini-mint" style={{ width: `${sanity}%` }} />
          </div>
        </div>
        <nav className="flex flex-wrap gap-2">
          {stations.map((item) => (
            <button
              key={item.id}
              onClick={() => setStation(item.id)}
              className={`rounded border px-3 py-2 text-xs ${station === item.id ? 'border-konbini-cyan bg-konbini-cyan/20 text-konbini-cyan' : 'border-white/10 bg-white/5 text-konbini-paper/70'}`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={pauseGame} className="rounded border border-white/10 bg-white/5 px-3 py-2 text-xs text-konbini-paper/70">
            PAUSE
          </button>
        </nav>
      </div>
    </header>
  );
}
