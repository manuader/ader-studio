'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const hero=useRef<HTMLElement>(null),compass=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=hero.current,mark=compass.current;if(!el||!mark||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let raf=0,angle=-20,target=-20,tracking=false,last=0;const move=(e:PointerEvent)=>{const rect=mark.getBoundingClientRect();target=Math.atan2(e.clientY-rect.top-rect.height/2,e.clientX-rect.left-rect.width/2)*180/Math.PI;tracking=true;};const leave=()=>{tracking=false;};const draw=(now:number)=>{const dt=Math.min(50,now-(last||now));last=now;if(tracking){const delta=((target-angle+540)%360)-180;angle+=delta*.055;}else angle+=dt*.002;mark.style.setProperty('--direction',angle+'deg');raf=requestAnimationFrame(draw);};raf=requestAnimationFrame(draw);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);return()=>{cancelAnimationFrame(raf);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);};},[]);
  return (
    <section ref={hero} id="hero" className={styles.hero}>
      <div ref={compass} className={styles.compass} aria-hidden="true"><img src="/images/logo-mark.webp" alt=""/></div>

      <div className={styles.content}>
        <div className={`${styles.eyebrow} reveal`}>Ader Studio — Buenos Aires, Argentina</div>
        <h1 className={`${styles.headline} reveal rd1`}>
          Todos los proyectos tienen un norte.
        </h1>
        <p className={`${styles.sub} reveal rd2`}>
          Cada proyecto es único, pero todos parten de una misma base: el lugar donde se implantan. Nuestro norte es entender ese lugar y encontrar la mejor respuesta arquitectónica para cada proyecto.
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
