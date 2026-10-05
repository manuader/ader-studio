'use client';
import { useEffect, useRef, useState } from 'react';
import s from './VideoShowcase.module.css';
const COUNT=122;
const src=(i:number)=>'/images/casa-angel-light/frame-'+String(i+1).padStart(3,'0')+'.webp';
export function VideoShowcase(){
 const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),target=useRef(0);
 const [progress,setProgress]=useState(0),[ready,setReady]=useState(false);
 const manual=useRef(false);
 useEffect(()=>{
  const section=root.current,c=canvas.current;if(!section||!c)return;
  const ctx=c.getContext('2d');if(!ctx)return;
  const cache=new Map<number,HTMLImageElement>(),pending=new Set<number>();
  let stopped=false,raf=0,current=0,last=-1,visible=false;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const load=(i:number)=>{
   if(i<0||i>=COUNT||cache.has(i)||pending.has(i)||pending.size>=4)return;
   pending.add(i);const img=new Image();img.decoding='async';
   img.onload=()=>{pending.delete(i);if(stopped)return;cache.set(i,img);const center=Math.round(current*(COUNT-1));if(cache.size>14){const distant=[...cache.keys()].sort((a,b)=>Math.abs(b-center)-Math.abs(a-center));while(cache.size>14)cache.delete(distant.shift()!);}if(!raf)raf=requestAnimationFrame(draw);};
   img.onerror=()=>pending.delete(i);img.src=src(i);
  };
  const draw=()=>{
   raf=0;if(stopped)return;
   current=reduce.matches?target.current:current+(target.current-current)*.16;
   if(Math.abs(current-target.current)<.0008)current=target.current;
   const index=Math.round(current*(COUNT-1));load(index);
   for(const offset of [1,-1,2,-2,3,-3])load(index+offset);
   const available=cache.has(index)?index:[...cache.keys()].sort((a,b)=>Math.abs(a-index)-Math.abs(b-index))[0];
   if(available!==undefined&&available!==last){ctx.drawImage(cache.get(available)!,0,0,c.width,c.height);last=available;setReady(true);setProgress(available/(COUNT-1));}
   if(visible&&(Math.abs(current-target.current)>.0008||!cache.has(index)))raf=requestAnimationFrame(draw);
  };
  const update=()=>{
   if(!manual.current&&!reduce.matches){const rect=section.getBoundingClientRect();target.current=Math.min(1,Math.max(0,(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"))-rect.top)/Math.max(1,rect.height-innerHeight)));}
   if(!raf)raf=requestAnimationFrame(draw);
  };
  const resetManual=()=>{manual.current=false;update();};
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)update();},{rootMargin:'400px'});io.observe(section);
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('wheel',resetManual,{passive:true});window.addEventListener('touchstart',resetManual,{passive:true});window.addEventListener('resize',update);
  const control=section.querySelector('[role=slider]');control?.addEventListener('clockchange',update);
  load(0);load(1);update();
  return()=>{stopped=true;cancelAnimationFrame(raf);io.disconnect();window.removeEventListener('scroll',update);window.removeEventListener('wheel',resetManual);window.removeEventListener('touchstart',resetManual);window.removeEventListener('resize',update);control?.removeEventListener('clockchange',update);cache.clear();};
 },[]);
 const minutes=progress<.34?720+progress/.34*300:progress<.7?1020+(progress-.34)/.36*120:1140+(progress-.7)/.3*120;
 const time=String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(Math.floor(minutes%60)).padStart(2,'0');
 const change=(p:number)=>{manual.current=true;target.current=Math.max(0,Math.min(1,p));root.current?.querySelector('[role=slider]')?.dispatchEvent(new Event('clockchange'));};
 const phase=progress<.34?'Día':progress<.7?'Atardecer':'Noche';
 return <section ref={root} id="luz-casa-angel" className={s.journey} data-chapter="Casa Ángel · Luz" aria-labelledby="light-title">
  <div className={s.sticky}>
   <header className={s.head}><div><span className="sec-label">La casa y la luz</span><h2 id="light-title">La luz <em>como protagonista.</em></h2></div><span className={s.phase}>{phase}</span></header>
   <div className={s.frame}><img src={src(0)} alt="Casa Ángel: fachada durante el día" className={s.poster}/><canvas ref={canvas} width={1660} height={1244} className={s.canvas} style={{opacity:ready?1:0}} role="img" aria-label={'Casa Ángel: cambio de luz, '+phase.toLowerCase()}/></div>
   <div className={s.controls}>
    <div className={s.clock} role="slider" tabIndex={0} aria-label="Explorar la luz con el reloj" aria-valuemin={0} aria-valuemax={121} aria-valuenow={Math.round(progress*121)} aria-valuetext={time+' · '+phase}
     onKeyDown={e=>{if(['ArrowRight','ArrowUp','ArrowLeft','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();change(e.key==='Home'?0:e.key==='End'?1:target.current+(['ArrowRight','ArrowUp'].includes(e.key)?1:-1)/121);}}}
     onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);const rect=e.currentTarget.getBoundingClientRect();let angle=Math.atan2(e.clientX-rect.left-rect.width/2,-(e.clientY-rect.top-rect.height/2))*180/Math.PI;if(angle<0)angle+=360;const m=Math.min(270,angle)/270*540;change(m<300?m/300*.34:m<420?.34+(m-300)/120*.36:.7+(m-420)/120*.3);}}
     onPointerMove={e=>{if(!e.currentTarget.hasPointerCapture(e.pointerId))return;const rect=e.currentTarget.getBoundingClientRect();let angle=Math.atan2(e.clientX-rect.left-rect.width/2,-(e.clientY-rect.top-rect.height/2))*180/Math.PI;if(angle<0)angle+=360;const m=Math.min(270,angle)/270*540;change(m<300?m/300*.34:m<420?.34+(m-300)/120*.36:.7+(m-420)/120*.3);}}>
     <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth=".7"/>{Array.from({length:12},(_,i)=><line key={i} x1="50" y1="7" x2="50" y2={i%3===0?14:10} stroke="currentColor" strokeWidth={i%3===0?1.5:.7} transform={'rotate('+i*30+' 50 50)'}/>)}<line x1="50" y1="50" x2="50" y2="25" stroke="currentColor" strokeWidth="2.5" transform={'rotate('+(minutes-720)*.5+' 50 50)'}/><line x1="50" y1="50" x2="50" y2="13" stroke="currentColor" strokeWidth="1" transform={'rotate('+(minutes-720)*6+' 50 50)'}/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg>
    </div>
   </div>
  </div>
 </section>;
}
