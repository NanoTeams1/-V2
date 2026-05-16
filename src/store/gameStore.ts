'use client';

import { create } from 'zustand';
import { createCustomer } from '@/data/customers';
import { storyDocuments } from '@/data/events';
import { initialItems } from '@/data/items';
import { getEscalation, pickHorrorEvent } from '@/lib/events';
import { defaultSettings, loadSave, type LocalSave, writeSave } from '@/lib/save';
import type { CameraFeed, Customer, EndingId, GamePhase, Item, LogEntry, Settings, WorkStation } from '@/types/game';

type GameState = {
  phase: GamePhase;
  station: WorkStation;
  minute: number;
  sanity: number;
  registerTotal: number;
  scannedItems: Item[];
  currentCustomer: Customer | null;
  customerIndex: number;
  items: Item[];
  cameras: CameraFeed[];
  logs: LogEntry[];
  seenEventIds: string[];
  unlockedDocuments: string[];
  ending: EndingId | null;
  settings: Settings;
  save: LocalSave;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setStation: (station: WorkStation) => void;
  tick: () => void;
  scanItem: (itemId: string) => void;
  finishPayment: (changeGiven: number) => void;
  restockItem: (itemId: string, amount: number) => void;
  stareAtCamera: (feedId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  endGame: (ending: EndingId) => void;
};

const initialCameras: CameraFeed[] = [
  { id: 'front', label: 'CAM 01', location: '入口', glitch: 0.05, entityVisible: false, description: '雨で滲む自動ドア。' },
  { id: 'aisle', label: 'CAM 02', location: '三番通路', glitch: 0.12, entityVisible: false, description: '弁当棚と販促ポップ。' },
  { id: 'stock', label: 'CAM 03', location: 'バックヤード', glitch: 0.09, entityVisible: false, description: '補充用段ボールが積まれている。' },
  { id: 'platform', label: 'CAM --', location: '地下?', glitch: 0.4, entityVisible: false, description: '未登録カメラ。黒いホームが映る。' },
];

const openingLogs: LogEntry[] = [
  { id: 'log-open', minute: 0, message: '23:00 夜勤開始。雨音と蛍光灯の音だけが聞こえる。', severity: 'normal' },
  { id: 'log-note', minute: 1, message: '店長メモを発見：「二時以降、地下を確認しないこと」。', severity: 'warning' },
];

function clock(minute: number) {
  const total = 23 * 60 + minute;
  const hours = Math.floor(total / 60) % 24;
  const minutes = total % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function makeLog(minute: number, message: string, severity: LogEntry['severity'] = 'normal'): LogEntry {
  return { id: `${minute}-${Math.random().toString(36).slice(2)}`, minute, message: `${clock(minute)} ${message}`, severity };
}

function deriveEnding(minute: number, sanity: number, documents: string[]): EndingId {
  if (documents.length >= storyDocuments.length && sanity > 35 && minute >= 240) return 'true_ending';
  if (sanity <= 0) return 'trapped_forever';
  if (documents.includes('emergency-broadcast') && sanity < 40) return 'enter_station';
  if (minute >= 240 && sanity < 55) return 'replace_manager';
  return 'escape_alive';
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'title',
  station: 'register',
  minute: 0,
  sanity: 100,
  registerTotal: 0,
  scannedItems: [],
  currentCustomer: null,
  customerIndex: 0,
  items: initialItems,
  cameras: initialCameras,
  logs: openingLogs,
  seenEventIds: [],
  unlockedDocuments: ['manager-note'],
  ending: null,
  settings: defaultSettings,
  save: { discoveredDocuments: ['manager-note'], endingsSeen: [], settings: defaultSettings },
  startGame: () => {
    const save = loadSave();
    set({
      phase: 'playing',
      station: 'register',
      minute: 0,
      sanity: 100,
      items: initialItems,
      scannedItems: [],
      registerTotal: 0,
      currentCustomer: createCustomer(0, 0),
      customerIndex: 1,
      cameras: initialCameras,
      logs: openingLogs,
      seenEventIds: [],
      unlockedDocuments: save.discoveredDocuments,
      settings: save.settings,
      save,
      ending: null,
    });
  },
  pauseGame: () => set({ phase: 'paused' }),
  resumeGame: () => set({ phase: 'playing' }),
  setStation: (station) => set({ station }),
  tick: () => {
    const state = get();
    if (state.phase !== 'playing') return;

    const nextMinute = state.minute + 2;
    const escalation = getEscalation(nextMinute, state.sanity);
    const eventChance = nextMinute > 120 ? 0.1 + escalation * 0.25 : 0.03;
    const event = Math.random() < eventChance ? pickHorrorEvent(nextMinute, state.seenEventIds) : null;
    const unlocked = storyDocuments
      .filter((doc) => nextMinute >= doc.unlockedAtMinute)
      .map((doc) => doc.id);
    const newDocs = Array.from(new Set([...state.unlockedDocuments, ...unlocked]));
    const lowStockPenalty = state.items.filter((item) => item.stock <= 1 && !item.haunted).length;
    const darknessPenalty = state.station === 'cameras' && escalation > 0.55 ? 2 : 0;
    const sanity = Math.max(0, state.sanity - lowStockPenalty - darknessPenalty - (event?.sanityDamage ?? 0));
    const cameras = state.cameras.map((camera) => ({
      ...camera,
      glitch: Math.min(0.95, camera.glitch + escalation * 0.08 + (event?.tags.includes('camera') ? 0.18 : 0)),
      entityVisible: Math.random() < escalation * (camera.id === 'platform' ? 0.45 : 0.2),
    }));
    const logs = [...state.logs];

    if (event) logs.unshift(makeLog(nextMinute, event.description, 'horror'));
    if (newDocs.length > state.unlockedDocuments.length) logs.unshift(makeLog(nextMinute, 'バックヤード端末に新しい記録が復元された。', 'warning'));
    if (nextMinute === 120) logs.unshift(makeLog(nextMinute, '午前二時。店内放送が一瞬だけ逆再生になった。', 'horror'));

    if (nextMinute >= 240 || sanity <= 0) {
      get().endGame(deriveEnding(nextMinute, sanity, newDocs));
      return;
    }

    set({
      minute: nextMinute,
      sanity,
      cameras,
      logs: logs.slice(0, 18),
      seenEventIds: event ? [...state.seenEventIds, event.id] : state.seenEventIds,
      unlockedDocuments: newDocs,
    });
  },
  scanItem: (itemId) => {
    const state = get();
    const item = state.items.find((candidate) => candidate.id === itemId);
    if (!item || item.stock <= 0 || !state.currentCustomer?.items.includes(itemId)) return;

    set({
      scannedItems: [...state.scannedItems, item],
      registerTotal: state.registerTotal + item.price,
      items: state.items.map((candidate) => (candidate.id === itemId ? { ...candidate, stock: candidate.stock - 1 } : candidate)),
      logs: [makeLog(state.minute, `${item.name} をスキャン。`, item.haunted ? 'warning' : 'normal'), ...state.logs].slice(0, 18),
    });
  },
  finishPayment: (changeGiven) => {
    const state = get();
    if (!state.currentCustomer) return;

    const expectedChange = state.currentCustomer.paidAmount - state.registerTotal;
    const wrong = Math.abs(expectedChange - changeGiven) > 0;
    const anomalyPenalty = state.currentCustomer.anomaly === 'none' ? 0 : 5;
    const sanity = Math.max(0, state.sanity - (wrong ? 7 : 0) - anomalyPenalty);
    const customer = createCustomer(state.minute, state.customerIndex);

    set({
      sanity,
      currentCustomer: customer,
      customerIndex: state.customerIndex + 1,
      scannedItems: [],
      registerTotal: 0,
      logs: [
        makeLog(state.minute, wrong ? '釣銭が合わない。客が黙ったまま立ち尽くす。' : '会計完了。自動ドアが湿った音で開く。', wrong ? 'warning' : 'normal'),
        ...state.logs,
      ].slice(0, 18),
    });
  },
  restockItem: (itemId, amount) => {
    const state = get();
    set({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, stock: Math.min(item.maxStock, item.stock + amount) } : item,
      ),
      logs: [makeLog(state.minute, '棚を補充。奥の倉庫から電車のブレーキ音がした。', 'normal'), ...state.logs].slice(0, 18),
    });
  },
  stareAtCamera: (feedId) => {
    const state = get();
    const feed = state.cameras.find((camera) => camera.id === feedId);
    const damage = feed?.entityVisible ? 6 : 1;
    set({ sanity: Math.max(0, state.sanity - damage) });
  },
  updateSettings: (settings) => {
    const state = get();
    const nextSettings = { ...state.settings, ...settings };
    const save = { ...state.save, settings: nextSettings };
    writeSave(save);
    set({ settings: nextSettings, save });
  },
  endGame: (ending) => {
    const state = get();
    const save: LocalSave = {
      ...state.save,
      bestEnding: ending,
      discoveredDocuments: state.unlockedDocuments,
      endingsSeen: Array.from(new Set([...state.save.endingsSeen, ending])),
    };
    writeSave(save);
    set({ phase: 'ended', ending, save });
  },
}));

export { clock };
