'use client';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';
import { IconClock, IconGauge, IconScale, IconShield } from './Icons';

const ICONS = { alignment: IconGauge, balancing: IconScale, fitting: IconClock, genuine: IconShield } as const;

export default function Why() {
  const { t } = useLang();
  return (
    <section className="sec wall lazy-paint" aria-labelledby="why-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.why.label}</span>
            <h2 id="why-title" className="display h2 reveal" data-reveal>
              <span className="line">
                <span>{t.why.title}</span>
              </span>
            </h2>
          </div>
        </div>
        <ul className="why" data-rise data-reveal>
          {site.whyUs.map((k, i) => {
            const Icon = ICONS[k];
            return (
              <li key={k} style={{ ['--i' as string]: i }}>
                <span className="ico">
                  <Icon />
                </span>
                <h3>{t.why.items[k].t}</h3>
                <p>{t.why.items[k].d}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
