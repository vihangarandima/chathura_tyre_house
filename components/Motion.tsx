'use client';
import { prefersReduced, useMotion } from '@/lib/motion';

/**
 * Scroll-linked motion, loaded with GSAP on first interaction:
 * - [data-parallax="0.08"] drifts by that fraction of its height while it crosses the screen
 * - the hero wheel photo turns as you scroll away, like the wheel starting to roll
 * - full-bleed photos (.parallax-img) move slower than the page
 * Only transforms are animated. Reduced motion → nothing.
 */
export default function Motion() {
  useMotion(({ gsap, ScrollTrigger }) => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const k = parseFloat(el.dataset.parallax || '0.08');
        gsap.fromTo(
          el,
          { yPercent: -k * 100 },
          {
            yPercent: k * 100,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      const wheel = document.querySelector('.hero-tyre-img, .hero-disc img');
      if (wheel) {
        gsap.to(wheel, {
          rotate: 55,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      }

      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  });
  return null;
}
