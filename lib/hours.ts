import { site, type DayKey } from '@/content/site';

export const DAYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const WEEKDAY: Record<string, DayKey> = { Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun' };

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Current day + minutes in Asia/Colombo, regardless of the visitor's own timezone. */
export function colomboNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: WEEKDAY[get('weekday')] ?? 'mon', minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type OpenStatus = { open: boolean; time: string };

/** open → time = closing time today; closed → time = next opening time. */
export function openStatus(date = new Date()): OpenStatus {
  const { day, minutes } = colomboNow(date);
  const today = site.hours[day];
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, time: today.close };
  }
  if (today && minutes < toMin(today.open)) return { open: false, time: today.open };
  for (let i = 1; i <= 7; i++) {
    const next = site.hours[DAYS[(DAYS.indexOf(day) + i) % 7]];
    if (next) return { open: false, time: next.open };
  }
  return { open: false, time: '' };
}

export function fmtTime(hhmm: string, lang: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 || 12;
  const mm = m ? `:${String(m).padStart(2, '0')}` : '';
  if (lang === 'si') return `${h < 12 ? 'පෙ.ව.' : 'ප.ව.'} ${h12}${mm}`;
  return `${h12}${mm} ${h < 12 ? 'AM' : 'PM'}`;
}
