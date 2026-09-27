import Image from 'next/image';
import Link from 'next/link';
import { CASE } from '../data';
import { fadu } from '@/components/portfolio/data/cases';
import s from '../CasaAngel.module.css';

const OTHERS = [
  {
    href: '/proyectos/urbetrack',
    tag: 'Reforma y modernización',
    name: 'Oficina Urbetrack',
    place: 'Av. Rivadavia 4260, CABA',
    img: { src: '/images/projects/URBETRACK.webp', w: 1491, h: 1055, alt: 'Oficina Urbetrack' },
  },
  {
    href: '/proyectos/fadu',
    tag: fadu.tag,
    name: fadu.title,
    place: fadu.location,
    img: { src: fadu.cover.src, w: fadu.cover.w, h: fadu.cover.h, alt: fadu.cover.alt },
  },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

export function Cierre() {
  return (
    <>
      <section className={s.cierre} data-chapter="Casa Angel">
        <Image
          src={CASE.cover.src}
          alt="Galería elevada de madera en la planta alta, entre los pinos"
          width={CASE.cover.w}
          height={CASE.cover.h}
          sizes="(min-width: 1600px) 1600px, 100vw"
          className={s.cierreImg}
          loading="lazy"
        />
        <div className={s.cierreShade} />
        <blockquote className={s.cierreQuote}>
          <span className="reveal">Todos los proyectos</span>
          <em className="reveal rd1">tienen un norte.</em>
        </blockquote>
      </section>

      <section className={s.others} aria-labelledby="ca-others">
        <div className={s.othersHead}>
          <div className="sec-label reveal">Seguir recorriendo</div>
          <h2 id="ca-others" className="sec-title reveal rd1">
            Otros
            <br />
            <em>proyectos</em>
          </h2>
        </div>
        <ul className={s.othersList}>
          {OTHERS.map((o, i) => (
            <li key={o.href} className={`reveal rd${i + 1}`}>
              <Link href={o.href} className={s.otherCard}>
                <span className={s.otherImg}>
                  <Image src={o.img.src} alt={o.img.alt} width={o.img.w} height={o.img.h} sizes="(max-width: 768px) 100vw, 45vw" loading="lazy" />
                </span>
                <span className={s.otherMeta}>
                  <span className={s.otherTag}>{o.tag}</span>
                  <span className={s.otherName}>{o.name}</span>
                  <span className={s.otherPlace}>{o.place}</span>
                </span>
                <span className={s.otherArrow}><Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.cta}>
        <div>
          <div className="sec-label reveal">Tu proyecto</div>
          <h2 className="sec-title reveal rd1">
            ¿Hablamos
            <br />
            <em>del tuyo?</em>
          </h2>
        </div>
        <div className={`${s.ctaActions} reveal rd2`}>
          <Link href="/#contacto" className="btn-primary">
            Iniciar un proyecto
            <Arrow />
          </Link>
          <Link href="/proyectos" className="btn-ghost">Ver todos los proyectos</Link>
        </div>
      </section>
    </>
  );
}
