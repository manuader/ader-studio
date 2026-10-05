'use client';
import { useRef } from 'react';import Image from 'next/image';import Link from 'next/link';
import { projects } from '@/components/proyectos/projects';import s from './OtherProjects.module.css';
export function OtherProjects({current}:{current:string}){
 const track=useRef<HTMLDivElement>(null);const items=projects.filter(p=>p.href&&p.href!==current&&!p.tag.includes('Académic'));if(!items.length)return null;
 const move=(direction:number)=>{const el=track.current;if(el)el.scrollBy({left:direction*(el.clientWidth/2+12),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 return <section className={s.section} data-chapter="Otros proyectos" aria-label="Otros proyectos">
 <header><div><div className="sec-label">Seguir recorriendo</div><h2 className="sec-title">Otros <em>proyectos.</em></h2></div><div className={s.controls}><button aria-label="Ver proyectos anteriores" onClick={()=>move(-1)}>←</button><button aria-label="Ver más proyectos" onClick={()=>move(1)}>→</button></div></header>
 <div ref={track} className={s.track} tabIndex={0} aria-label="Proyectos: desplazá horizontalmente para explorar" onWheel={e=>{const el=track.current;if(el&&el.scrollWidth>el.clientWidth&&Math.abs(e.deltaY)>Math.abs(e.deltaX))el.scrollLeft+=e.deltaY;}} onKeyDown={e=>{if(e.target===e.currentTarget&&['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>
 {items.map(p=><Link key={p.href} href={p.href!} className={s.card}><div className={s.image}><Image src={p.image} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:768px) 45vw, 46vw"/></div><div className={s.copy}><span>{p.tag}</span><h3>{p.name} <span>↗</span></h3><p>{p.location} · {p.year}</p></div></Link>)}
 </div></section>;
}
