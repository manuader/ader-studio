'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './ProjectIndex.module.css';
import { entries, FILTERS, type Category } from './data';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Índice editorial de proyectos. Una sola idea de interacción:
 * al apuntar (o enfocar con teclado) una fila, su portada se revela por máscara
 * y acompaña al cursor. En pantallas táctiles cada fila muestra su portada.
 */
export function ProjectIndex({category='obra'}:{category?:Category}) {
  const scopedEntries = entries.filter(e => e.category === category);
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [active, setActive] = useState<number | null>(null);
  const [under, setUnder] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const placed = useRef(false);
  const reduced = useRef(false);
  const activeRef = useRef<number | null>(null);
  const nameRight = useRef(0);
  const [shown, setShown] = useState<number | null>(null);
  const shownRef = useRef<number | null>(null);

  const visible = scopedEntries
    .map((e, i) => ({ ...e, i }))
    .filter((e) => filter === 'all' || e.category === filter);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const tick = useCallback(() => {
    const el = previewRef.current;
    if (!el) return;
    const k = reduced.current ? 1 : 0.16;
    pos.current.x += (target.current.x - pos.current.x) * k;
    pos.current.y += (target.current.y - pos.current.y) * k;
    el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    const dx = Math.abs(target.current.x - pos.current.x);
    const dy = Math.abs(target.current.y - pos.current.y);
    raf.current = dx + dy > 0.3 ? requestAnimationFrame(tick) : 0;
  }, []);

  /** Coloca la portada a la derecha del punto, volteando si no entra en pantalla. */
  const aim = useCallback(
    (x: number, y: number) => {
      const el = previewRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const gap = 36;
      // Nunca tapa el nombre apuntado: arranca a la derecha de él.
      let left = Math.max(x + gap, nameRight.current + gap);
      if (left + w > window.innerWidth - 16) left = window.innerWidth - 16 - w;
      const top = Math.min(Math.max(y - h / 2, 80), window.innerHeight - h - 16);
      target.current = { x: left, y: top };
      if (!placed.current) {
        pos.current = { ...target.current };
        placed.current = true;
      }
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  const show = (i: number) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActive(i);
    // La portada anterior queda debajo mientras la nueva se revela.
    if (shownRef.current !== i) {
      setUnder(shownRef.current);
      shownRef.current = i;
      setShown(i);
    }
  };

  const hide = () => {
    activeRef.current = null;
    setActive(null);
    placed.current = false;
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    aim(e.clientX, e.clientY);
  };

  const measureName = (row: HTMLElement) => {
    const name = row.querySelector('[data-name]');
    nameRight.current = name ? name.getBoundingClientRect().right + 10 : 0;
  };

  const onFocusRow = (e: React.FocusEvent<HTMLAnchorElement>, i: number) => {
    if (!e.currentTarget.matches(':focus-visible')) return;
    const r = e.currentTarget.getBoundingClientRect();
    measureName(e.currentTarget);
    placed.current = false;
    aim(0, r.top + r.height / 2);
    show(i);
  };

  return (
    <section className={s.index} data-chapter="Índice" aria-labelledby="indice-titulo">
      <div className={s.head}>
        <h2 id="indice-titulo" className={`${s.headLabel} sec-label reveal`}>Índice</h2>
        <div className={`${s.filters} reveal rd1`} role="group" aria-label="Filtrar proyectos">
          {FILTERS.filter(f => f.key === 'all').map((f) => {
            const count = f.key === 'all' ? scopedEntries.length : scopedEntries.filter((e) => e.category === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                className={`btn-ghost ${s.filter}`}
                aria-pressed={filter === f.key}
                onClick={() => {
                  setFilter(f.key);
                  hide();
                }}
              >
                {f.label}
                <span className={s.count}>{pad(count)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ol
        key={filter}
        className={s.list}
        onPointerMove={onMove}
        onPointerLeave={hide}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
        }}
        data-hovering={active !== null || undefined}
      >
        {visible.map((p, n) => (
          <li key={p.href} className={s.item} style={{ '--n': n } as React.CSSProperties}>
            <Link
              href={p.href}
              className={s.row}
              data-active={active === p.i || undefined}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'mouse') return;
                measureName(e.currentTarget);
                aim(e.clientX, e.clientY);
                show(p.i);
              }}
              onFocus={(e) => onFocusRow(e, p.i)}
            >
              <span className={s.num}>{pad(p.i + 1)}</span>
              <span className={s.name} data-name>{p.name}</span>
              <span className={s.meta}>
                <span className={s.tag}>{p.tag}</span>
                <span className={s.loc}>{p.location}</span>
              </span>
              <span className={s.year}>{p.year}</span>
              <svg className={s.arrow} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1" />
                <polyline points="14,5 20,11 14,17" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
              <span className={s.thumb}>
                <Image
                  src={p.cover.src}
                  alt=""
                  width={p.cover.w}
                  height={p.cover.h}
                  sizes="(max-width: 768px) 40vw, 240px"
                  className={s.thumbImg}
                  loading="lazy"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div ref={previewRef} className={s.preview} data-open={active !== null || undefined} aria-hidden="true">
        <div className={s.previewFrame}>
          {scopedEntries.map((p, i) => (
            <Image
              key={p.href}
              src={p.cover.src}
              alt=""
              width={p.cover.w}
              height={p.cover.h}
              sizes="420px"
              className={s.previewImg}
              data-state={shown === i ? 'on' : under === i ? 'under' : undefined}
              // Precargadas: si esperan al primer hover, la máscara revela un cuadro
              // vacío y queda a la vista la portada del proyecto anterior.
              loading="eager"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
