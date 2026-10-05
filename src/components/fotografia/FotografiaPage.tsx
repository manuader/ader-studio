'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { series } from '@/components/portfolio/data/fotografia';
import { Film } from '@/components/portfolio/shared/Film';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import s from './FotografiaPage.module.css';
import { CountryFlag } from './CountryFlag';

const pad = (n: number) => String(n).padStart(2, '0');
const TOTAL = series.reduce((n, x) => n + x.photos.length, 0);

/** Cada serie con su composición y el índice global de cada foto. */
const CHAPTERS = (() => {
  let start = 0;
  return series.map((x, i) => {
    const rows = [x.photos.map((p,index)=>({...p,index:start+index,n:index+1}))];
    start += x.photos.length;
    return { ...x, n: i + 1, rows };
  });
})();

const ITEMS: LightboxItem[] = series.flatMap((x) =>
  x.photos.map((p) => ({ src: p.src, w: p.w, h: p.h, alt: p.alt, caption: p.caption || (p.alt.startsWith('Serie ')?x.title:`${x.title}. ${p.alt}`) }))
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

function HeroFilm() {
  return <Film name="mirada-16-series" label="Film de fotografía de arquitectura de Ader Studio" className={s.film} />;
}

function CountryGrid({chapter,onOpen}:{chapter:(typeof CHAPTERS)[number];onOpen:(index:number)=>void}){
 const [pageSize,setPageSize]=useState(12),[showAll,setShowAll]=useState(false);
 const [layout,setLayout]=useState({columns:10,size:80});
 const mosaic=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null);
 const photos=chapter.rows.flat();
 useEffect(()=>{const media=matchMedia('(max-width:768px)');const update=()=>setPageSize(media.matches?6:12);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{if(!showAll)return;const el=mosaic.current;if(!el)return;const fit=()=>{const {width,height}=el.getBoundingClientRect();let best={columns:1,size:0};for(let columns=1;columns<=photos.length;columns++){const rows=Math.ceil(photos.length/columns),size=Math.min((width-(columns-1)*8)/columns,(height-(rows-1)*8)/rows);if(size>best.size)best={columns,size};}setLayout(best);};fit();const ro=new ResizeObserver(fit);ro.observe(el);const previous=document.body.style.overflow;document.body.style.overflow='hidden';const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setShowAll(false);};addEventListener('keydown',escape);el.parentElement?.querySelector<HTMLButtonElement>('button')?.focus();return()=>{ro.disconnect();document.body.style.overflow=previous;removeEventListener('keydown',escape);trigger.current?.focus({preventScroll:true});};},[showAll,photos.length]);
 return <div className={s.gridArea}><div className={s.countryGrid} role="region" aria-label={`Cuadrícula de fotografías de ${chapter.title}`}>
 {photos.slice(0,pageSize).map((p,i)=><figure key={p.src} className={s.gridPhoto} style={{['--order' as string]:i}}><button type="button" className={s.open} onClick={()=>onOpen(p.index)} aria-label={`Ver en pantalla completa: ${p.caption||p.alt}`}><span className={s.gridImage}><Image src={p.thumbnail||p.src} unoptimized={!!p.thumbnail} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:768px) 30vw, 15vw" loading="lazy"/></span></button><figcaption className={s.gridCaption}><span>{pad(p.n)}</span><span>{p.caption||p.alt}</span></figcaption></figure>)}
 </div><div className={s.gridControls}>{photos.length>pageSize?<button ref={trigger} type="button" className={s.viewAll} onClick={()=>setShowAll(true)}>Ver todas las fotografías <span>↗</span></button>:<span>{photos.length} fotografías</span>}<span>{photos.length>pageSize?`${pageSize} de ${photos.length} fotografías`:''}</span></div>
 {showAll&&<div className={s.allBackdrop} onClick={e=>{if(e.target===e.currentTarget)setShowAll(false);}}><section className={s.allPanel} role="dialog" aria-modal="true" aria-label={`Todas las fotografías de ${chapter.title}`} onKeyDown={e=>{if(e.key==='Tab'){const buttons=e.currentTarget.querySelectorAll<HTMLButtonElement>('button');const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}}><header className={s.allHead}><h3><CountryFlag country={chapter.title}/> {chapter.title} <small>{photos.length} fotografías</small></h3><button type="button" aria-label="Cerrar todas las fotografías" onClick={()=>setShowAll(false)}>✕</button></header><div ref={mosaic} className={s.allMosaic} style={{['--columns' as string]:layout.columns,['--tile' as string]:`${Math.max(1,layout.size)}px`}}>{photos.map((p,i)=><button type="button" key={p.src} title={p.caption||p.alt} aria-label={`Ver fotografía ${p.n}: ${p.caption||p.alt}`} style={{['--order' as string]:i}} onClick={()=>{setShowAll(false);onOpen(p.index);}}><img src={p.thumbnail||p.src} alt={p.alt}/><span>{pad(p.n)}</span></button>)}</div></section></div>}
 </div>;
}

export function FotografiaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState<string>('');
  const [preview, setPreview] = useState<(typeof CHAPTERS)[number] | null>(null);
  const [arrival, setArrival] = useState<string>('');
  const [destination, setDestination] = useState<(typeof CHAPTERS)[number] | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (navigationTimer.current) clearTimeout(navigationTimer.current); }, []);
  const visit = (chapter: (typeof CHAPTERS)[number]) => {
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPreview(null);
    setArrival('');
    setDestination(chapter);
    navigationTimer.current = setTimeout(() => {
      document.getElementById(chapter.key)?.scrollIntoView({behavior:'instant', block:'start'});
      history.replaceState(null, '', '#'+chapter.key);
      setActive(chapter.key);
      setArrival(chapter.key);
      const heading = document.getElementById(chapter.key+'-title');
      heading?.focus({preventScroll:true});
      navigationTimer.current = setTimeout(() => setDestination(null), reduce ? 0 : 480);
    }, reduce ? 0 : 760);
  };

  // Reveal por máscara de cada foto y del nombre de cada serie.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.dataset.js = '';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if(e.target.matches('h2')){(e.target as HTMLElement).toggleAttribute('data-in',e.isIntersecting);return;}
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = '';
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
    );
    root.querySelectorAll('[data-mask]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // El nombre y la bandera se desplazan juntos según la posición del scroll.
  useEffect(()=>{let raf=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{raf=0;rootRef.current?.querySelectorAll<HTMLElement>('h2[data-mask]').forEach(el=>{const section=el.closest<HTMLElement>('[data-series]');const p=reduced.matches||!!section&&section.getBoundingClientRect().top<innerHeight*.28?1:0;el.style.setProperty('--country-progress',String(p));el.closest<HTMLElement>('[data-series]')?.style.setProperty('--gallery-progress',String(p));});};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',scroll);removeEventListener('resize',scroll);};},[]);

  // Serie activa en el índice.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    rootRef.current?.querySelectorAll('[data-series]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mantiene visible el ítem activo del índice (scroll horizontal del índice, no de la página).
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (!strip || !el) return;
    const target = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const counts = useMemo(() => CHAPTERS.map((c) => c.photos.length), []);

  return (
    <div ref={rootRef} className={s.root}>
      {destination && <div key={destination.key} className={s.countryTransition} role="status">
        <div className={s.transitionCurtain} aria-hidden="true"><i/><i/><i/></div>
        <div className={s.transitionIdentity}><CountryFlag country={destination.title} /><span>{destination.title}</span><small>Fotografía de arquitectura</small></div>
      </div>}
      {preview && !destination && <div key={preview.key} className={s.countryPreview} aria-hidden="true"><CountryFlag country={preview.title} /><span>{preview.title}</span></div>}
      <header className={s.hero} data-chapter="Fotografía">
        <div className={s.heroHead}>
          <div className="sec-label reveal">Fotografía de arquitectura</div>
          <h1 className={s.heroTitle}>
            <span className={s.line}><span className={s.lineIn}>Fotografía</span></span>
            <span className={s.line}><em className={`${s.lineIn} ${s.d1}`}>mirada</em></span>
            <span className={s.line}><em className={`${s.lineIn} ${s.d1}`}>arquitectónica.</em></span>
          </h1>
        </div>
        <div className={`${s.heroAside} reveal rd2`}>
          <p className={s.heroText}>
            {TOTAL} fotografías de arquitectura en {series.length} series, una por país. Cada imagen se muestra
            con su encuadre completo y su color original.
          </p>
          <p className={s.heroHint}>Seleccioná una foto para verla en pantalla completa.</p>
        </div>
        <div className={`${s.heroFilm} reveal rd3`}>
          <HeroFilm />
        </div>
      </header>

      {/* El índice queda fijo solo mientras se recorren las series. */}
      <div className={s.body}>
      <nav className={s.index} aria-label="Series">
        <span className={s.indexLabel}>Series</span>
        <ul ref={stripRef} className={s.indexList}>
          {CHAPTERS.map((c, i) => (
            <li key={c.key}>
              <a
                href={`#${c.key}`}
                onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); visit(c); }}
                onMouseEnter={() => setPreview(c)} onMouseLeave={() => setPreview(null)}
                onFocus={() => setPreview(c)} onBlur={() => setPreview(null)}
                data-key={c.key}
                className={s.indexLink}
                aria-current={active === c.key ? 'location' : undefined}
              >
                <span className={s.indexNum}>{pad(c.n)}</span>
                <CountryFlag country={c.title} className={s.indexFlag} /> {c.title}
                <sup className={s.indexCount}>{counts[i]}</sup>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {CHAPTERS.map((c, ci) => (
        <section
          key={c.key}
          id={c.key}
          data-series
          data-arriving={arrival === c.key ? "" : undefined}
          data-chapter={c.title}
          className={s.series}
          data-side={ci % 2 ? 'right' : 'left'}
          aria-labelledby={`${c.key}-title`}
        >
          <header className={s.seriesHead}>
            <span className={s.seriesNum}>{pad(c.n)}</span>
            <h2 id={`${c.key}-title`} className={s.seriesTitle} tabIndex={-1} data-mask>
              <span className={s.seriesTitleIn}><CountryFlag country={c.title} className={s.chapterFlag} /> <span className={s.chapterName}>{c.title}</span></span>
            </h2>
            <span className={s.seriesCount}>
              {c.photos.length} {c.photos.length === 1 ? 'fotografía' : 'fotografías'}
            </span>
          </header>

          <CountryGrid chapter={c} onOpen={setOpen}/>

        </section>
      ))}
      </div>

      <section className={s.cta} data-chapter="Contacto">
        <div>
          <div className="sec-label reveal">Nuevos proyectos</div>
          <h2 className="sec-title reveal rd1">Construyamos<br /><em>algo juntos.</em></h2>
        </div>
        <div className={`${s.ctaActions} reveal rd2`}>
          <Link href="/#contacto" className="btn-primary">
            Contacto
            <Arrow />
          </Link>
          <Link href="/proyectos" className="btn-ghost">Ver proyectos</Link>
        </div>
      </section>

      <Lightbox items={ITEMS} index={open} onChange={setOpen} />
    </div>
  );
}
