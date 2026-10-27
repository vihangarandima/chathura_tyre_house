'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang, type Lang } from '@/lib/i18n';
import { site, waLink, mapsUrl } from '@/content/site';
import OpenBadge from './OpenBadge';
import { IconWa, LogoGlyph } from './Icons';

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last.current;
      if (Math.abs(dy) > 8) {
        setHidden(dy > 0 && y > 400);
        last.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    burger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const links = [
    ['#tyres', t.nav.tyres],
    ['#alloys', t.nav.alloys],
    ['#alignment', t.nav.alignment],
    ['#visit', t.nav.visit],
  ] as const;

  const langToggle = (
    <div className="lang" role="group" aria-label="Language">
      {(['en', 'si'] as Lang[]).map((l) => (
        <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
          {l === 'en' ? 'EN' : 'සිං'}
        </button>
      ))}
    </div>
  );

  const logo = (
    <a href="#top" className="logo" aria-label={site.shortName}>
      <span className="logo-mark">
        <LogoGlyph />
      </span>
      <span className="logo-word">
        Chathura
        <small>Tyre House</small>
      </span>
    </a>
  );

  return (
    <>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <div className="topbar">
        <div className="wrap">
          <OpenBadge />
          <div className="topbar-r">
            <a className="hide-sm" href={`tel:${site.phones.landline.tel}`}>
              {site.phones.landline.display}
            </a>
            <a className="phone" href={`tel:${site.phones.mobile.tel}`}>
              {site.phones.mobile.display}
            </a>
            {langToggle}
          </div>
        </div>
      </div>
      <header className={`nav${hidden && !open ? ' hidden' : ''}`}>
        <div className="wrap">
          {logo}
          <nav className="nav-links" aria-label="Main">
            {links.map(([h, l]) => (
              <a key={h} href={h}>
                {l}
              </a>
            ))}
          </nav>
          <a className="btn sm" href={waLink(t.waGeneral)} target="_blank" rel="noopener">
            <IconWa /> {t.nav.whatsapp}
          </a>
          <button
            ref={burger}
            className="burger"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu" className={`menu${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label={t.nav.menu} inert={!open}>
        <div className="menu-top">
          <span className="logo-word">
            Chathura<small style={{ color: '#fff' }}>Tyre House</small>
          </span>
          <button className="btn white sm" onClick={close}>
            {t.nav.close}
          </button>
        </div>
        <nav aria-label="Mobile">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="display" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`tel:${site.phones.mobile.tel}`}>{site.phones.mobile.display}</a>
          <a href={mapsUrl} target="_blank" rel="noopener">
            {site.address.line1}, {site.address.city}
          </a>
        </div>
      </div>
    </>
  );
}
