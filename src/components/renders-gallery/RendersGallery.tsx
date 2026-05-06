'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './RendersGallery.module.css';

type GalleryItem =
  | { type: 'image'; src: string; alt: string; height: string; top: string; width: string; gap?: string }
  | { type: 'text'; text: string; sub?: string; top: string; gap?: string };

const ITEMS: GalleryItem[] = [
  { type: 'image', src: '/images/renders/Renders Accesso.png', alt: 'Acceso principal', height: '38vh', top: '16vh', width: '30vw', gap: '0' },
  { type: 'image', src: '/images/renders/Etoneo Facade Render.png', alt: 'Fachada Etoneo', height: '50vh', top: '40vh', width: '40vw', gap: '6vw' },
  { type: 'text', text: 'Cada render explora materialidad, luz y contexto.', top: '12vh', gap: '10vw' },
  { type: 'image', src: '/images/renders/Pasillo Render.png', alt: 'Pasillo interior', height: '34vh', top: '40vh', width: '24vw', gap: '5vw' },
  { type: 'image', src: '/images/renders/AI Comedor Render.png', alt: 'Comedor', height: '44vh', top: '10vh', width: '35vw', gap: '5vw' },
  { type: 'image', src: '/images/renders/Cocina Render.png', alt: 'Cocina', height: '38vh', top: '54vh', width: '28vw', gap: '4vw' },
  { type: 'text', text: 'Luz natural como material de proyecto.', sub: 'Visualización fotorrealista', top: '14vh', gap: '8vw' },
  { type: 'image', src: '/images/renders/Penelope Facade Render.png', alt: 'Fachada Penelope', height: '48vh', top: '10vh', width: '38vw', gap: '6vw' },
  { type: 'image', src: '/images/renders/Oficina Urbe.png', alt: 'Oficina Urbe', height: '36vh', top: '58vh', width: '26vw', gap: '8vw' },
  { type: 'text', text: 'Tecnología al servicio del diseño.', sub: 'Render + BIM', top: '64vh', gap: '5vw' },
  { type: 'image', src: '/images/renders/Renders TORRE.png', alt: 'Torre', height: '54vh', top: '30vh', width: '42vw', gap: '0vw' },
  { type: 'image', src: '/images/renders/Pasillo 2 Render.png', alt: 'Pasillo', height: '50vh', top: '10vh', width: '28vw', gap: '3vw' },
  { type: 'image', src: '/images/renders/Renders Living 2.png', alt: 'Living', height: '46vh', top: '50vh', width: '36vw', gap: '8vw' },
  { type: 'image', src: '/images/renders/Baño Urbe.png', alt: 'Baño Urbe', height: '34vh', top: '12vh', width: '25vw', gap: '3vw' },
];

