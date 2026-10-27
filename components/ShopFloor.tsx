'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';
import Pic from './Pic';
import { IconPlay } from './Icons';

/** Click-to-load facades: nothing heavy (video / TikTok) loads until a tap. */
export default function ShopFloor() {
  const { t } = useLang();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section className="sec lazy-paint" aria-labelledby="floor-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.floor.label}</span>
            <h2 id="floor-title" className="display h2 reveal" data-reveal>
              <span className="line">
                <span>{t.floor.title}</span>
              </span>
            </h2>
          </div>
          <div className="clip-links">
            <a className="btn" href={site.social.tiktok} target="_blank" rel="noopener">
              {t.floor.follow}
            </a>
            <a className="btn ghost" href={site.social.facebook} target="_blank" rel="noopener">
              {t.floor.fb} · {site.social.facebookFollowers}
            </a>
          </div>
        </div>
        <ul className="clips">
          {site.clips.map((c) => {
            const href = c.link || site.social.tiktok;
            return (
              <li key={c.id} className="clip">
                {c.poster && <Pic photo={c.poster} alt="" w={360} ratio={1.78} widths={[240, 360, 480]} sizes="240px" />}
                {playing === c.id && c.video ? (
                  <video src={c.video} poster={c.poster.startsWith('/') ? c.poster : undefined} autoPlay muted loop playsInline controls />
                ) : c.video ? (
                  <button onClick={() => setPlaying(c.id)} aria-label={`${t.floor.play}: ${c.caption}`}>
                    <span className="play">
                      <IconPlay />
                    </span>
                    <span className="clip-cap">{c.caption}</span>
                  </button>
                ) : (
                  <a className="clip-hit" href={href} target="_blank" rel="noopener" aria-label={`${t.floor.open}: ${c.caption}`}>
                    <span className="play">
                      <IconPlay />
                    </span>
                    <span className="clip-cap">{c.caption}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
