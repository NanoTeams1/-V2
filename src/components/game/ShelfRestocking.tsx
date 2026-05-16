'use client';

import { Panel } from '@/components/ui/Panel';
import { useGameStore } from '@/store/gameStore';

export function ShelfRestocking() {
  const { items, restockItem } = useGameStore();

  return (
    <Panel title="Shelf Restocking / バックヤード">
      <p className="mb-4 text-sm leading-6 text-konbini-paper/65">
        商品カードを補充スロットへドラッグ、または補充ボタンで補充します。欠品が続くと棚が別の通路につながります。
      </p>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const ratio = item.stock / item.maxStock;
          return (
            <div
              key={item.id}
              draggable
              onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                restockItem(event.dataTransfer.getData('text/plain') || item.id, 2);
              }}
              className={`drag-card rounded-lg border p-4 ${item.haunted ? 'border-konbini-red/50 bg-red-950/20' : 'border-white/10 bg-black/35'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm text-konbini-paper">{item.name}</h3>
                  <p className="text-[10px] text-konbini-paper/40">SKU {item.barcode}</p>
                </div>
                <span className="text-xs text-konbini-cyan">{item.stock}/{item.maxStock}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded bg-white/10">
                <div className={`h-full ${ratio < 0.25 ? 'bg-konbini-red' : 'bg-konbini-mint'}`} style={{ width: `${ratio * 100}%` }} />
              </div>
              <button onClick={() => restockItem(item.id, 3)} className="mt-4 w-full rounded border border-white/10 bg-white/5 py-2 text-xs text-konbini-paper/70 hover:border-konbini-cyan/50">
                +3 補充
              </button>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
