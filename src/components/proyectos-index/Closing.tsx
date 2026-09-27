import Link from 'next/link';
import s from './Closing.module.css';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

export function Closing() {
  return (
    <section className={s.closing} data-chapter="Contacto" aria-labelledby="cierre-titulo">
      <div>
        <div className="sec-label reveal">Nuevos proyectos</div>
        <h2 id="cierre-titulo" className="sec-title reveal rd1">
          Construyamos<br /><em>algo juntos.</em>
        </h2>
      </div>
      <div className={`${s.actions} reveal rd2`}>
        <Link href="/#contacto" className="btn-primary">
          Agendar reunión
          <Arrow />
        </Link>
        <Link href="/fotografia" className={`btn-text ${s.photo}`}>
          Ver fotografía
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
