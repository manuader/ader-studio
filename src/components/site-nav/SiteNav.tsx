'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { projects } from '@/components/proyectos/projects';
import { useCompassLogo } from '@/components/portfolio/shared/useCompassLogo';
import { REPLAY_EVENT, SKIP_CLASS, requestIntroReplay } from '@/components/logo-intro/introState';
import s from './SiteNav.module.css';

type Group = 'proyectos' | 'estudio' | 'fotografia' | 'contacto';

/** Secciones de la home → grupo del menú y rótulo del indicador de contexto. */
const HOME_SECTIONS: Record<string, { group: Group | null; label: string }> = {
  hero: { group: null, label: '' },
  vision: { group: 'estudio', label: 'Estudio' },
  proceso: { group: 'estudio', label: 'Proceso' },
  bim: { group: 'estudio', label: 'BIM' },
  proyectos: { group: 'proyectos', label: 'Proyectos' },
  fotografia: { group: 'fotografia', label: 'Fotografía' },
  metodologia: { group: 'estudio', label: 'Metodología' },
  contacto: { group: 'contacto', label: 'Contacto' },
};

const ESTUDIO = [
  { href: '/#vision', label: 'Visión', meta: 'Diseño contextual' },
  { href: '/#proceso', label: 'Proceso', meta: 'Del terreno a la forma' },
  { href: '/#bim', label: 'BIM', meta: 'Modelo integrado' },
  { href: '/#metodologia', label: 'Metodología', meta: 'Cómo trabajamos' },
];

const WORKS = projects.filter((p) => p.href);
const OBRAS = WORKS.filter((p) => !p.tag.includes('Académic'));
const FORMACION = WORKS.filter((p) => p.tag.includes('Académic'));

type Props = {
  /** Home: el logo aparece con la intro y los anclajes hacen scroll suave. */
  home?: boolean;
  /** Rótulo inicial del indicador de contexto (páginas internas). */
  initialContext?: string;
};

