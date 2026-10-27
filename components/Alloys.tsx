'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { site, waLink } from '@/content/site';
import Headline from './Headline';
import Pic from './Pic';
import { IconWa } from './Icons';

/** Dark band: a staggered wall of real rim photos, filterable by style. */
export default function Alloys() {
  const { t } = useLang();
  const [style, setStyle] = useState('all');
  const items = site.alloyWall.filter((a) => style === 'all' || a.style === style);

  return (
    <section className="sec on-dark alloys" id="alloys" aria-labelledby="alloys-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.alloys.label}</span>
            <Headline id="alloys-title" lines={t.alloys.title} className="h2" />
            <p className="lede">{t.alloys.sub}</p>
          </div>
          <div className="chips" role="group" aria-label={t.alloys.label}>
            {['all', ...site.alloyStyles].map((s) => (
              <button key={s} className="chip" aria-pressed={style === s} onClick={() => setStyle(s)}>
                {s === 'all' ? t.alloys.all : t.alloys.styles[s]}
              </button>
            ))}
          </div>
        </div>

        <ul className="alloy-grid">
          {items.map((a) => (
            <li key={a.photo}>
              <figure className="alloy" data-parallax="0.05">
                <Pic
                  photo={a.photo}
                  alt={`${t.alloys.styles[a.style]} alloy wheel`}
                  w={480}
                  ratio={1.33}
                  widths={[320, 480, 640]}
                  sizes="(min-width: 900px) 24vw, 47vw"
                />
                <figcaption>
                  <span>{t.alloys.styles[a.style]}</span>
                  <a
                    className="btn sm"
                    href={waLink(t.alloys.waMsg(t.alloys.styles[a.style]))}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${t.alloys.ask}: ${t.alloys.styles[a.style]}`}
                  >
                    {t.alloys.ask}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="alloys-foot">
          <span>{t.alloys.note}</span>
          <a className="btn white" href={waLink(t.alloys.waGeneral)} target="_blank" rel="noopener">
            <IconWa /> {t.alloys.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
