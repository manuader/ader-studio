'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './LogoIntro.module.css';
import { useLogoAnimation } from './useLogoAnimation';
import { REPLAY_EVENT, SKIP_CLASS, introMode, markIntroSeen } from './introState';

/**
 * Intro de la home. Se ve la primera vez y cuando se hace click en el logo de
 * la navbar; el resto de las visitas la home arranca directo.
 */
export function LogoIntro() {
  // El server siempre la renderiza; si corresponde saltearla, `html.intro-skip`
  // la oculta antes de pintar y acá se desmonta.
  const [skipped, setSkipped] = useState(false);
  const [run, setRun] = useState(0);
  const decided = useRef(false);

  useLayoutEffect(() => {
    if (decided.current) return;
    decided.current = true;
    const root = document.documentElement;
    const mode = introMode();
    if (mode) {
      root.classList.remove(SKIP_CLASS);
      markIntroSeen();
      if (mode === 'replay') setRun(1);
    } else {
      root.classList.add(SKIP_CLASS, 'cursor-ready');
      setSkipped(true);
    }
  }, []);

  useEffect(() => {
    const replay = () => {
      introMode(); // consume un pedido pendiente, si lo hubiera
      const root = document.documentElement;
      root.classList.remove(SKIP_CLASS, 'cursor-ready');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setSkipped(false);
      setRun((n) => n + 1);
    };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  return skipped ? null : <IntroOverlay key={run} autoStart={run > 0} />;
}

function IntroOverlay({ autoStart }: { autoStart: boolean }) {
  const introRef = useRef<HTMLDivElement>(null);
  const markImgRef = useRef<HTMLImageElement>(null);
  const logoFullWrapRef = useRef<HTMLDivElement>(null);
  const spinWrapRef = useRef<HTMLDivElement>(null);
  const hintTextRef = useRef<HTMLSpanElement>(null);
  const hintLineRef = useRef<HTMLDivElement>(null);

  useLogoAnimation({
    introRef,
    markImgRef,
    logoFullWrapRef,
    spinWrapRef,
    hintTextRef,
    hintLineRef,
    autoStart,
  });

  return (
    <div ref={introRef} className={`${styles.intro} logo-intro`}>
      <div className={styles.inner}>
        <div ref={spinWrapRef} className={styles.spinWrap}>
          <div className={styles.ringFixed} />
          <div className={styles.markRotating}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={markImgRef}
              src="/images/logo-mark.webp"
              alt=""
              className={styles.markImg}
            />
          </div>
          <div ref={logoFullWrapRef} className={styles.logoFullWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-full.webp"
              alt="Ader Studio"
              className={styles.logoFullImg}
            />
          </div>
        </div>
        <div className={styles.hint}>
          <span ref={hintTextRef} className={styles.hintText}>
            Click para comenzar
          </span>
          <div ref={hintLineRef} className={styles.hintLine} />
        </div>
      </div>
    </div>
  );
}
