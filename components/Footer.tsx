'use client';
import { useLang } from '@/lib/i18n';
import { site, mapsUrl } from '@/content/site';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <p className="footer-word display" aria-label={site.shortName}>
            <span>Chathura </span>
            <span>Tyre House</span>
          </p>
          <div className="footer-cols">
            <div>
              <h3>{t.visit.label}</h3>
              <ul>
                <li>
                  <a href={mapsUrl} target="_blank" rel="noopener">
                    {site.address.line1}, {site.address.city}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phones.mobile.tel}`}>{site.phones.mobile.display}</a>
                </li>
                <li>
                  <a href={`tel:${site.phones.landline.tel}`}>{site.phones.landline.display}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Social</h3>
              <ul>
                <li>
                  <a href={site.social.facebook} target="_blank" rel="noopener">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={site.social.tiktok} target="_blank" rel="noopener">
                    TikTok
                  </a>
                </li>
                <li>
                  <a href="#top">{t.footer.top} ↑</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bot">
          <span>
            © {new Date().getFullYear()} {site.legalName}. {t.footer.rights}
          </span>
          <span>{t.footer.photos}</span>
        </div>
      </div>
    </footer>
  );
}
