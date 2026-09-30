'use client';
import {useEffect,useRef,useState} from 'react';
import type {LightboxItem} from '@/components/portfolio/shared/Lightbox';
import {asset,drawings} from './data';
import s from './DrawingViewers.module.css';
const cuts=[
 {image:asset('p22-X8','Espacio público'),box:'15 299 1547 417',line:[174,279,650,279]},
 {image:asset('p23-X8','Espacio privado'),box:'56 517 920 436',line:[330,106,584,106]},
 {image:asset('p24-X8','Patio central'),box:'58 159 1458 635',line:[440,42,440,342]},
 {image:asset('p25-X9','Núcleo sanitario'),box:'55 144 1464 676',line:[350,193,585,193]},
 {image:asset('p26-X8','Cuarto en suite'),box:'16 482 1023 401',line:[416,42,416,342]},
];
type Props={onOpen:(items:LightboxItem[],index:number)=>void};
export function SectionViewer({onOpen,onChange}:{onChange:(i:number)=>void}&Props){
 const [active,setActive]=useState(0),[closing,setClosing]=useState(false),[direction,setDirection]=useState(1);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);const choose=(i:number)=>{if(i===active||closing)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){setActive(i);onChange(i);return;}setDirection(i>active?1:-1);setClosing(true);timer.current=setTimeout(()=>{setActive(i);onChange(i);setClosing(false);},400);};
 const gesture=useRef<HTMLDivElement>(null), gestureX=useRef(0),cooldown=useRef(0);
 useEffect(()=>{const el=gesture.current;if(!el)return;let total=0;const wheel=(e:WheelEvent)=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY))return;e.preventDefault();if(Date.now()<cooldown.current)return;total+=e.deltaX;if(Math.abs(total)>45){choose((active+(total>0?1:cuts.length-1))%cuts.length);total=0;cooldown.current=Date.now()+950;}};el.addEventListener('wheel',wheel,{passive:false});return()=>el.removeEventListener('wheel',wheel);},[active,closing]);
 return <div ref={gesture} onTouchStart={e=>{gestureX.current=e.touches[0].clientX;}} onTouchEnd={e=>{const dx=gestureX.current-e.changedTouches[0].clientX;if(Math.abs(dx)>50)choose((active+(dx>0?1:cuts.length-1))%cuts.length);}} className={`${s.viewer} ${direction<0?s.reverse:''}`}>
  <div className={s.cutHeading} aria-live="polite"><span>{String(active+1).padStart(2,'0')} / 05</span>{cuts[active].image.alt}</div>
  <div className={s.swipeHint}>← Deslizá →</div><div className={s.cutLayout}>
   <div className={s.cutViewport}><button className={s.previous} disabled={closing} aria-label="Corte anterior" onClick={()=>choose((active+cuts.length-1)%cuts.length)}>‹</button><div className={`${s.cutStage} ${closing?s.closing:''}`}>{cuts.map((cut,i)=><button type="button" key={cut.image.src} className={`${s.cutLayer} ${i===active?s.active:''}`} aria-hidden={i!==active} tabIndex={i===active?0:-1} aria-label={`Ampliar corte: ${cut.image.alt}`} onClick={()=>onOpen(cuts.map(c=>c.image),i)}><svg viewBox={cut.box} preserveAspectRatio="xMidYMid meet" role="img" aria-label={cut.image.alt}><image href={cut.image.src} width={cut.image.w} height={cut.image.h}/></svg></button>)}</div><button className={s.next} disabled={closing} aria-label="Corte siguiente" onClick={()=>choose((active+1)%cuts.length)}>›</button></div>
   <div className={s.plan}><svg viewBox="165 35 495 315" role="img" aria-label={`Ubicación en planta: ${cuts[active].image.alt}`}><image href="/images/casa-piaggio/p22-X9.webp" width="859" height="458"/>{cuts.map((cut,i)=><line key={i} x1={cut.line[0]} y1={cut.line[1]} x2={cut.line[2]} y2={cut.line[3]} stroke="#a34f36" strokeWidth="4" strokeDasharray="10 6" opacity={active===i?1:0}/>)}</svg></div>
  </div>
 </div>;
}
const axos=[asset('p21-X10','Axonométrica del conjunto'),asset('p21-X4','Axonométrica del patio y las terrazas')];
export function AxoViewer({onOpen}:Props){
 const [active,setActive]=useState(0),[turn,setTurn]=useState<{to:number;p:number}|null>(null);const busy=useRef(false),raf=useRef(0);
 useEffect(()=>()=>cancelAnimationFrame(raf.current),[]);
 const select=(to:number)=>{if(to===active||busy.current)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){setActive(to);return;}busy.current=true;const start=performance.now();const tick=(now:number)=>{const p=Math.min(1,(now-start)/1000);if(p===1){setActive(to);setTurn(null);busy.current=false;}else{setTurn({to,p});raf.current=requestAnimationFrame(tick);}};raf.current=requestAnimationFrame(tick);};
 const shown=turn&&turn.p>=.5?turn.to:active;const p=turn?.p??0;const rotation=turn?(p<.5?-90*Math.sin(p*Math.PI):90*(1-Math.sin((p-.5)*Math.PI))):0;
 return <div className={s.viewer}><div className={s.buttons}>{['Conjunto','Patio y terrazas'].map((name,i)=><button key={name} type="button" disabled={!!turn} aria-pressed={(turn?.to??active)===i} onClick={()=>select(i)}>{name}</button>)}</div><div className={s.axoStage}><button className={s.axoPlate} style={{transform:`rotateY(${rotation}deg)`}} type="button" onClick={()=>onOpen(axos,shown)} aria-label={`Ampliar ${axos[shown].alt}`}><img src={axos[shown].src} alt={axos[shown].alt} width={axos[shown].w} height={axos[shown].h}/></button></div></div>;
}
