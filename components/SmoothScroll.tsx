'use client';
import { useEffect } from 'react';
import type Lenis from 'lenis';
import { prefersReduced, useMotion } from '@/lib/motion';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * One RAF loop for the whole site: GSAP's ticker drives Lenis, ScrollTrigger
 * and (once loaded) the 3D renderer.
 */
export default function SmoothScroll() {
  // Anchor links go through Lenis (when running) so smooth scrolling stays consistent.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      const el = id === '#' || id === '#top' ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth' });
      if (el instanceof HTMLElement && el !== document.body) {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useMotion(({ gsap, ScrollTrigger, Lenis }) => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  });
  return null;
}
