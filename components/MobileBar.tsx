'use client';
import { useLang } from '@/lib/i18n';
import { site, mapsUrl, waLink } from '@/content/site';
import { IconPhone, IconPin, IconWa } from './Icons';

/** Mobile only: the three things a customer actually wants. */
export default function MobileBar() {
  const { t } = useLang();
  return (
    <nav className="mbar" aria-label="Quick actions">
      <a href={`tel:${site.phones.mobile.tel}`}>
        <IconPhone /> {t.bar.call}
      </a>
      <a className="wa" href={waLink(t.waGeneral)} target="_blank" rel="noopener">
        <IconWa /> {t.bar.wa}
      </a>
      <a href={mapsUrl} target="_blank" rel="noopener">
        <IconPin /> {t.bar.dir}
      </a>
    </nav>
  );
}
