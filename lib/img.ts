/**
 * Photo URLs. Stock photos come from Unsplash's CDN (free Unsplash License,
 * commercial use allowed); the CDN resizes and serves AVIF/WebP automatically.
 * Owner photos dropped into /public/shop are plain paths and pass through untouched.
 */
export type Photo = string; // Unsplash id ("1616788902258-138db56fe7e5") or "/shop/file.jpg"

const isLocal = (p: Photo) => p.startsWith('/');

export function src(p: Photo, w: number, h?: number, q = 70) {
  if (isLocal(p)) return p;
  const crop = h ? `&h=${h}&fit=crop&crop=entropy` : '';
  return `https://images.unsplash.com/photo-${p}?auto=format&w=${w}${crop}&q=${q}`;
}

/** Responsive srcset at a fixed aspect ratio (ratio = h / w). */
export function srcSet(p: Photo, widths: number[], ratio?: number) {
  if (isLocal(p)) return undefined;
  return widths.map((w) => `${src(p, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ');
}
