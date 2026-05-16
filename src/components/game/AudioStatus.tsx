'use client';

import { getAudioIntensity } from '@/lib/audio';
import { useGameStore } from '@/store/gameStore';

export function AudioStatus() {
  const { minute, sanity } = useGameStore();
  const intensity = getAudioIntensity(minute, sanity);

  return (
    <div className="rounded-xl border border-white/10 bg-black/35 p-3 text-[11px] text-konbini-paper/55">
      <p className="uppercase tracking-[0.25em] text-konbini-cyan">Audio Bus</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/10">
        <div className="h-full bg-konbini-red" style={{ width: `${intensity * 100}%` }} />
      </div>
      <p className="mt-2">雨 / 蛍光灯 / 遠い電車: {Math.round(intensity * 100)}%</p>
    </div>
  );
}
