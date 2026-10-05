'use client';
import { useEffect, useRef, useState } from 'react';
import s from './ElevatorJourney.module.css';
const COUNT=192;
const src=(i:number)=>'/images/casa-angel-elevator/frame-'+String(i+1).padStart(3,'0')+'.webp';
export function ElevatorJourney(){
 const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),backdrop=useRef<HTMLCanvasElement>(null),target=useRef(0),manual=useRef(false);
 const [progress,setProgress]=useState(0),[ready,setReady]=useState(false);
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
   if(available!==undefined&&available!==last){ctx.drawImage(cache.get(available)!,0,0,c.width,c.height);backdrop.current?.getContext('2d')?.drawImage(cache.get(available)!,0,0,478,850);section.style.setProperty('--scene-progress',String(available/(COUNT-1)));last=available;setReady(true);setProgress(available/(COUNT-1));}
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
 return <section ref={root} id="recorrido-vertical" className={s.journey} data-chapter="Casa Ángel · La mirada desde la calle"><div className={s.sticky}><canvas ref={backdrop} width={478} height={850} className={s.backdrop} aria-hidden="true"/><div className={s.copy}><div className="sec-label">La relación con la calle</div><h2 className="sec-title">La casa<br/><em>cobra vida.</em></h2><p>Desde la calle, el movimiento del ascensor deja ver la vida interior. La cabina iluminada recorre el volumen curvo y transforma la fachada en una escena que cambia.</p><p>La luz recorre la textura del hormigón y hace visible su profundidad. El refugio se expresa hacia afuera a través de sus materiales y del movimiento de quienes lo habitan.</p><span className={s.hint}>Recorré la escena con el scroll ↑</span></div><div className={s.window}><img src={src(0)} alt="Casa Ángel vista desde la calle, con el ascensor iluminado"/><canvas ref={canvas} width={478} height={850} style={{opacity:ready?1:0}} role="img" aria-label="Movimiento del ascensor y luz sobre la fachada de Casa Ángel" data-frame={Math.round(progress*(COUNT-1))}/></div></div></section>;
}
