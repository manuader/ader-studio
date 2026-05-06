'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#vision', label: 'Estudio' },
  { href: '#bim', label: 'BIM' },
  { href: '#metodologia', label: 'Metodologia' },
  { href: '#contacto', label: 'Contacto' },
];

const NAV_SECONDARY = [
  { href: '#fadu', label: 'FADU' },
  { href: '#bauhaus', label: 'Bauhaus' },
  { href: '#casa-angel', label: 'Casa Angel' },
];

export function Navbar() {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const logoRef = useRef<HTMLImageElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              linksRef.current.forEach((a) => {
                if (a) a.classList.remove(styles.navLinkActive);
              });
              const match = linksRef.current.find(
                (a) => a?.getAttribute('href') === `#${e.target.id}`
              );
              if (match) match.classList.add(styles.navLinkActive);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Show nav logo when fly animation starts (logo is behind intro overlay)
  useEffect(() => {
    function onShowLogo() {
      setLogoVisible(true);
    }
    function onIntroComplete() {
      setIntroDone(true);
    }
    window.addEventListener('show-nav-logo', onShowLogo);
    window.addEventListener('intro-complete', onIntroComplete);
    return () => {
      window.removeEventListener('show-nav-logo', onShowLogo);
      window.removeEventListener('intro-complete', onIntroComplete);
    };
  }, []);

  // Logo points toward cursor (like a compass pointing to North)
  useEffect(() => {
    if (!introDone) return;

    function handleMouseMove(e: MouseEvent) {
      const logo = logoRef.current;
      if (!logo) return;

      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // atan2(dy, dx) gives angle where 0 = right; image needle points right at rest
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      logo.style.transform = `rotate(${angle}deg)`;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [introDone]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <a href="#hero" onClick={handleClick}>
          <Image
            ref={logoRef}
            src="/images/logo.jpeg"
            alt="Ader Studio"
            width={48}
            height={48}
            className={`${styles.navLogoImg} ${logoVisible ? styles.navLogoImgVisible : ''} nav-logo-img`}
            priority
          />
        </a>
        <span className={styles.navStudioName}>Ader Studio</span>
        <div className={styles.navDivider} />
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <a
                ref={(el) => { linksRef.current[i] = el; }}
                href={item.href}
                className={styles.navLink}
                onClick={handleClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.navLinks}>
        {NAV_SECONDARY.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`${styles.navLink} ${styles.navLinkSmall}`}
              onClick={handleClick}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
