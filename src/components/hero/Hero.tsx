'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 50, y: 50 });
  const t1 = useRef({ x: 50, y: 50 });
  const t2 = useRef({ x: 50, y: 50 });
  const t3 = useRef({ x: 50, y: 50 });
  const t4 = useRef({ x: 50, y: 50 });
  const t5 = useRef({ x: 50, y: 50 });
  const targetSizeRef = useRef(0);
  const currentSizeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    const color = colorRef.current;
    if (!hero || !color) return;

    function tick() {
      // Trail: each point follows the one ahead, not the mouse directly
      // This makes them chain like a worm instead of spreading independently
      t1.current.x += (mouseRef.current.x - t1.current.x) * 0.3;
      t1.current.y += (mouseRef.current.y - t1.current.y) * 0.3;
      t2.current.x += (t1.current.x - t2.current.x) * 0.3;
      t2.current.y += (t1.current.y - t2.current.y) * 0.3;
      t3.current.x += (t2.current.x - t3.current.x) * 0.3;
      t3.current.y += (t2.current.y - t3.current.y) * 0.3;
      t4.current.x += (t3.current.x - t4.current.x) * 0.3;
      t4.current.y += (t3.current.y - t4.current.y) * 0.3;
      t5.current.x += (t4.current.x - t5.current.x) * 0.3;
      t5.current.y += (t4.current.y - t5.current.y) * 0.3;

      currentSizeRef.current += (targetSizeRef.current - currentSizeRef.current) * 0.15;

      const s = currentSizeRef.current;
      const d = Math.max(hero!.offsetWidth, hero!.offsetHeight);
      const r0 = (s / 100) * d;

      const anchors = [mouseRef.current, t1.current, t2.current, t3.current, t4.current, t5.current];
      const anchorSizes = [1, 0.85, 0.68, 0.48, 0.3, 0.14];

      // Fixed 12 points distributed along the anchor chain
      let mask = '';
      const TOTAL = 12;
      const segments = anchors.length - 1;
      for (let i = 0; i < TOTAL; i++) {
        const globalT = i / (TOTAL - 1); // 0 to 1
        const seg = Math.min(Math.floor(globalT * segments), segments - 1);
        const localT = (globalT * segments) - seg;
        const a = anchors[seg];
        const b = anchors[seg + 1];
        const px = a.x + (b.x - a.x) * localT;
        const py = a.y + (b.y - a.y) * localT;
        const sz = anchorSizes[seg] + (anchorSizes[seg + 1] - anchorSizes[seg]) * localT;
        if (i > 0) mask += ',';
        mask += `radial-gradient(circle ${r0 * sz}px at ${px}% ${py}%,black 92%,transparent 100%)`;
      }

      color!.style.maskImage = mask;
      color!.style.webkitMaskImage = mask;

      if (isActiveRef.current || currentSizeRef.current > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        // Hide completely — a zero-radius gradient = nothing visible
        const hideMask = 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)';
        color!.style.maskImage = hideMask;
        color!.style.webkitMaskImage = hideMask;
      }
    }

    function startLoop() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function deactivate() {
      isActiveRef.current = false;
      targetSizeRef.current = 0;
    }

    function onMouseMove(e: MouseEvent) {
      // Deactivate when cursor is over navbar area
      if (e.clientY < 64) {
        if (isActiveRef.current) deactivate();
        return;
      }

      const rect = hero!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (!isActiveRef.current) {
        isActiveRef.current = true;
        t1.current = { x, y };
        t2.current = { x, y };
        t3.current = { x, y };
        t4.current = { x, y };
        t5.current = { x, y };
        targetSizeRef.current = 8;
        startLoop();
      }
    }

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', deactivate);
    document.documentElement.addEventListener('mouseleave', deactivate);

    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', deactivate);
      document.documentElement.removeEventListener('mouseleave', deactivate);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      {/* B&W architectural drawing (base layer) */}
      <div className={styles.imageLayer}>
        <Image
          src="/images/hero/fachada byn.png"
          alt="Plano arquitectónico"
          fill
          className={`${styles.heroImage} ${styles.bynImage}`}
          priority
        />
      </div>

      {/* Color render (revealed on hover) */}
      <div ref={colorRef} className={styles.colorLayer}>
        <Image
          src="/images/hero/fachada.png"
          alt="Render fachada"
          fill
          className={`${styles.heroImage} ${styles.colorImage}`}
          priority
        />
      </div>

      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.eyebrow} reveal`}>Ader Studio — Buenos Aires, Argentina</div>
        <h1 className={`${styles.headline} reveal rd1`}>
          Arquitectura argentina 🇦🇷
        </h1>
        <p className={`${styles.sub} reveal rd2`}>
          Aportando valor arquitectónico a través del diseño contextual, la honestidad material y la precisión tecnológica.
        </p>
        <div className={`${styles.cta} reveal rd3`}>
          <a href="#proyectos" className="btn-ghost">
            Ver proyectos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          </a>
          <a href="#contacto" className="btn-text">Agendar reunión →</a>
        </div>
      </div>
      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
