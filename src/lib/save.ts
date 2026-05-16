import type { EndingId, Settings } from '@/types/game';

const SAVE_KEY = 'midnight-konbini-save-v1';

export type LocalSave = {
  bestEnding?: EndingId;
  discoveredDocuments: string[];
  settings: Settings;
  endingsSeen: EndingId[];
};

export const defaultSettings: Settings = {
  masterVolume: 0.75,
  ambienceVolume: 0.7,
  effectsVolume: 0.85,
  fullscreen: false,
  reducedMotion: false,
};

export const defaultSave: LocalSave = {
  discoveredDocuments: ['manager-note'],
  settings: defaultSettings,
  endingsSeen: [],
};

export function loadSave(): LocalSave {
  if (typeof window === 'undefined') return defaultSave;

  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave;
    return { ...defaultSave, ...JSON.parse(raw) };
  } catch {
    return defaultSave;
  }
}

export function writeSave(save: LocalSave) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

export function clearSave() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SAVE_KEY);
}
