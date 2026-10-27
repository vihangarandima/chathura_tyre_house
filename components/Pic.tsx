import { src, srcSet, type Photo } from '@/lib/img';

/**
 * Responsive photo with fixed intrinsic size (no layout shift).
 * `ratio` = height / width of the crop; omit to keep the original framing.
 */
export default function Pic({
  photo,
  alt,
  w,
  ratio,
  sizes = '100vw',
  widths = [400, 640, 960, 1280],
  priority = false,
  className,
}: {
  photo: Photo;
  alt: string;
  w: number;
  ratio?: number;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  className?: string;
}) {
  const h = ratio ? Math.round(w * ratio) : Math.round(w * 0.75);
  return (
    <img
      className={className}
      src={src(photo, w, ratio ? h : undefined)}
      srcSet={srcSet(photo, widths, ratio)}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
