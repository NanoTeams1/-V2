'use client';

import { motion } from 'framer-motion';
import { GlitchText } from '@/components/ui/GlitchText';
import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';
import type { EndingId } from '@/types/game';

const endings: Record<EndingId, { title: string; body: string }> = {
  escape_alive: { title: 'ENDING 1 / 生還', body: '朝の納品トラックが来た。あなたは雨の中へ走り、二度とこの店舗には戻らなかった。' },
  trapped_forever: { title: 'ENDING 2 / 永遠の夜勤', body: 'レジ画面にあなたの名前が商品として登録された。価格は二円。釣銭は戻らない。' },
  replace_manager: { title: 'ENDING 3 / 店長交代', body: '店長は笑って鍵束を置いた。あなたは次の夜勤へ、同じメモを書く。' },
  enter_station: { title: 'ENDING 4 / 地下ホーム', body: '非常階段の先に改札があった。終電はあなたの顔をした乗客で満員だった。' },
  true_ending: { title: 'SECRET / 始発', body: '隠された記録を全て再生した。封鎖された駅名標には、会社の本当の名前が残っていた。' },
};

export function EndingScreen() {
  const { ending, startGame, save } = useGameStore();
  const data = ending ? endings[ending] : endings.escape_alive;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Panel className="text-center">
          <p className="mb-3 text-xs tracking-[0.4em] text-konbini-paper/45">TAPE END</p>
          <h1 className="text-4xl font-black"><GlitchText danger>{data.title}</GlitchText></h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-konbini-paper/75">{data.body}</p>
          <p className="mt-5 text-xs text-konbini-paper/45">Unlocked endings: {save.endingsSeen.join(' / ') || 'none'}</p>
          <button onClick={startGame} className="mt-8 rounded border border-konbini-cyan/50 bg-konbini-cyan/10 px-8 py-3 text-konbini-cyan">
            もう一度 夜勤へ
          </button>
        </Panel>
      </motion.div>
    </main>
  );
}
