'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { STATS } from '../data';
import { useInView } from '../hooks';

function Counter({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 1600);
      setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v}</>;
}

export function Memoria() {
  const statsRef = useRef<HTMLDivElement>(null);
  const run = useInView(statsRef, 0.4, true);

  return (
    <section className={s.memoria} data-chapter="Memoria">
      <div className={s.memoriaGrid}>
        <div className={s.memoriaText}>
          <div className={`${s.kicker} ${s.kickerLight} reveal`}>Memoria / Objetivos y criterios</div>
          <h2 className={`${s.memoriaTitle} reveal rd1`}>
            Ampliar, reorganizar<br />y dar <em>continuidad</em>
          </h2>
          <p className={`${s.memoriaLead} reveal rd2`}>
            Urbetrack necesitaba crecer. El proyecto tomó como referencia la intervención del piso 11
            de 2019 y extendió su identidad a los pisos 12 y 13, adaptando cada nivel a las
            necesidades de su área.
          </p>
          <p className="reveal rd3">
            Baños compartidos, cocina de servicio, pisos símil madera gris, revestimientos de madera
            oscura, tabiquerías vidriadas, mobiliario de una misma línea y un color que vincula los
            tres niveles. La distribución combina puestos operativos, oficinas, salas de trabajo y
            de reunión según las necesidades de concentración, privacidad y colaboración de cada equipo.
          </p>
        </div>
        <div className={`${s.memoriaIso} reveal rd2`}>
          <Image
            src="/images/urbetrack/memoria-iso-lines.webp"
            alt="Axonometría del edificio con los pisos 11, 12 y 13"
            width={1236}
            height={918}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div ref={statsRef} className={s.stats}>
        {STATS.map((st) => (
          <div key={st.label} className={s.stat}>
            <div className={s.statValue}>
              {'prefix' in st && st.prefix}
              <Counter to={st.value} run={run} />
              {st.suffix}
            </div>
            <div className={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
