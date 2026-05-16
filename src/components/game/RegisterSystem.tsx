'use client';

import { useMemo, useState } from 'react';
import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';

export function RegisterSystem() {
  const { currentCustomer, items, scannedItems, registerTotal, scanItem, finishPayment } = useGameStore();
  const [change, setChange] = useState('0');
  const basket = useMemo(
    () => currentCustomer?.items.map((id) => items.find((item) => item.id === id)).filter(Boolean) ?? [],
    [currentCustomer, items],
  );
  const expectedChange = (currentCustomer?.paidAmount ?? 0) - registerTotal;

  return (
    <Panel title="Cash Register / POS-旧型">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-konbini-ink/70 p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-konbini-paper/50">現在の客</p>
              <h3 className="text-xl text-konbini-paper">{currentCustomer?.name}</h3>
              <p className="mt-2 text-sm text-konbini-amber">「{currentCustomer?.sentence}」</p>
            </div>
            <span className="rounded bg-black/50 px-2 py-1 text-[10px] text-konbini-red">{currentCustomer?.anomaly}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {basket.map((item, index) => {
              if (!item) return null;
              return (
                <button
                  key={`${item.id}-${index}`}
                  onClick={() => scanItem(item.id)}
                  className="rounded border border-dashed border-konbini-cyan/30 bg-black/30 p-3 text-left transition hover:border-konbini-cyan"
                >
                  <p className="text-sm text-konbini-paper">{item.name}</p>
                  <p className="text-[10px] text-konbini-paper/45">{item.barcode}</p>
                  <p className="text-konbini-cyan">¥{item.price}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/60 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-konbini-paper/45">Scanned</p>
          <div className="mt-3 min-h-32 space-y-2">
            {scannedItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between border-b border-white/10 pb-1 text-sm">
                <span>{item.name}</span>
                <span>¥{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-konbini-cyan/30 pt-4 text-right">
            <p className="text-sm text-konbini-paper/50">合計</p>
            <p className="text-3xl text-konbini-cyan">¥{registerTotal}</p>
            <p className="text-xs text-konbini-paper/50">預かり ¥{currentCustomer?.paidAmount ?? 0} / 釣銭目安 ¥{expectedChange}</p>
          </div>
          <label className="mt-4 block text-xs text-konbini-paper/60">
            渡した釣銭
            <input
              value={change}
              onChange={(event) => setChange(event.target.value)}
              inputMode="numeric"
              className="mt-2 w-full rounded border border-white/10 bg-black/60 px-3 py-2 text-konbini-cyan outline-none focus:border-konbini-cyan"
            />
          </label>
          <button onClick={() => finishPayment(Number(change))} className="mt-3 w-full rounded bg-konbini-cyan/20 px-4 py-3 text-konbini-cyan hover:bg-konbini-cyan/30">
            会計確定
          </button>
        </div>
      </div>
    </Panel>
  );
}
