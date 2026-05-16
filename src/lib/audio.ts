import type { Settings } from '@/types/game';

export const audioCues = {
  rain: '/audio/rain.placeholder.txt',
  fluorescentHum: '/audio/fluorescent-hum.placeholder.txt',
  scannerBeep: '/audio/scanner-beep.placeholder.txt',
  distortedVoice: '/audio/distorted-voice.placeholder.txt',
  vhsStatic: '/audio/vhs-static.placeholder.txt',
  distantTrain: '/audio/distant-train.placeholder.txt',
};

export function getAudioIntensity(minute: number, sanity: number) {
  const afterTwo = Math.max(0, minute - 120) / 120;
  const sanityFactor = (100 - sanity) / 100;
  return Math.min(1, 0.25 + afterTwo * 0.45 + sanityFactor * 0.5);
}

export function applyVolume(base: number, settings: Settings, channel: 'ambience' | 'effects') {
  const channelVolume = channel === 'ambience' ? settings.ambienceVolume : settings.effectsVolume;
  return Math.round(base * settings.masterVolume * channelVolume * 100);
}
