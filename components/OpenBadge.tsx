'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { fmtTime, openStatus, type OpenStatus } from '@/lib/hours';

/** Live "Open now · Closes 8 PM" computed in Asia/Colombo time. Fixed width = no layout shift. */
export default function OpenBadge() {
  const { t, lang } = useLang();
  const [s, setS] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const update = () => setS(openStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  const cls = s ? (s.open ? 'open' : 'closed') : '';
  return (
    <span className={`badge ${cls}`} role="status">
      <i aria-hidden="true" />
      {s ? (
        <span>
          {s.open ? t.status.open : t.status.closed}
          {s.time && ` · ${s.open ? t.status.closes(fmtTime(s.time, lang)) : t.status.opens(fmtTime(s.time, lang))}`}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </span>
  );
}
