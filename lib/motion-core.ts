'use client';
// Heavy motion libraries live here so they can be split out of the first-load bundle.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let registered = false;
export function getGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out' });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { Lenis };
