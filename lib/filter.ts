'use client';
import { useSyncExternalStore } from 'react';

/** Shared "which vehicle" filter so the vehicle tiles can pre-filter the tyre grid. */
let vehicle = 'all';
const listeners = new Set<() => void>();

const set = (v: string) => {
  vehicle = v;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useTyreFilter() {
  const v = useSyncExternalStore(subscribe, () => vehicle, () => 'all');
  return [v, set] as const;
}