export function SiteNav({ home = false, initialContext = '' }: Props) {
  const pathname = usePathname();
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [logoVisible, setLogoVisible] = useState(!home);
  const [context, setContext] = useState(initialContext);
  const [homeGroup, setHomeGroup] = useState<Group | null>(null);
  const [open, setOpen] = useState<'proyectos' | 'estudio' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useCompassLogo(logoRef);

  // Grupo activo: por ruta en páginas internas, por sección visible en la home.
  const active: Group | null = home
    ? homeGroup
    : pathname.startsWith('/proyectos')
      ? 'proyectos'
      : pathname.startsWith('/fotografia')
        ? 'fotografia'
        : null;

  // Intro de la home: el logo "vuela" a la navbar y recién ahí se muestra.
  useEffect(() => {
    if (!home) {
      document.documentElement.classList.add('cursor-ready');
      return;
    }
    // Intro salteada (ya vista): el logo está en su lugar desde el arranque.
    if (document.documentElement.classList.contains(SKIP_CLASS)) setLogoVisible(true);
    const show = () => setLogoVisible(true);
    const hide = () => setLogoVisible(false);
    window.addEventListener('show-nav-logo', show);
    window.addEventListener(REPLAY_EVENT, hide);
    return () => {
      window.removeEventListener('show-nav-logo', show);
      window.removeEventListener(REPLAY_EVENT, hide);
    };
  }, [home]);

  // Progreso de lectura + indicador de contexto.
  useEffect(() => {
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
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (home) {
            const sec = HOME_SECTIONS[el.id];
            if (!sec) return;
            setHomeGroup(sec.group);
            setContext(sec.label);
          } else {
            setContext(el.dataset.chapter ?? '');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const targets = home
      ? Object.keys(HOME_SECTIONS).map((id) => document.getElementById(id)).filter(Boolean)
      : Array.from(document.querySelectorAll('[data-chapter]'));
    targets.forEach((el) => io.observe(el as Element));

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [home, pathname]);

  // Cerrar menús al cambiar de ruta y con Escape.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // En la home, los anclajes hacen scroll suave compensando la navbar.
  const onNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setOpen(null);
      setMobileOpen(false);
      const href = e.currentTarget.getAttribute('href') ?? '';
      if (pathname !== '/' || !href.startsWith('/#')) return;
      const target = document.getElementById(href.slice(2));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
      history.replaceState(null, '', href);
    },
    [pathname]
  );

  /** Logo: vuelve a la home y reproduce la intro (la única forma de verla de nuevo). */
  const onLogo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setOpen(null);
      setMobileOpen(false);
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (pathname === '/') {
        e.preventDefault();
        history.replaceState(null, '', '/');
        window.dispatchEvent(new Event(REPLAY_EVENT));
      } else {
        requestIntroReplay();
      }
    },
    [pathname]
  );

  const enter = (menu: 'proyectos' | 'estudio') => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(menu);
  };
  const leave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const workItem = (p: (typeof WORKS)[number], thumb: boolean) => (
    <li key={p.href}>
      <Link
        href={p.href!}
        className={s.work}
        aria-current={pathname === p.href ? 'page' : undefined}
        onClick={onNavigate}
      >
        {thumb && (
          <span className={s.workThumb}>
            <Image src={p.image} alt="" width={120} height={90} sizes="120px" />
          </span>
        )}
        <span className={s.workBody}>
          <span className={s.workName}>{p.name}</span>
          <span className={s.workMeta}>
            {p.location} · {p.year}
          </span>
        </span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className={s.nav} aria-label="Principal" onMouseLeave={leave}>
        <Link href="/" className={s.brand} onClick={onLogo} aria-label="Ader Studio — inicio">
          <Image
            ref={logoRef}
            src="/images/logo.jpeg"
            alt=""
            width={40}
            height={40}
            className={`${s.logo} ${logoVisible ? s.logoVisible : ''} nav-logo-img`}
            priority
          />
          <span className={s.brandName}>Ader Studio</span>
        </Link>

        <div className={s.context} aria-live="polite">
          {context && (
            <span key={context} className={s.contextLabel}>
              {context}
            </span>
          )}
        </div>

        <ul className={s.menu}>
          <li className={s.item} onMouseEnter={() => enter('proyectos')}>
            <button
              type="button"
              className={s.trigger}
              aria-expanded={open === 'proyectos'}
              aria-controls="nav-proyectos"
              data-active={active === 'proyectos' || undefined}
              onClick={() => setOpen(open === 'proyectos' ? null : 'proyectos')}
            >
              Proyectos <Chevron />
            </button>
          </li>
          <li className={s.item} onMouseEnter={() => enter('estudio')}>
            <button
              type="button"
              className={s.trigger}
              aria-expanded={open === 'estudio'}
              aria-controls="nav-estudio"
              data-active={active === 'estudio' || undefined}
              onClick={() => setOpen(open === 'estudio' ? null : 'estudio')}
            >
              Estudio <Chevron />
            </button>
          </li>
          <li className={s.item} onMouseEnter={leave}>
            <Link
              href="/fotografia"
              className={s.trigger}
              data-active={active === 'fotografia' || undefined}
              aria-current={pathname === '/fotografia' ? 'page' : undefined}
              onClick={onNavigate}
            >
              Fotografía
            </Link>
          </li>
          <li className={s.item} onMouseEnter={leave}>
            <Link href="/#contacto" className={s.cta} data-active={active === 'contacto' || undefined} onClick={onNavigate}>
              Contacto
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className={s.burger}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile"
          data-open={mobileOpen || undefined}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <i />
          <i />
        </button>

        {/* Paneles desplegables (desktop) */}
        <div
          id="nav-proyectos"
          className={s.panel}
          data-open={open === 'proyectos' || undefined}
          onMouseEnter={() => enter('proyectos')}
        >
          <div className={s.panelInner}>
            <div className={s.panelCol}>
              <div className={s.panelLabel}>Obras</div>
              <ul className={s.works}>{OBRAS.map((p) => workItem(p, true))}</ul>
            </div>
            <div className={s.panelCol}>
              <div className={s.panelLabel}>Formación</div>
              <ul className={s.works}>{FORMACION.map((p) => workItem(p, true))}</ul>
            </div>
            <div className={s.panelAside}>
              <Link href="/proyectos" className={s.panelAll} onClick={onNavigate}>
                Ver todos <em>los proyectos</em>
                <Arrow />
              </Link>
              <Link href="/#proyectos" className={s.panelSub} onClick={onNavigate}>
                Destacados en la home
              </Link>
            </div>
          </div>
        </div>

        <div
          id="nav-estudio"
          className={s.panel}
          data-open={open === 'estudio' || undefined}
          onMouseEnter={() => enter('estudio')}
        >
          <div className={s.panelInner}>
            <ul className={s.sections}>
              {ESTUDIO.map((it, i) => (
                <li key={it.href}>
                  <Link href={it.href} className={s.section} onClick={onNavigate}>
                    <span className={s.sectionNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={s.sectionName}>{it.label}</span>
                    <span className={s.sectionMeta}>{it.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={s.progress} aria-hidden="true">
          <div ref={barRef} className={s.bar} />
        </div>
      </nav>

      {/* Menú mobile a pantalla completa */}
      <div id="nav-mobile" className={s.sheet} data-open={mobileOpen || undefined} aria-hidden={!mobileOpen}>
        <div className={s.sheetInner}>
          <section className={s.sheetGroup}>
            <Link href="/proyectos" className={s.sheetHead} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
              Proyectos
            </Link>
            <ul className={s.sheetList}>
              {WORKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href!} className={s.sheetLink} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
                    <span>{p.name}</span>
                    <span className={s.sheetMeta}>{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className={s.sheetGroup}>
            <Link href="/#vision" className={s.sheetHead} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
              Estudio
            </Link>
            <ul className={s.sheetList}>
              {ESTUDIO.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className={s.sheetLink} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
                    <span>{it.label}</span>
                    <span className={s.sheetMeta}>{it.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className={s.sheetGroup}>
            <Link href="/fotografia" className={s.sheetHead} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
              Fotografía
            </Link>
          </section>
          <Link href="/#contacto" className={`btn-primary ${s.sheetCta}`} onClick={onNavigate} tabIndex={mobileOpen ? 0 : -1}>
            Contacto
            <Arrow />
          </Link>
          <div className={s.sheetFoot}>Buenos Aires · Weimar</div>
        </div>
      </div>
    </>
  );
}

function Chevron() {
  return (
    <svg className={s.chevron} width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
      <polyline points="2,3.5 5,6.5 8,3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
      <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
