'use client';

import { storyDocuments } from '@/data/events';
import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';

export function Documents() {
  const { unlockedDocuments } = useGameStore();

  return (
    <Panel title="Recovered Files / 店舗端末">
      <div className="grid gap-3 md:grid-cols-2">
        {storyDocuments.map((document) => {
          const unlocked = unlockedDocuments.includes(document.id);
          return (
            <article key={document.id} className={`rounded-lg border p-4 ${unlocked ? 'border-konbini-amber/30 bg-amber-950/10' : 'border-white/10 bg-black/30 blur-[1px]'}`}>
              <p className="text-[10px] uppercase tracking-[0.25em] text-konbini-paper/40">{unlocked ? 'restored' : 'corrupted'}</p>
              <h3 className="mt-2 text-lg text-konbini-amber">{unlocked ? document.title : '■■■■■■■■'}</h3>
              <p className="mt-3 text-sm leading-6 text-konbini-paper/70">{unlocked ? document.body : '再生条件を満たしていません。午前二時以降、端末が自動復元を試行します。'}</p>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}
