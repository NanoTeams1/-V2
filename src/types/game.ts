export type GamePhase = 'title' | 'playing' | 'paused' | 'ended';

export type WorkStation = 'register' | 'shelves' | 'cameras' | 'documents';

export type EndingId =
  | 'escape_alive'
  | 'trapped_forever'
  | 'replace_manager'
  | 'enter_station'
  | 'true_ending';

export type Item = {
  id: string;
  name: string;
  barcode: string;
  price: number;
  stock: number;
  maxStock: number;
  haunted?: boolean;
};

export type Customer = {
  id: string;
  name: string;
  sentence: string;
  items: string[];
  paidAmount: number;
  anomaly: 'none' | 'faceless' | 'repeating' | 'too-still' | 'fake';
};

export type CameraFeed = {
  id: string;
  label: string;
  location: string;
  glitch: number;
  entityVisible: boolean;
  description: string;
};

export type HorrorEvent = {
  id: string;
  title: string;
  description: string;
  minMinute: number;
  sanityDamage: number;
  weight: number;
  once?: boolean;
  tags: Array<'customer' | 'camera' | 'audio' | 'power' | 'shelf' | 'story'>;
};

export type StoryDocument = {
  id: string;
  title: string;
  unlockedAtMinute: number;
  body: string;
};

export type Settings = {
  masterVolume: number;
  ambienceVolume: number;
  effectsVolume: number;
  fullscreen: boolean;
  reducedMotion: boolean;
};

export type LogEntry = {
  id: string;
  minute: number;
  message: string;
  severity: 'normal' | 'warning' | 'horror';
};
