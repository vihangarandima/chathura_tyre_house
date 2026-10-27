'use client';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';
import Pic from './Pic';

/** Full-bleed Sri Lankan street photo; drifts slower than the page (parallax). */
export default function Street() {
  const { t } = useLang();
  return (
    <section className="street" aria-labelledby="street-q">
      <Pic
        photo={site.photos.street}
        alt={t.street.photo}
        w={1600}
        ratio={0.62}
        widths={[640, 960, 1280, 1600, 2000]}
        sizes="100vw"
        className="parallax-img"
      />
      <div className="wrap">
        <span className="eyebrow" style={{ color: '#fff' }}>
          {t.street.label}
        </span>
        <blockquote id="street-q" className="display reveal" data-reveal>
          <span className="line">
            <span>{t.street.quote}</span>
          </span>
        </blockquote>
      </div>
    </section>
  );
}
