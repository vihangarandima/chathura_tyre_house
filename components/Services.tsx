'use client';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';
import Pic from './Pic';
import { IconArrow } from './Icons';

const TARGET = { tyres: '#tyres', alloys: '#alloys', alignment: '#alignment' } as const;

/** One large and two stacked photo cards — the three things the shop does. */
export default function Services() {
  const { t } = useLang();
  return (
    <section className="sec wall" id="services" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.services.label}</span>
            <h2 id="svc-title" className="display h2 reveal" data-reveal>
              <span className="line">
                <span>{t.services.title}</span>
              </span>
            </h2>
          </div>
        </div>
        <div className="bento" data-rise data-reveal>
          {site.services.map((k, i) => (
            <a key={k} className="svc" href={TARGET[k]} style={{ ['--i' as string]: i }}>
              <div className="svc-img">
                <Pic
                  photo={site.photos[k]}
                  alt=""
                  w={i === 0 ? 900 : 640}
                  ratio={i === 0 ? 0.9 : 0.75}
                  widths={[480, 640, 900, 1200]}
                  sizes={i === 0 ? '(min-width: 900px) 56vw, 100vw' : '(min-width: 900px) 22vw, 100vw'}
                />
                <span className="svc-tag">{t.services.items[k].name}</span>
              </div>
              <div className="svc-body">
                <h3 className="display">{t.services.items[k].name}</h3>
                <p>{t.services.items[k].line}</p>
                <span className="more">
                  {t.services.more} <IconArrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
