'use client';
import { useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';

const PARTS = [
  { k: 'width', s: '195' },
  { sep: '/' },
  { k: 'aspect', s: '65' },
  { sep: ' ' },
  { k: 'construction', s: 'R' },
  { k: 'rim', s: '15' },
  { sep: ' ' },
  { k: 'load', s: '91' },
  { k: 'speed', s: 'H' },
] as const;
const KEYS = PARTS.filter((p) => 'k' in p).map((p) => (p as { k: string }).k);

/** Tap a part of 195/65 R15 91H to learn what it means. Arrow keys move between parts. */
export default function SizeDecoder() {
  const { t } = useLang();
  const [sel, setSel] = useState('width');
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const info = t.decoder.parts[sel];

  const onKey = (e: React.KeyboardEvent) => {
    const i = KEYS.indexOf(sel);
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const k = KEYS[(n + KEYS.length) % KEYS.length];
    setSel(k);
    btns.current[k]?.focus();
  };

  const share = async () => {
    const data = { title: t.decoder.title, text: t.decoder.shareText, url: `${location.origin}/#decoder` };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${data.text} ${data.url}`);
    } catch {}
  };

  return (
    <section className="sec wall lazy-paint" id="decoder" aria-labelledby="decoder-title">
      <div className="wrap decoder">
        <span className="eyebrow">{t.decoder.label}</span>
        <h2 id="decoder-title" className="display h2 reveal" data-reveal>
          <span className="line">
            <span>{t.decoder.title}</span>
          </span>
        </h2>
        <p className="lede">{t.decoder.hint}</p>
        <div className="code" role="tablist" aria-label={t.decoder.title} onKeyDown={onKey}>
          {PARTS.map((p, i) =>
            'sep' in p ? (
              <span key={i} className="sep" aria-hidden="true">
                {p.sep === ' ' ? ' ' : p.sep}
              </span>
            ) : (
              <button
                key={p.k}
                ref={(el) => {
                  btns.current[p.k] = el;
                }}
                role="tab"
                id={`dec-${p.k}`}
                aria-selected={sel === p.k}
                aria-controls="dec-panel"
                tabIndex={sel === p.k ? 0 : -1}
                onClick={() => setSel(p.k)}
              >
                {p.s}
              </button>
            ),
          )}
        </div>
        <div className="explain" id="dec-panel" role="tabpanel" aria-labelledby={`dec-${sel}`}>
          <h3 className="display">
            {info.k}
          </h3>
          <p>{info.d}</p>
        </div>
        <button className="btn ghost sm" onClick={share}>
          {t.decoder.share}
        </button>
      </div>
    </section>
  );
}
