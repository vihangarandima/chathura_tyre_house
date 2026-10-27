import type { ElementType } from 'react';

/** Masked line-by-line reveal. Lines come pre-split from the dictionaries. */
export default function Headline({
  as: Tag = 'h2',
  lines,
  className = '',
  accentLast = false,
  id,
  onLoad = false,
}: {
  as?: ElementType;
  lines: string[];
  className?: string;
  accentLast?: boolean;
  id?: string;
  /** animate on page load with CSS only (above-the-fold headlines) instead of on scroll */
  onLoad?: boolean;
}) {
  return (
    <Tag
      id={id}
      className={`display lines ${onLoad ? 'load-in' : 'reveal'} ${className}`}
      data-reveal={onLoad ? undefined : ''}
    >
      {lines.map((l, i) => (
        <span key={i} className={`line${accentLast && i === lines.length - 1 ? ' red-word' : ''}`}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
