'use client';

import { useRef } from 'react';
import styles from './LogoIntro.module.css';
import { useLogoAnimation } from './useLogoAnimation';

export function LogoIntro() {
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
  });

  return (
    <div ref={introRef} className={styles.intro}>
      <div className={styles.inner}>
        <div ref={spinWrapRef} className={styles.spinWrap}>
          <div className={styles.ringFixed} />
          <div className={styles.markRotating}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={markImgRef}
              src="/images/logo-mark.jpg"
              alt=""
              className={styles.markImg}
            />
          </div>
          <div ref={logoFullWrapRef} className={styles.logoFullWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-full.jpg"
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
