'use client';

import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';

export function EventLog() {
  const logs = useGameStore((state) => state.logs);

  return (
    <Panel title="Shift Log">
      <div className="max-h-72 space-y-2 overflow-auto pr-1">
        {logs.map((log) => (
          <p
            key={log.id}
            className={`border-l-2 pl-3 text-xs leading-5 ${
              log.severity === 'horror'
                ? 'border-konbini-red text-konbini-red'
                : log.severity === 'warning'
                  ? 'border-konbini-amber text-konbini-amber'
                  : 'border-konbini-cyan/40 text-konbini-paper/60'
            }`}
          >
            {log.message}
          </p>
        ))}
      </div>
    </Panel>
  );
}
