'use client';
import { useLang } from '@/lib/i18n';

/** Black tape band across the page. Pure CSS animation (compositor only). */
export default function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" role="img" aria-label={t.marquee.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {[...items, ...items].map((w, i) => (
          <span key={i} className="marquee-item display">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
