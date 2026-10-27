'use client';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';

const dev = process.env.NODE_ENV !== 'production';

export default function Reviews() {
  const { t } = useLang();
  const list = site.reviews.filter((r) => dev || !r.placeholder);
  const full = Math.round(site.rating.value);

  return (
    <section className="sec lazy-paint" aria-labelledby="reviews-title">
      <div className="wrap reviews">
        <div className="score">
          <span className="eyebrow">{t.reviews.label}</span>
          <h2 id="reviews-title" className="sr-only">
            {site.rating.value} / 5 {t.reviews.onGoogle(site.rating.count)}
          </h2>
          <b className="display" aria-hidden="true">
            {site.rating.value.toFixed(1)}
          </b>
          <span className="stars" aria-hidden="true">
            {'★'.repeat(full)}
            {'☆'.repeat(5 - full)}
          </span>
          <p>{t.reviews.onGoogle(site.rating.count)}</p>
          <div>
            <a className="btn ghost sm" href={site.rating.googleUrl} target="_blank" rel="noopener">
              {t.reviews.read}
            </a>
          </div>
        </div>
        {list.length > 0 && (
          <div className="review-list" data-rise data-reveal>
            {list.map((r, i) => (
              <figure key={i} className={`review${r.placeholder ? ' ph' : ''}`} style={{ ['--i' as string]: i }}>
                <span className="stars" style={{ fontSize: 15 }} aria-label={`${r.stars} / 5`}>
                  {'★'.repeat(r.stars)}
                </span>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  {r.name}
                  {r.placeholder && ' · [owner to paste — dev only]'}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