export function RendersGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    let ctx: { revert: () => void } | null = null;

    async function initGSAP() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const maxTranslate = track!.scrollWidth - window.innerWidth;

        ScrollTrigger.create({
          trigger: section,
          pin: pin,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            track!.style.transform = `translateX(${-self.progress * maxTranslate}px)`;
          },
        });
      }, section!);
    }

    initGSAP();
    return () => { if (ctx) ctx.revert(); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className={styles.mobileGallery}>
        <div className={styles.mobileHeader}>
          <div className="sec-label">Renders</div>
          <div className="sec-title">Nuestros<br /><em>Renders</em></div>
        </div>
        <div className={styles.mobileGrid}>
          {ITEMS.filter((item): item is Extract<GalleryItem, { type: 'image' }> => item.type === 'image').map((item, i) => (
            <div key={i} className={styles.mobileItem}>
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className={styles.mobileImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.scrollSection}>
      <div ref={pinRef} className={styles.pinContainer}>
        {/* Decorative animated SVG lines — sinusoidal, evenly spaced */}
        <svg className={styles.decorLines} viewBox="0 0 6000 1000" preserveAspectRatio="none" fill="none">
          {/* Line 1 — center 100 */}
          <path stroke="#B8B3AA" strokeWidth="1.2" opacity="0.5">
            <animate attributeName="d" dur="16s" repeatCount="indefinite" values="
              M-200,100 C100,-100 400,300 700,100 C1000,-100 1300,300 1600,100 C1900,-100 2200,300 2500,100 C2800,-100 3100,300 3400,100 C3700,-100 4000,300 4300,100 C4600,-100 4900,300 5200,100 C5500,-100 5800,300 6200,100;
              M-200,100 C100,300 400,-100 700,100 C1000,300 1300,-100 1600,100 C1900,300 2200,-100 2500,100 C2800,300 3100,-100 3400,100 C3700,300 4000,-100 4300,100 C4600,300 4900,-100 5200,100 C5500,300 5800,-100 6200,100;
              M-200,100 C100,-100 400,300 700,100 C1000,-100 1300,300 1600,100 C1900,-100 2200,300 2500,100 C2800,-100 3100,300 3400,100 C3700,-100 4000,300 4300,100 C4600,-100 4900,300 5200,100 C5500,-100 5800,300 6200,100" />
          </path>
          {/* Line 2 — center 300 */}
          <path stroke="#C8C3BB" strokeWidth="1" opacity="0.45">
            <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
              M-100,300 C200,100 500,500 800,300 C1100,100 1400,500 1700,300 C2000,100 2300,500 2600,300 C2900,100 3200,500 3500,300 C3800,100 4100,500 4400,300 C4700,100 5000,500 5300,300 C5600,100 5900,500 6200,300;
              M-100,300 C200,500 500,100 800,300 C1100,500 1400,100 1700,300 C2000,500 2300,100 2600,300 C2900,500 3200,100 3500,300 C3800,500 4100,100 4400,300 C4700,500 5000,100 5300,300 C5600,500 5900,100 6200,300;
              M-100,300 C200,100 500,500 800,300 C1100,100 1400,500 1700,300 C2000,100 2300,500 2600,300 C2900,100 3200,500 3500,300 C3800,100 4100,500 4400,300 C4700,100 5000,500 5300,300 C5600,100 5900,500 6200,300" />
          </path>
          {/* Line 3 — center 500 */}
          <path stroke="#ADA8A0" strokeWidth="1.3" opacity="0.5">
            <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
              M0,500 C300,300 600,700 900,500 C1200,300 1500,700 1800,500 C2100,300 2400,700 2700,500 C3000,300 3300,700 3600,500 C3900,300 4200,700 4500,500 C4800,300 5100,700 5400,500 C5700,300 6000,700 6200,500;
              M0,500 C300,700 600,300 900,500 C1200,700 1500,300 1800,500 C2100,700 2400,300 2700,500 C3000,700 3300,300 3600,500 C3900,700 4200,300 4500,500 C4800,700 5100,300 5400,500 C5700,700 6000,300 6200,500;
              M0,500 C300,300 600,700 900,500 C1200,300 1500,700 1800,500 C2100,300 2400,700 2700,500 C3000,300 3300,700 3600,500 C3900,300 4200,700 4500,500 C4800,300 5100,700 5400,500 C5700,300 6000,700 6200,500" />
          </path>
          {/* Line 4 — center 700 */}
          <path stroke="#C8C3BB" strokeWidth="1" opacity="0.45">
            <animate attributeName="d" dur="22s" repeatCount="indefinite" values="
              M-200,700 C100,500 400,900 700,700 C1000,500 1300,900 1600,700 C1900,500 2200,900 2500,700 C2800,500 3100,900 3400,700 C3700,500 4000,900 4300,700 C4600,500 4900,900 5200,700 C5500,500 5800,900 6200,700;
              M-200,700 C100,900 400,500 700,700 C1000,900 1300,500 1600,700 C1900,900 2200,500 2500,700 C2800,900 3100,500 3400,700 C3700,900 4000,500 4300,700 C4600,900 4900,500 5200,700 C5500,900 5800,500 6200,700;
              M-200,700 C100,500 400,900 700,700 C1000,500 1300,900 1600,700 C1900,500 2200,900 2500,700 C2800,500 3100,900 3400,700 C3700,500 4000,900 4300,700 C4600,500 4900,900 5200,700 C5500,500 5800,900 6200,700" />
          </path>
          {/* Line 5 — center 900 */}
          <path stroke="#B8B3AA" strokeWidth="1.2" opacity="0.4">
            <animate attributeName="d" dur="17s" repeatCount="indefinite" values="
              M-100,900 C200,700 500,1100 800,900 C1100,700 1400,1100 1700,900 C2000,700 2300,1100 2600,900 C2900,700 3200,1100 3500,900 C3800,700 4100,1100 4400,900 C4700,700 5000,1100 5300,900 C5600,700 5900,1100 6200,900;
              M-100,900 C200,1100 500,700 800,900 C1100,1100 1400,700 1700,900 C2000,1100 2300,700 2600,900 C2900,1100 3200,700 3500,900 C3800,1100 4100,700 4400,900 C4700,1100 5000,700 5300,900 C5600,1100 5900,700 6200,900;
              M-100,900 C200,700 500,1100 800,900 C1100,700 1400,1100 1700,900 C2000,700 2300,1100 2600,900 C2900,700 3200,1100 3500,900 C3800,700 4100,1100 4400,900 C4700,700 5000,1100 5300,900 C5600,700 5900,1100 6200,900" />
          </path>
        </svg>

        <div ref={trackRef} className={styles.track}>
          {/* Intro panel */}
          <div className={styles.intro}>
            <div className={styles.introLabel}>Renders</div>
            <div className={styles.introTitle}>Nuestros<br /><em>Renders</em></div>
            <p className={styles.introSub}>Visualizaciones fotorrealistas de nuestros proyectos</p>
          </div>

          {/* Gallery items */}
          {ITEMS.map((item, i) => {
            if (item.type === 'text') {
              return (
                <div
                  key={`text-${i}`}
                  className={styles.textBlock}
                  style={{ alignSelf: 'flex-start', marginTop: item.top, marginLeft: item.gap || '0' }}
                >
                  {item.sub && <div className={styles.textLabel}>{item.sub}</div>}
                  <p className={styles.textContent}>{item.text}</p>
                </div>
              );
            }

            return (
              <div
                key={`img-${i}`}
                className={styles.item}
                style={{
                  height: item.height,
                  width: item.width,
                  marginTop: item.top,
                  marginLeft: item.gap || '0',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={styles.itemImg}
                  sizes="50vw"
                  loading="lazy"
                />
                <div className={styles.itemCaption}>{item.alt}</div>
              </div>
            );
          })}

          {/* End spacer */}
          <div className={styles.endSpacer} />
        </div>
      </div>
    </section>
  );
}
