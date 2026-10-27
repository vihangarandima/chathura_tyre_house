// Inline SVG icons (Lucide-style strokes) — tiny, no icon font, no emoji.
type P = { className?: string };
const S = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  />
);

export const IconWa = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3Z" />
  </svg>
);
export const IconPhone = ({ className }: P) => (
  <S className={className}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </S>
);
export const IconPin = ({ className }: P) => (
  <S className={className}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </S>
);
export const IconArrow = ({ className }: P) => (
  <S className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);
export const IconPlay = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);
export const IconStar = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);
export const IconClock = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);
export const IconWrench = ({ className }: P) => (
  <S className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </S>
);
export const IconGauge = ({ className }: P) => (
  <S className={className}>
    <path d="M12 14 16 9" />
    <path d="M3.3 17a9 9 0 1 1 17.4 0" />
    <circle cx="12" cy="14" r="1.5" />
  </S>
);
export const IconScale = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z" />
  </S>
);
export const IconShield = ({ className }: P) => (
  <S className={className}>
    <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </S>
);
export const IconAlert = ({ className }: P) => (
  <S className={className}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  </S>
);
/** Logo glyph: a tyre seen side-on — rim, hub, five lugs. */
export const LogoGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="12" cy="12" r="3" fill="#fff" />
    {[0, 72, 144, 216, 288].map((a) => (
      <rect key={a} x="11.2" y="4.6" width="1.6" height="3" fill="#fff" transform={`rotate(${a} 12 12)`} />
    ))}
  </svg>
);
