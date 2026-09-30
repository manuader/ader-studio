'use client';
import {useEffect,useRef,useState,type ReactNode,type CSSProperties} from 'react';
import Image from 'next/image';
import {renders} from './data';
import type {LightboxItem} from '@/components/portfolio/shared/Lightbox';
import s from './BrickGallery.module.css';
export function BrickGallery({onOpen,memory}:{memory?:ReactNode;onOpen:(items:LightboxItem[],index:number)=>void}){
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const mq=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  const update=()=>{frame=0;const panels=el.querySelectorAll<HTMLElement>('[data-panel]');
   if(mq.matches){panels.forEach(p=>p.removeAttribute('style'));return;}
   const rect=el.getBoundingClientRect();const length=Math.max(1,el.offsetHeight-innerHeight+64);
   const phase=Math.min(9,Math.max(0,(64-rect.top)/length*10-.6));setActive(Math.min(9,Math.floor(phase+.5)));
   panels.forEach((panel,i)=>{const enter=Math.max(0,Math.min(1,(phase-i+.55)/.55));const exit=Math.max(0,Math.min(1,(phase-i-.45)/.55));const visible=i===0||enter>0;
    panel.style.transform="none";
    panel.style.opacity=visible?String(1-Math.max(0,(exit-.85)/.15)):'0';panel.style.clipPath="none";
    panel.style.pointerEvents=Math.round(phase)===i?'auto':'none';
    panel.querySelectorAll<HTMLElement>('[data-brick]').forEach((b,j)=>{const order=((j*73+19)%157)/157;const cover=Math.max(0,Math.min(1,(exit-order*.7)/.3));const uncover=Math.max(0,Math.min(1,(enter-order*.7)/.3));const amount=Math.max(1-uncover,cover);b.style.opacity=String(amount*.9);b.style.transform=`scale(${.96+amount*.04})`;});
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);mq.addEventListener('change',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);mq.removeEventListener('change',schedule);};
 },[]);
 const jump=(i:number)=>{const el=root.current;if(!el)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.querySelectorAll('[data-panel]')[i]?.scrollIntoView();return;}const length=el.offsetHeight-innerHeight+64;window.scrollTo({top:scrollY+el.getBoundingClientRect().top-64+length*(i+.6)/10,behavior:'smooth'});};
 return <div ref={root} className={s.gallery}><div className={s.scene}>
  <aside className={s.index}><span className={s.stageLabel}>04 / HABITAR</span><h2>Producción<br/>gráfica</h2><p className={s.renderName}>{renders[active].alt}</p><strong>{String(active+1).padStart(2,'0')}<small> / 10</small></strong><div className={s.progress}>{renders.map((r,i)=><button onClick={()=>jump(i)} aria-label={r.alt} aria-current={i===active?'step':undefined} key={r.src}/>)}<i aria-hidden="true"/><i aria-hidden="true"/></div><span className={s.hint}>Deslizá para explorar ↓</span><div className={s.memorySlot}>{memory}</div></aside>
  <div className={s.stack}>{renders.map((item,i)=><figure data-panel data-index={i} key={item.src} className={s.panel} aria-hidden={active!==i}>
   <div className={s.rule}/><figcaption><span>{String(i+1).padStart(2,'0')}</span>{item.alt}<span>↗</span></figcaption>
   <button className={s.image} tabIndex={active===i?0:-1} onClick={()=>onOpen(renders,i)} aria-label={`Ampliar: ${item.alt}`}><Image src={item.src} alt={item.alt} width={item.w} height={item.h} sizes="100vw"/><span className={s.open}>EXPLORAR ↗</span><span className={s.microTiles} aria-hidden>{Array.from({length:120},(_,j)=>{const row=Math.floor(j/12),col=j%12;const x=Math.floor(col/2)*25+(col%2?16.6667:0)-(row%2?12.5:0);return <i data-brick key={j} style={{left:`${x}%`,top:`${row*10}%`,width:`${col%2?8.3334:16.6667}%`,height:'10%'} as CSSProperties}/>;})}</span></button>
  </figure>)}</div></div></div>;
}
