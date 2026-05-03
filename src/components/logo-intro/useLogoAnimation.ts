'use client';

import { useEffect, useRef } from 'react';

interface LogoAnimationRefs {
  introRef: React.RefObject<HTMLDivElement | null>;
  markImgRef: React.RefObject<HTMLImageElement | null>;
  logoFullWrapRef: React.RefObject<HTMLDivElement | null>;
  spinWrapRef: React.RefObject<HTMLDivElement | null>;
  hintTextRef: React.RefObject<HTMLSpanElement | null>;
  hintLineRef: React.RefObject<HTMLDivElement | null>;
}

const TOTAL_DURATION = 10000;
const TOTAL_ROTATIONS = 10;
const TOTAL_DEGREES = TOTAL_ROTATIONS * 360;

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

export function useLogoAnimation({
  introRef,
  markImgRef,
  logoFullWrapRef,
  spinWrapRef,
  hintTextRef,
  hintLineRef,
}: LogoAnimationRefs) {
  const startedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const wipeTriggeredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    function tick(ts: number) {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const t = Math.min((ts - startTimeRef.current) / TOTAL_DURATION, 1);

      if (markImgRef.current) {
        markImgRef.current.style.transform = `rotate(${easeOutQuint(t) * TOTAL_DEGREES}deg)`;
      }

      if (!wipeTriggeredRef.current && t >= 0.85) {
        wipeTriggeredRef.current = true;
        if (logoFullWrapRef.current) {
          logoFullWrapRef.current.style.opacity = '1';
          logoFullWrapRef.current.style.transition = 'clip-path 2.4s cubic-bezier(0.22,1,0.36,1)';
          logoFullWrapRef.current.style.clipPath = 'inset(0 0% 0 0 round 50%)';
        }
      }

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        if (markImgRef.current) {
          markImgRef.current.style.transform = 'rotate(0deg)';
        }
        onSpinComplete();
      }
    }

    function onSpinComplete() {
      if (!wipeTriggeredRef.current) {
        wipeTriggeredRef.current = true;
        if (logoFullWrapRef.current) {
          logoFullWrapRef.current.style.opacity = '1';
          logoFullWrapRef.current.style.transition = 'clip-path 2.4s cubic-bezier(0.22,1,0.36,1)';
          logoFullWrapRef.current.style.clipPath = 'inset(0 0% 0 0 round 50%)';
        }
      }

      setTimeout(() => {
        if (hintTextRef.current) hintTextRef.current.style.opacity = '0';
        if (hintLineRef.current) hintLineRef.current.style.opacity = '0';


        setTimeout(() => {
          // Fly circle to navbar
          const navLogo = document.querySelector('.nav-logo-img') as HTMLElement | null;
          if (spinWrapRef.current && navLogo) {
            const navRect = navLogo.getBoundingClientRect();
            const wrapRect = spinWrapRef.current.getBoundingClientRect();
            const dx = (navRect.left + navRect.width / 2) - (wrapRect.left + wrapRect.width / 2);
            const dy = (navRect.top + navRect.height / 2) - (wrapRect.top + wrapRect.height / 2);
            const scale = navRect.width / wrapRect.width;
            spinWrapRef.current.style.transition = 'transform 0.85s cubic-bezier(0.6,0,0.2,1)';
            spinWrapRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
          }

          // Show nav logo immediately (hidden behind intro overlay z-index)
          window.dispatchEvent(new Event('show-nav-logo'));

          setTimeout(() => {
            if (introRef.current) {
              introRef.current.style.opacity = '0';
              introRef.current.style.pointerEvents = 'none';
            }
            setTimeout(() => {
              if (introRef.current) {
                introRef.current.style.display = 'none';
              }
              document.body.style.overflow = '';
              document.documentElement.classList.add('cursor-ready');
              window.dispatchEvent(new Event('intro-complete'));
            }, 850);
          }, 900);
        }, 1100);
      }, 1800);
    }

    function startAnimation() {
      if (startedRef.current) return;
      startedRef.current = true;
      if (hintTextRef.current) hintTextRef.current.style.opacity = '0';
      startTimeRef.current = null;
      rafIdRef.current = requestAnimationFrame(tick);
    }

    function onScrollTrigger() {
      startAnimation();
      window.removeEventListener('wheel', onScrollTrigger);
      window.removeEventListener('touchmove', onScrollTrigger);
      window.removeEventListener('keydown', onScrollTrigger);
    }

    window.addEventListener('wheel', onScrollTrigger, { passive: true });
    window.addEventListener('touchmove', onScrollTrigger, { passive: true });
    window.addEventListener('keydown', onScrollTrigger);

    const introEl = introRef.current;
    if (introEl) {
      introEl.addEventListener('click', onScrollTrigger);
    }

    return () => {
      window.removeEventListener('wheel', onScrollTrigger);
      window.removeEventListener('touchmove', onScrollTrigger);
      window.removeEventListener('keydown', onScrollTrigger);
      if (introEl) {
        introEl.removeEventListener('click', onScrollTrigger);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [introRef, markImgRef, logoFullWrapRef, spinWrapRef, hintTextRef, hintLineRef]);
}
