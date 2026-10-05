"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { series } from '@/components/portfolio/data/fotografia';
import { CountryFlag } from './CountryFlag';
import s from './Fotografia.module.css';
export function Fotografia(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{const el=root.current;if(!el)return;let raf=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const clamp=(n:number)=>Math.max(0,Math.min(1,n));const update=()=>{raf=0;const progress=clamp((-el.getBoundingClientRect().top+64)/(innerHeight*.85));el.style.setProperty('--intro',String(reduced.matches?1:clamp(progress/.28)));el.querySelectorAll<HTMLElement>('li').forEach((row,i)=>row.style.setProperty('--row',String(reduced.matches?1:clamp((progress-.28-i*(.45/Math.max(1,series.length-1)))/.2))));};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',scroll);removeEventListener('resize',scroll);};},[]);
 return <section ref={root} id="fotografia" className={s.homeSummary} data-chapter="Fotografía"><div className={s.summaryFrame}><div className={s.summaryCopy}><h2>Fotografía<br/><em>mirada arquitectónica.</em></h2><p className={s.summaryNumber}><strong>{series.length}</strong><span>países</span></p><Link href="/fotografia" className="btn-ghost">Ver la categoría de fotografía ↗</Link></div><nav className={s.summaryCountries} aria-label="Series fotográficas por país"><ol>{series.map(country=><li key={country.key}><Link href={'/fotografia#'+country.key}><CountryFlag country={country.title}/><span>{country.title}</span><small>{String(country.photos.length).padStart(2,'0')}</small></Link></li>)}</ol></nav></div></section>;
}
