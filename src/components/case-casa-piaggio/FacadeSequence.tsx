'use client';
import {useEffect,useRef,useState} from 'react';
import type {LightboxItem} from '@/components/portfolio/shared/Lightbox';
import orbitData from './orbit-frames.json';
import s from './FacadeSequence.module.css';

const frames=[...orbitData.frames].sort((a,b)=>a.angle-b.angle);
type Turn={from:number;to:number;direction:number;progress:number};
const ease=(t:number)=>t*t*(3-2*t);
export function FacadeSequence({onOpen}:{onOpen:(items:LightboxItem[],index:number)=>void}){
  const [active,setActive]=useState(0),[turn,setTurn]=useState<Turn|null>(null);
  const reduced=useRef(false),request=useRef(0),busy=useRef(false);
  useEffect(()=>{
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>{reduced.current=motion.matches;};update();motion.addEventListener('change',update);
    return()=>{cancelAnimationFrame(request.current);motion.removeEventListener('change',update);};
  },[]);
  const select=(to:number)=>{
    if(busy.current||to===active)return;
    if(reduced.current){setActive(to);return;}
    busy.current=true;
    const direction=((to-active+4)%4)<=2?1:-1,started=performance.now();
    const animate=(now:number)=>{
      const progress=Math.min(1,(now-started)/1050);
      if(progress===1){setActive(to);setTurn(null);busy.current=false;request.current=0;return;}
      setTurn({from:active,to,direction,progress});request.current=requestAnimationFrame(animate);
    };
    request.current=requestAnimationFrame(animate);
  };
  // Rotate the approved plates themselves: no synthesized geometry or material swap.
  const incoming=!!turn&&turn.progress>=.5;
  const shown=turn?(incoming?turn.to:turn.from):active;
  const rotation=turn?(incoming?turn.direction*90*(1-ease((turn.progress-.5)*2)):-turn.direction*90*ease(turn.progress*2)):0;
  const heading=frames[turn?.to??active];
  const compass=turn?frames[turn.from].angle+turn.direction*(((turn.direction>0?frames[turn.to].angle-frames[turn.from].angle:frames[turn.from].angle-frames[turn.to].angle)+360)%360)*ease(turn.progress):frames[active].angle;
  return <div className={s.wrap}>
    <div className={s.top}><div><span className={s.kicker}>Explorar las fachadas</span><h3 aria-live="polite">{heading.label}</h3></div>
      <div className={s.compass} aria-hidden="true"><span className={s.north}>N</span><span className={s.east}>E</span><span className={s.south}>S</span><span className={s.west}>O</span><span className={s.needle} style={{transform:`rotate(${180-compass}deg)`}}>↑</span></div>
    </div>
    <div className={s.plateStage} aria-busy={!!turn}>
      <div className={s.turningPlate} style={{transform:`rotateY(${rotation}deg)`}}>
        <svg viewBox="0 0 1600 620" role="img" aria-label={`Fachada ${frames[shown].label}, imagen original`}>
          {frames.map((f,i)=><image key={f.angle} href={f.src} x={f.x} y={f.y} width={f.width} height={f.height} style={{visibility:i===shown?'visible':'hidden'}}/>)}
        </svg>
      </div>
    </div>
    <div className={s.controls}><div className={s.directions}>{frames.map((v,i)=><button key={v.angle} type="button" disabled={!!turn} aria-pressed={(turn?.to??active)===i} onClick={()=>select(i)}>{v.label}</button>)}</div><div className={s.playback}>
      <button type="button" disabled={!!turn} aria-label="Vista anterior" onClick={()=>select((active+3)%4)}>←</button>
      <button type="button" disabled={!!turn} aria-label="Vista siguiente" onClick={()=>select((active+1)%4)}>→</button>
      <button type="button" disabled={!!turn} onClick={()=>onOpen(frames.map(f=>({src:f.src,w:f.w,h:f.h,alt:f.label})),active)} aria-label={`Ampliar ${frames[active].label}`}>Ampliar ↗</button>
    </div></div>
  </div>;
}
