'use client';

import { Panel } from '@/components/ui/Panel';
import { audioCues, applyVolume } from '@/lib/audio';
import { useGameStore } from '@/store/gameStore';
import type { Settings } from '@/types/game';

export function SettingsMenu() {
  const { settings, updateSettings } = useGameStore();

  const toggleFullscreen = async () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => undefined);
      updateSettings({ fullscreen: true });
    } else {
      await document.exitFullscreen().catch(() => undefined);
      updateSettings({ fullscreen: false });
    }
  };

  return (
    <Panel title="VHS Pause / Settings">
      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ['masterVolume', 'MASTER'],
          ['ambienceVolume', 'RAIN / HUM'],
          ['effectsVolume', 'BEEP / VOICE'],
        ] as Array<[keyof Pick<Settings, 'masterVolume' | 'ambienceVolume' | 'effectsVolume'>, string]>).map(([key, label]) => (
          <label key={key} className="text-xs text-konbini-paper/60">
            {label} {Math.round(settings[key] * 100)}%
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings[key]}
              onChange={(event) => updateSettings({ [key]: Number(event.target.value) } as Pick<Settings, typeof key>)}
              className="mt-2 w-full accent-konbini-cyan"
            />
          </label>
        ))}
        <button onClick={toggleFullscreen} className="rounded border border-konbini-cyan/40 px-4 py-3 text-xs text-konbini-cyan">
          {settings.fullscreen ? 'FULLSCREEN解除' : 'FULLSCREEN'}
        </button>
        <label className="flex items-center gap-3 rounded border border-white/10 px-4 py-3 text-xs text-konbini-paper/70">
          <input type="checkbox" checked={settings.reducedMotion} onChange={(event) => updateSettings({ reducedMotion: event.target.checked })} />
          VHS揺れを抑える
        </label>
      </div>
      <div className="mt-5 rounded bg-black/40 p-3 text-[11px] leading-5 text-konbini-paper/50">
        <p>Audio hooks: {Object.keys(audioCues).join(' / ')}</p>
        <p>Current ambience bus: {applyVolume(1, settings, 'ambience')}%</p>
      </div>
    </Panel>
  );
}
