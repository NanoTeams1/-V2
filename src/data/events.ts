import type { HorrorEvent, StoryDocument } from '@/types/game';

export const horrorEvents: HorrorEvent[] = [
  {
    id: 'faceless-customer',
    title: '顔のない客',
    description: 'レジ前の客の顔が、防犯ミラーの中だけ塗りつぶされている。',
    minMinute: 125,
    sanityDamage: 8,
    weight: 4,
    once: false,
    tags: ['customer', 'camera'],
  },
  {
    id: 'repeating-sentence',
    title: '同じ文言',
    description: '店内放送と客の声が同期して、同じ一文を繰り返す。',
    minMinute: 135,
    sanityDamage: 6,
    weight: 5,
    tags: ['audio', 'customer'],
  },
  {
    id: 'power-outage',
    title: '蛍光灯の沈黙',
    description: '非常灯だけが点き、地下から古い発車ベルが聞こえる。',
    minMinute: 150,
    sanityDamage: 12,
    weight: 3,
    tags: ['power', 'audio'],
  },
  {
    id: 'impossible-weather',
    title: 'ありえない天気',
    description: '防犯カメラの外だけ雪が降る。窓の外はまだ雨だ。',
    minMinute: 145,
    sanityDamage: 7,
    weight: 4,
    tags: ['camera'],
  },
  {
    id: 'moving-mannequin',
    title: '動く販促マネキン',
    description: '雑誌棚の販促人形が、カメラを切り替えるたび入口へ近づく。',
    minMinute: 160,
    sanityDamage: 10,
    weight: 3,
    tags: ['camera', 'shelf'],
  },
  {
    id: 'vanishing-aisle',
    title: '消えた通路',
    description: '三番通路が映らない。棚卸し表には「地下ホーム」と印字されている。',
    minMinute: 175,
    sanityDamage: 14,
    weight: 2,
    once: true,
    tags: ['story', 'shelf'],
  },
];

export const storyDocuments: StoryDocument[] = [
  {
    id: 'manager-note',
    title: '店長メモ：夜勤心得',
    unlockedAtMinute: 0,
    body: '午前二時以降、地下から音がしても確認しないこと。確認した従業員は退職扱いとする。',
  },
  {
    id: 'sealed-platform',
    title: '社内通達：旧駅封鎖について',
    unlockedAtMinute: 125,
    body: '本店舗地下の旧線路設備は存在しないものとして扱う。問い合わせには倉庫と回答すること。',
  },
  {
    id: 'cctv-1998',
    title: 'CCTV 1998/08/14',
    unlockedAtMinute: 160,
    body: '閉店後の映像。制服姿の従業員が自分自身をレジで接客している。タイムコードは存在しない。',
  },
  {
    id: 'emergency-broadcast',
    title: '緊急放送の書き起こし',
    unlockedAtMinute: 190,
    body: 'まもなく二番線に、朝が到着します。白線の内側で、あなたの代わりをお待ちください。',
  },
];
