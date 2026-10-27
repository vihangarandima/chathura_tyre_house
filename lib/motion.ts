'use client';
import { useEffect } from 'react';

type Core = typeof import('./motion-core');
export type Motion = ReturnType<Core['getGsap']> & { Lenis: Core['Lenis'] };

/*
 * GSAP, ScrollTrigger and Lenis are NOT in the first-load bundle. They (and the
 * 3D chunk) load on the visitor's first pointer / touch / wheel / key,
 * so the initial page is just HTML, CSS and React hydration.
 */
// no 'scroll': tools (and the browser restoring position) fire it without a visitor
const INTENT = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'] as const;

let intent: Promise<void> | null = null;
export function firstIntent() {
  if (!intent) {
    intent = new Promise<void>((resolve) => {
      const go = () => {
        INTENT.forEach((e) => window.removeEventListener(e, go));
        resolve();
      };
      INTENT.forEach((e) => window.addEventListener(e, go, { passive: true }));
    });
  }
  return intent;
}

let core: Promise<Motion> | null = null;
export function loadMotion() {
  core ??= firstIntent()
    .then(() => import('./motion-core'))
    .then((m) => ({ ...m.getGsap(), Lenis: m.Lenis }));
  return core;
}

/** Run `setup` once motion libs are loaded; its return value is the cleanup. */
export function useMotion(setup: (m: Motion) => void | (() => void), enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let dead = false;
    let cleanup: void | (() => void);
    loadMotion().then((m) => {
      if (!dead) cleanup = setup(m);
    });
    return () => {
      dead = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

/** Our "big move" curve: cubic-bezier(0.7, 0, 0.2, 1) */
export const BIG = 'cubic-bezier(0.7, 0, 0.2, 1)';
export const bigEase = (t: number) => {
  // numeric approximation of cubic-bezier(.7,0,.2,1) for GSAP
  const cx = 3 * 0.7, bx = 3 * (0.2 - 0.7) - cx, ax = 1 - cx - bx;
  const cy = 0, by = 3 * (1 - 0) - cy, ay = 1 - cy - by;
  let x = t;
  for (let i = 0; i < 6; i++) {
    const fx = ((ax * x + bx) * x + cx) * x - t;
    const dx = (3 * ax * x + 2 * bx) * x + cx;
    if (Math.abs(dx) < 1e-6) break;
    x -= fx / dx;
  }
  return ((ay * x + by) * x + cy) * x;
};

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;
