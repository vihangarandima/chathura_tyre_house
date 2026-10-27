'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { site, mapsUrl } from '@/content/site';
import { DAYS, colomboNow, fmtTime } from '@/lib/hours';
import Headline from './Headline';
import OpenBadge from './OpenBadge';
import { IconPhone, IconPin } from './Icons';

/** Light stylised map of the A11 stretch; the real Google Maps iframe loads only on tap. */
function StaticMap() {
  return (
    <svg className="map-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill="#eceae4" />
      <path d="M0 60 Q120 90 180 40 T400 70" stroke="#fff" strokeWidth="6" fill="none" />
      <path d="M60 300 Q90 200 40 120 T80 0" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M260 300 Q300 220 360 200 T400 150" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M150 300 L170 180 L240 120 L250 0" stroke="#fff" strokeWidth="4" fill="none" />
      <rect x="290" y="210" width="80" height="50" rx="6" fill="#cfe3c4" />
      <rect x="20" y="170" width="60" height="70" rx="6" fill="#cfe3c4" />
      <path d="M-10 250 C 90 210, 160 190, 230 140 S 360 60, 420 40" stroke="#f6c76b" strokeWidth="14" fill="none" />
      <path d="M-10 250 C 90 210, 160 190, 230 140 S 360 60, 420 40" stroke="#e1a73c" strokeWidth="1.5" strokeDasharray="8 8" fill="none" />
      <g transform="translate(300 74) rotate(-24)">
        <rect x="-16" y="-10" width="32" height="20" rx="3" fill="#fff" stroke="#999" />
        <text x="0" y="5" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="12" fill="#333">A11</text>
      </g>
      <text x="246" y="178" fill="#121316" fontFamily="sans-serif" fontWeight="700" fontSize="12">Chathura Tyre House</text>
      <text x="246" y="193" fill="#4b4e56" fontFamily="monospace" fontSize="10">{site.address.plusCode}</text>
      <circle cx="230" cy="140" r="22" fill="#E3120B" opacity=".18" />
      <circle cx="230" cy="140" r="8" fill="#E3120B" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

export default function Visit() {
  const { t, lang } = useLang();
  const [map, setMap] = useState(false);
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(colomboNow().day), []);

  return (
    <section className="sec on-red visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit-grid">
        <div className="info">
          <div style={{ display: 'grid', gap: 16 }}>
            <span className="eyebrow">{t.visit.label}</span>
            <Headline id="visit-title" lines={t.visit.title} className="h2" />
            <OpenBadge />
          </div>
          <dl className="info" style={{ gap: 22 }}>
            <div>
              <dt>{t.visit.address}</dt>
              <dd>
                <address style={{ fontStyle: 'normal' }}>
                  {site.legalName}
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.city}
                </address>
              </dd>
            </div>
            <div>
              <dt>{t.visit.phone}</dt>
              <dd style={{ display: 'grid', gap: 4 }}>
                <a href={`tel:${site.phones.mobile.tel}`}>{site.phones.mobile.display}</a>
                <a href={`tel:${site.phones.landline.tel}`}>{site.phones.landline.display}</a>
              </dd>
            </div>
            <div>
              <dt>{t.visit.hours}</dt>
              <dd>
                <div className="hours">
                  {DAYS.map((d) => {
                    const h = site.hours[d];
                    const cls = today === d ? 'today' : undefined;
                    return (
                      <div key={d} style={{ display: 'contents' }}>
                        <span className={cls}>{t.visit.days[d]}</span>
                        <span className={cls}>
                          {h ? `${fmtTime(h.open, lang)} – ${fmtTime(h.close, lang)}` : t.visit.closedDay}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </dd>
            </div>
          </dl>
          <div className="visit-ctas">
            <a className="btn white" href={mapsUrl} target="_blank" rel="noopener" data-magnetic>
              <IconPin /> {t.visit.directions}
            </a>
            <a className="btn ghost" href={`tel:${site.phones.mobile.tel}`} data-magnetic>
              <IconPhone /> {t.visit.call}
            </a>
          </div>
        </div>

        <div className="map">
          {map ? (
            <iframe
              title={`${site.shortName} map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.plusCode} ${site.address.city}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <>
              <StaticMap />
              <button className="btn ink sm" onClick={() => setMap(true)}>
                {t.visit.map}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
