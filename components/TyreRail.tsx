'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { site, waLink } from '@/content/site';
import { useTyreFilter } from '@/lib/filter';
import Pic from './Pic';
import { IconWa } from './Icons';

/** Product grid of common sizes with vehicle chips — the shop window. */
export default function TyreRail() {
  const { t } = useLang();
  const [vehicle, setVehicle] = useTyreFilter();
  const [brand, setBrand] = useState('all');

  const items = site.tyreRange.filter(
    (r) => (vehicle === 'all' || r.vehicle === vehicle) && (brand === 'all' || r.brand === brand),
  );

  return (
    <section className="sec" id="tyres" aria-labelledby="tyres-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.tyres.label}</span>
            <h2 id="tyres-title" className="display h2 reveal" data-reveal>
              <span className="line">
                <span>{t.tyres.title}</span>
              </span>
            </h2>
          </div>
        </div>

        <div className="filter-row">
          <div className="chips" role="group" aria-label={t.vehicles.label}>
            {['all', ...site.vehicles].map((v) => (
              <button key={v} className="chip" aria-pressed={vehicle === v} onClick={() => setVehicle(v)}>
                {v === 'all' ? t.tyres.all : t.tyres.vehicles[v]}
              </button>
            ))}
          </div>
          <label className="select">
            <span className="sr-only">{t.tyres.byBrand}</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} disabled={!site.brands.length}>
              <option value="all">
                {t.tyres.byBrand}: {site.brands.length ? t.tyres.all : t.tyres.brandsAsk}
              </option>
              {site.brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className="grid" aria-live="polite">
          {items.length === 0 && <li className="empty">{t.tyres.note}</li>}
          {items.map((r) => {
            const v = t.tyres.vehicles[r.vehicle];
            return (
              <li key={r.id} className="card">
                <div className="card-img">
                  <Pic
                    photo={r.photo}
                    alt=""
                    w={420}
                    ratio={1}
                    widths={[240, 360, 480]}
                    sizes="(min-width: 1100px) 18vw, (min-width: 720px) 30vw, 46vw"
                  />
                  <span className="pill">{v}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-size">{r.size}</h3>
                  <div className="card-meta">
                    <span>R{r.rim}</span>
                    <span>{r.brand ?? t.tyres.price}</span>
                  </div>
                  <a className="btn sm" href={waLink(t.tyres.waMsg(v, r.size))} target="_blank" rel="noopener">
                    <IconWa /> {t.tyres.check}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="grid-note">{t.tyres.note}</p>

        {site.brands.length > 0 && (
          <>
            <p className="eyebrow" style={{ marginTop: 48 }}>
              {t.tyres.brandsTitle}
            </p>
            <div className="brands">
              {site.brands.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
