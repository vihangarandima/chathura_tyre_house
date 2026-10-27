'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useLang } from '@/lib/i18n';
import { mapsUrl, site, waLink } from '@/content/site';
import Headline from './Headline';
import Pic from './Pic';
import { IconClock, IconPin, IconStar, IconWa, IconWrench } from './Icons';

const STAT_ICONS = [IconStar, IconClock, IconWrench];

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxLife: number;
  life: number;
  rgb: string;
}

/** Storefront hero: tyre rolls smoothly straight from left to right with road backdrop and trailing dust */
export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [animating, setAnimating] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const particlesRef = useRef<DustParticle[]>([]);
  const emitDustRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Resize canvas to match hero section
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const rect = hero.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // Main particle animation loop
  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const roller = rollerRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const heroRect = hero.getBoundingClientRect();
    const w = heroRect.width;
    const h = heroRect.height;

    ctx.clearRect(0, 0, w, h);

    // Get current position of tyre contact patch
    if (roller && emitDustRef.current) {
      const rollerRect = roller.getBoundingClientRect();
      const contactX = rollerRect.left - heroRect.left + rollerRect.width * 0.5;
      const contactY = rollerRect.top - heroRect.top + rollerRect.height * 0.94;

      // Realistic trailing road dust puffs behind the rolling tyre
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: contactX + (Math.random() - 0.5) * 20,
          y: contactY + (Math.random() - 0.5) * 6,
          vx: -3.5 - Math.random() * 4,
          vy: -0.8 - Math.random() * 2,
          radius: 7 + Math.random() * 10,
          maxRadius: 32 + Math.random() * 24,
          alpha: 0.32 + Math.random() * 0.16,
          maxLife: 26 + Math.random() * 16,
          life: 0,
          rgb: Math.random() > 0.4 ? '225, 215, 205' : '200, 195, 190',
        });
      }
    }

    // Render & update particles
    const list = particlesRef.current;
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.vy -= 0.1; // gentle float upward
      p.radius += (p.maxRadius - p.radius) * 0.05;
      p.life++;

      const lifeRatio = p.life / p.maxLife;
      const curAlpha = p.alpha * Math.max(0, 1 - lifeRatio);

      if (curAlpha <= 0.01 || p.life >= p.maxLife) {
        list.splice(i, 1);
        continue;
      }

      // Soft volumetric smoke / dust puff
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(${p.rgb}, ${curAlpha * 0.75})`);
      grad.addColorStop(0.5, `rgba(${p.rgb}, ${curAlpha * 0.35})`);
      grad.addColorStop(1, `rgba(${p.rgb}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(updateParticles);
  }, []);

  // Launch the clean direct left-to-right rollout
  const playRolloutAnimation = useCallback(() => {
    const heroEl = heroRef.current;
    const artEl = artRef.current;
    const rollerEl = rollerRef.current;
    const wheelEl = wheelRef.current;
    if (!heroEl || !artEl || !rollerEl || !wheelEl) return;

    setAnimating(true);

    const heroRect = heroEl.getBoundingClientRect();
    const artRect = artEl.getBoundingClientRect();

    const artCenterX = artRect.left + artRect.width * 0.5;
    // Start completely off-screen to the left:
    const startX = -(artCenterX + 350);
    const endX = 0;

    // Reset badges & insets
    gsap.set('.hero-badge, .hero-inset, .hero-floating-tag', { opacity: 0, scale: 0.75 });

    const tl = gsap.timeline({
      onStart: () => {
        emitDustRef.current = true;
      },
      onComplete: () => {
        emitDustRef.current = false;
        setAnimating(false);
        setHasPlayed(true);
      },
    });

    // Clean, direct roll straight from left off-screen all the way to right corner
    tl.fromTo(
      rollerEl,
      { x: startX, y: 0 },
      {
        x: endX,
        duration: 1.5,
        ease: 'power2.out',
      }
    );
    tl.fromTo(
      wheelEl,
      { rotate: 0 },
      {
        rotate: 1080,
        duration: 1.5,
        ease: 'power2.out',
      },
      '<'
    );

    // Stop emitting dust just as it reaches the spot
    tl.call(() => {
      emitDustRef.current = false;
    }, [], '-=0.25');

    // Subtle suspension settle
    tl.fromTo(
      rollerEl,
      { y: -12 },
      {
        y: 0,
        duration: 0.45,
        ease: 'bounce.out',
      }
    );

    // Pop in badges and tags
    tl.to(
      '.hero-badge, .hero-inset, .hero-floating-tag',
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'back.out(1.8)',
      },
      '-=0.2'
    );
  }, []);

  // Setup loop and run rollout on mount
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animFrameRef.current = requestAnimationFrame(updateParticles);

    const timer = setTimeout(() => {
      playRolloutAnimation();
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resizeCanvas, updateParticles, playRolloutAnimation]);

  return (
    <>
      <section className="hero" id="top" ref={heroRef} aria-labelledby="hero-title">
        {/* Dynamic Road Backdrop: eliminates the plain red wall */}
        <div className="hero-road-backdrop" aria-hidden="true">
          <img
            src="/shop/hero-road-bg.jpg"
            alt=""
            className="hero-road-bg-img"
            fetchPriority="high"
            loading="eager"
          />
          <div className="hero-road-overlay" />
        </div>

        {/* Ambient atmospheric lighting & mesh */}
        <div className="hero-bg-fx" aria-hidden="true">
          <div className="hero-glow-wheel" />
          <div className="hero-glow-ambient" />
          <div className="hero-light-streak" />
          <div className="hero-grid-mesh" />
          <div className="hero-speed-lines" />
          <div className="hero-tread-tracks" />
          <div className="hero-flare" />
        </div>

        {/* Particle Canvas for dynamic trailing dust */}
        <canvas ref={canvasRef} className="hero-dust-canvas" aria-hidden="true" />

        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">{t.hero.kicker}</span>
            <Headline as="h1" id="hero-title" lines={t.hero.title} onLoad />
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-ctas">
              <a className="btn white" href={waLink(t.waGeneral)} target="_blank" rel="noopener">
                <IconWa /> {t.hero.ctaWa}
              </a>
              <a className="btn ghost" href={mapsUrl} target="_blank" rel="noopener">
                <IconPin /> {t.hero.ctaDir}
              </a>
              {hasPlayed && !animating && (
                <button
                  type="button"
                  className="hero-replay-btn"
                  onClick={playRolloutAnimation}
                  title="Replay tyre roll"
                >
                  <span>↺</span>
                  <span>Replay Roll</span>
                </button>
              )}
            </div>
          </div>

          <div className="hero-art hero-tyre-art" ref={artRef} data-parallax="-0.08">
            {/* Tyre radial halo glow */}
            <div className="hero-tyre-halo" aria-hidden="true" />

            {/* Rolling Tyre Stage & Ground Shadow together */}
            <div
              className="hero-tyre-stage hero-tyre-roller"
              ref={rollerRef}
              onClick={!animating ? playRolloutAnimation : undefined}
              title="Click to roll again!"
              style={{ cursor: animating ? 'default' : 'pointer' }}
            >
              {/* Realistic Ground Contact Shadow under complete tyre */}
              <div className="hero-tyre-shadow" aria-hidden="true" />

              <img
                ref={wheelRef}
                src={site.photos.hero}
                alt={t.hero.photo}
                className="hero-tyre-img"
                width={700}
                height={700}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Google Rating Glass Badge */}
            <div className="hero-badge" aria-hidden="true">
              <div className="hero-badge-top">
                <span className="hero-badge-star">★</span>
                <span className="hero-badge-val">{site.rating.value}</span>
              </div>
              <small>Google Rating</small>
            </div>

            {/* Polaroid Workshop Inset */}
            <figure className="hero-inset">
              <Pic photo={site.photos.heroInset} alt="" w={360} ratio={0.75} widths={[240, 360, 480]} sizes="220px" />
              <b>{t.hero.stats[2].v(site.rating.value, site.rating.count)}</b>
            </figure>

            {/* Floating Quality / Genuine Tag */}
            <div className="hero-floating-tag" aria-hidden="true">
              <span className="hero-tag-pulse" />
              <span>100% Genuine Tyres & Alloys</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap stats">
        <ul>
          {t.hero.stats.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <li key={s.k}>
                <Icon />
                <div>
                  <small>{s.k}</small>
                  <b>{s.v(site.rating.value, site.rating.count)}</b>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
