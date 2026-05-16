import { horrorEvents } from '@/data/events';
import type { HorrorEvent } from '@/types/game';

export function pickHorrorEvent(minute: number, seenEventIds: string[]): HorrorEvent | null {
  const available = horrorEvents.filter(
    (event) => minute >= event.minMinute && (!event.once || !seenEventIds.includes(event.id)),
  );

  if (available.length === 0) return null;

  const totalWeight = available.reduce((sum, event) => sum + event.weight, 0);
  let cursor = Math.random() * totalWeight;

  for (const event of available) {
    cursor -= event.weight;
    if (cursor <= 0) return event;
  }

  return available[available.length - 1];
}

export function getEscalation(minute: number, sanity: number) {
  const timePressure = Math.max(0, minute - 120) / 120;
  const sanityPressure = (100 - sanity) / 100;
  return Math.min(1, timePressure * 0.7 + sanityPressure * 0.45);
}
