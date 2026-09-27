'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './PortfolioNav.module.css';
import { useCompassLogo } from './useCompassLogo';

const LINKS = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/fotografia', label: 'Fotografía' },
  { href: '/#vision', label: 'Estudio' },
  { href: '/#contacto', label: 'Contacto' },
];

/**
 * Navegación de las páginas internas (proyectos, fotografía).
 * Muestra el capítulo actual (elementos con `data-chapter`) y el progreso de lectura.
 */
export function PortfolioNav({ initialChapter = '' }: { initialChapter?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  useCompassLogo(logoRef);
  const [chapter, setChapter] = useState(initialChapter);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('cursor-ready');
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setChapter((e.target as HTMLElement).dataset.chapter ?? '');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className={s.nav} data-open={open || undefined}>
      <Link href="/" className={s.brand} aria-label="Ader Studio — inicio">
        <Image ref={logoRef} src="/images/logo.jpeg" alt="" width={36} height={36} className={s.logo} />
        <span>Ader Studio</span>
      </Link>
      <div className={s.chapter} key={chapter} aria-live="polite">{chapter}</div>
      <ul className={s.links}>
        {LINKS.map((l) => {
          const active = !l.href.includes('#') && pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link href={l.href} className={s.link} aria-current={active ? 'page' : undefined}>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={s.burger}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <i /><i />
      </button>
      <div className={s.progress}><div ref={barRef} className={s.bar} /></div>
    </nav>
  );
}
