'use client';

import { motion } from 'framer-motion';
import { GlitchText } from '@/components/ui/GlitchText';
import { Panel } from '@/components/ui/Panel';

export function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl">
        <Panel className="relative overflow-hidden p-8 text-center">
          <div className="absolute inset-x-0 top-0 h-1 animate-scan bg-konbini-cyan/40" />
          <p className="mb-4 text-xs tracking-[0.5em] text-konbini-amber">VHS 03:17:44 / NIGHT SHIFT</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            <GlitchText>深夜コンビニシミュレーター</GlitchText>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-konbini-paper/75">
            23:00から朝までの短い勤務。レジ、補充、防犯カメラ確認をこなしながら、午前二時以降に起こる異常を記録してください。
          </p>
          <button
            onClick={onStart}
            className="mt-8 rounded border border-konbini-cyan/50 bg-konbini-cyan/10 px-8 py-3 text-sm uppercase tracking-[0.3em] text-konbini-cyan transition hover:bg-konbini-cyan/20"
          >
            出勤する
          </button>
          <div className="mt-8 grid gap-3 text-left text-xs text-konbini-paper/60 sm:grid-cols-3">
            <p>POS端末: 釣銭ミスは評価と精神を削る。</p>
            <p>棚: 欠品が続くと「在庫外」の商品が届く。</p>
            <p>カメラ: 見続けるほど、向こうもこちらを見る。</p>
          </div>
        </Panel>
      </motion.div>
    </main>
  );
}
