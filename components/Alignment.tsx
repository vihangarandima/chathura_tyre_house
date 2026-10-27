'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';
import { site, waLink } from '@/content/site';
import { bigEase, prefersReduced } from '@/lib/motion';
import Headline from './Headline';
import Pic from './Pic';
import { IconAlert, IconWa } from './Icons';

const CAMBER0 = -2.4;
const TOE0 = 1.8;

/**
 * Top-down chassis in SVG. Scroll scrubs from "misaligned" (toed-out wheels,
 * edge wear, car drifting off the yellow line) to "aligned". Direct DOM
 * writes on rAF — no React re-render per frame.
 */
export default function Alignment() {
  const { t } = useLang();
  const sec = useRef<HTMLElement>(null);
  const car = useRef<SVGGElement>(null);
  const fl = useRef<SVGGElement>(null);
  const fr = useRef<SVGGElement>(null);
  const wear = useRef<SVGRectElement>(null);
  const camber = useRef<HTMLElement>(null);
  const toe = useRef<HTMLElement>(null);
  const trail = useRef<SVGPathElement>(null);

  useEffect(() => {
    const apply = (raw: number) => {
      const p = bigEase(raw);
      const k = 1 - p;
      const toeDeg = TOE0 * k;
      car.current!.setAttribute('transform', `translate(${34 * k} 0) rotate(${7 * k} 200 300)`);
      fl.current!.setAttribute('transform', `rotate(${-toeDeg * 4} 109 180)`);
      fr.current!.setAttribute('transform', `rotate(${toeDeg * 4} 291 180)`);
      wear.current!.style.opacity = String(k);
      trail.current!.setAttribute('d', `M200 600 Q ${200 + 10 * k} 380 ${200 + 60 * k} 120`);
      const c = CAMBER0 * k;
      const tv = toeDeg;
      camber.current!.textContent = `${c <= -0.05 ? '−' : ''}${Math.abs(c).toFixed(1)}°`;
      toe.current!.textContent = `${tv >= 0.05 ? '+' : ''}${tv.toFixed(1)}°`;
      camber.current!.parentElement!.classList.toggle('ok', Math.abs(c) < 0.05);
      toe.current!.parentElement!.classList.toggle('ok', Math.abs(tv) < 0.05);
    };

    if (prefersReduced()) {
      apply(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.current!.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts once the section fills the screen, aligned before it leaves
      const p = (vh * 0.1 - r.top) / Math.max(1, r.height - vh * 0.6);
      apply(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sec} className="sec lazy-paint" id="alignment" aria-labelledby="align-title">
      <div className="wrap align-grid">
        <div className="align-visual on-dark">
          <Pic photo={site.photos.workshop} alt="" w={800} ratio={1.1} widths={[480, 800, 1100]} sizes="(min-width: 900px) 45vw, 100vw" className="align-photo" />
          <svg className="car-svg" viewBox="0 0 400 600" role="img" aria-label={t.align.desc}>
            <line className="guide" x1="200" y1="0" x2="200" y2="600" />
            <path ref={trail} d="M200 600 Q 210 380 260 120" fill="none" stroke="var(--red)" strokeWidth="3" opacity=".8" />
            <g ref={car}>
              <rect className="wheel" x="92" y="380" width="34" height="80" rx="6" />
              <rect className="wheel" x="274" y="380" width="34" height="80" rx="6" />
              <g ref={fl}>
                <rect className="wheel" x="92" y="140" width="34" height="80" rx="6" />
                <rect ref={wear} className="wear" x="92" y="146" width="7" height="68" rx="2" />
              </g>
              <g ref={fr}>
                <rect className="wheel" x="274" y="140" width="34" height="80" rx="6" />
              </g>
              <rect className="body" x="118" y="70" width="164" height="460" rx="56" />
              <path className="body" d="M140 200 Q200 170 260 200 M140 430 Q200 450 260 430" fill="none" />
            </g>
          </svg>
        </div>

        <div style={{ display: 'grid', gap: 26 }}>
          <div style={{ display: 'grid', gap: 14 }}>
            <span className="eyebrow">{t.align.label}</span>
            <Headline id="align-title" lines={t.align.title} className="h2" />
          </div>
          <div className="readouts">
            <div className="readout">
              <small>{t.align.camber}</small>
              <b ref={camber}>−2.4°</b>
            </div>
            <div className="readout">
              <small>{t.align.toe}</small>
              <b ref={toe}>+1.8°</b>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 17, marginBottom: 8 }}>{t.align.signsTitle}</h3>
            <ul className="signs">
              {t.align.signs.map((s) => (
                <li key={s}>
                  <IconAlert />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a className="btn" href={waLink(t.align.waMsg)} target="_blank" rel="noopener">
              <IconWa /> {t.align.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
