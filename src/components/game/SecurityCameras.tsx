'use client';

import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';

export function SecurityCameras() {
  const { cameras, stareAtCamera, minute } = useGameStore();

  return (
    <Panel title="Security Cameras / 防犯モニター">
      <div className="grid gap-4 md:grid-cols-2">
        {cameras.map((feed) => (
          <button
            key={feed.id}
            onClick={() => stareAtCamera(feed.id)}
            className="group relative min-h-52 overflow-hidden rounded-lg border border-cyan-200/15 bg-slate-950 p-4 text-left shadow-crt"
          >
            <div className="absolute inset-0 vhs-noise opacity-20" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-konbini-cyan/40" style={{ opacity: feed.glitch }} />
            {feed.entityVisible ? <div className="absolute bottom-8 right-10 h-24 w-10 rounded-t-full bg-black shadow-[0_0_24px_rgba(255,69,104,0.8)]" /> : null}
            <div className="relative z-10 flex h-full min-h-44 flex-col justify-between">
              <div className="flex justify-between text-xs text-konbini-cyan">
                <span>{feed.label}</span>
                <span>GLITCH {Math.round(feed.glitch * 100)}%</span>
              </div>
              <div>
                <h3 className="text-2xl text-konbini-paper">{feed.location}</h3>
                <p className="mt-2 text-sm text-konbini-paper/60">{feed.entityVisible ? '人影が、フレームの端に立っている。クリックすると視線が合う。' : feed.description}</p>
                <p className="mt-3 text-[10px] text-konbini-paper/35">REC {minute >= 120 ? '02:00:00' : '23:--:--'} / SIGNAL WEAK</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
}
