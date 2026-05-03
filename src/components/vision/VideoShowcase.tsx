'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoShowcase.module.css';

const OVERLAYS = [
  { start: 0.05, end: 0.30, label: 'Visualización 3D', title: 'Materialidad y luz natural' },
  { start: 0.35, end: 0.60, label: 'Diseño contextual', title: 'Cada proyecto responde al sitio' },
  { start: 0.65, end: 0.85, label: 'Render fotorrealista', title: 'IA aplicada al diseño' },
];

export function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(-1);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // GSAP scroll-driven video (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!section || !pin || !frame || !video || !bar) return;

    let ctx: { revert: () => void } | null = null;

    async function initGSAP() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Wait for video to be fully buffered for smooth scrubbing
      await new Promise<void>((resolve) => {
        if (video!.readyState >= 4) {
          resolve();
        } else {
          video!.addEventListener('canplaythrough', () => resolve(), { once: true });
          // Force load
          video!.load();
        }
      });

      let lastTime = -1;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          pin: pin,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Scrub video — only update if time actually changed (avoid redundant seeks)
            const targetTime = progress * video!.duration;
            if (Math.abs(targetTime - lastTime) > 0.03) {
              lastTime = targetTime;
              video!.currentTime = targetTime;
            }

            // Progress bar
            bar!.style.transform = `scaleX(${progress})`;

            // Overlays
            let active = -1;
            for (let i = 0; i < OVERLAYS.length; i++) {
              if (progress >= OVERLAYS[i].start && progress <= OVERLAYS[i].end) {
                active = i;
                break;
              }
            }
            setActiveOverlay(active);

            // Shrink animation (0.85 → 1.0)
            if (progress >= 0.85) {
              const shrinkProgress = (progress - 0.85) / 0.15;
              const scale = 1 - shrinkProgress * 0.08;
              const radius = shrinkProgress * 12;
              frame!.style.transform = `scale(${scale})`;
              frame!.style.borderRadius = `${radius}px`;
              frame!.style.borderColor = `rgba(226, 222, 214, ${shrinkProgress})`;
            } else {
              frame!.style.transform = 'scale(1)';
              frame!.style.borderRadius = '0px';
              frame!.style.borderColor = 'rgba(226, 222, 214, 0)';
            }
          },
        });
      }, section!);
    }

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  // Mobile: simple autoplay
  useEffect(() => {
    if (!isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className={styles.mobileSection}>
        <div className={styles.mobileLabel}>Visualización 3D</div>
        <div className={styles.mobileFrame}>
          <video
            ref={videoRef}
            className={styles.video}
            src="/videos/render-casa-scrub.mp4"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className={styles.caption}>
          <p className={styles.captionTitle}>Render Arquitectónico</p>
          <p className={styles.captionDesc}>
            Visualización fotorrealista generada con inteligencia artificial — materialidad, luz natural y contexto.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.scrollSection}>
      <div ref={pinRef} className={styles.pinContainer}>
        <div ref={frameRef} className={styles.videoFrame}>
          <video
            ref={videoRef}
            className={styles.video}
            src="/videos/render-casa-scrub.mp4"
            muted
            playsInline
            preload="auto"
          />
          <div className={styles.overlays}>
            {OVERLAYS.map((overlay, i) => (
              <div
                key={i}
                className={`${styles.overlay} ${activeOverlay === i ? styles.overlayVisible : ''}`}
              >
                <div className={styles.overlayLabel}>{overlay.label}</div>
                <div className={styles.overlayTitle}>{overlay.title}</div>
              </div>
            ))}
          </div>
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </div>
    </section>
  );
}
