'use client';
import {useEffect,useRef,useState} from 'react';
import {concepts} from './data';
import type {LightboxItem} from '@/components/portfolio/shared/Lightbox';
import s from './ConceptJourney.module.css';
const labels=['Grilla','Módulos','Programa','Materialidad','Patio'];
const captions=['Una regla de 4 × 4 m.','Primera ocupación modular.','Los bloques se estiran.','Ladrillo y hormigón.','El vacío que conecta la casa.'];
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export function ConceptJourney({onOpen}:{onOpen:(items:LightboxItem[],index:number)=>void}){
 const root=useRef<HTMLDivElement>(null);const [progress,setProgress]=useState(0);const [reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;const update=()=>{frame=0;setReduced(mq.matches);if(!mq.matches&&root.current){const r=root.current.getBoundingClientRect();setProgress(clamp((140-r.top)/(root.current.offsetHeight-innerHeight+140))*4.99);}};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);mq.addEventListener('change',scroll);return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);mq.removeEventListener('change',scroll);};},[]);
 const active=Math.min(4,Math.floor(progress));
 const jump=(i:number)=>{if(reduced){setProgress(i+.95);return;}const el=root.current;if(el)window.scrollTo({top:scrollY+el.getBoundingClientRect().top-140+(el.offsetHeight-innerHeight+140)*(i+.65)/4.99,behavior:'smooth'});};
 const stretch=clamp((progress-2)*1.6);const lerp=(a:number,b:number)=>a+(b-a)*stretch;
 const grid=clamp(progress*2+.1)*(1-clamp((progress-2)*1.6));const volume=clamp((progress-.95)*2);const material=clamp((progress-2.95)*2);const patio=clamp((progress-3.95)*2);
 return <div className={s.journey} ref={root}><div className={s.frame}>
 <header><span>02 / EXPLORAR</span><h2>Definición conceptual</h2><p>Del módulo al patio.</p></header>
 <div className={s.body}><nav aria-label="Momentos del concepto">{labels.map((label,i)=><button key={label} onClick={()=>jump(i)} aria-current={active===i?'step':undefined}><i/><span>0{i+1}</span>{label}</button>)}<small>{reduced?'Elegí una etapa':'Deslizá para transformar ↓'}</small></nav>
 <div className={s.stage}>
 <svg viewBox="0 0 1000 740" role="img" aria-label={`Diagrama de ${labels[active].toLowerCase()}: terreno fijo y transformación de sus componentes`}>
 <defs><pattern id="conceptBrick" width="30" height="16" patternUnits="userSpaceOnUse"><rect width="30" height="16" fill="#b77050"/><path d="M0 0H30M0 8H30M0 16H30M0 0V8M20 0V8M5 8V16M15 8V16" stroke="#864a35" strokeWidth=".6"/></pattern><marker id="conceptArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="none" stroke="#77845b" strokeWidth="2"/></marker></defs>
 <path d="M244 40V650Q244 714 308 714H744" fill="none" stroke="#b9b1a5" strokeWidth="2"/>
 <rect x="280" y="40" width="420" height="664" fill="#f4f0e6" stroke="#7f776a" strokeWidth="1.5"/>
 <g opacity={grid} fill="none"><g stroke="#a34f36" strokeWidth=".65" opacity=".45">{Array.from({length:6},(_,i)=><path key={`v${i}`} d={`M${307.5+i*80.5} 40V704`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-clamp(progress*2-i*.05)}/>)}{Array.from({length:8},(_,i)=><path key={`h${i}`} d={`M280 ${93.5+i*80.5}H700`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-clamp(progress*2-i*.04)}/>)}</g></g>
 <g opacity={clamp(progress*3)} fill="#8b5a42" fontSize="15"><text x="490" y="26" textAnchor="middle">TERRENO · 687 m²</text></g>
 <g opacity={grid} fontSize="18" fill="#a34f36"><text x="745" y="280">4 × 4 m</text><text x="745" y="307" fontSize="14">Módulos cuadrados · 16 m²</text><path d="M600 270H728" stroke="#a34f36"/></g>
 <g opacity={volume}>
 <path d="M568 260V117a34 34 0 0 1 68 0V260Z" fill="#cedfdf" stroke="#a5b8b7"/>
 <rect x="388" y="174" width={lerp(80.5,96)} height={lerp(322,430)*volume} fill="#67635d"/>
 <rect x={lerp(549,558)} y={lerp(254.5,308)} width={lerp(80.5,90)} height={lerp(241.5,252)*volume} fill="#67635d"/>
 <rect x={lerp(468.5,484)} y={lerp(254.5,334)} width={lerp(80.5,74)*volume} height={lerp(80.5,66)} fill="#cf8967"/>
 <rect x={lerp(468.5,484)} y={lerp(415.5,477)} width={lerp(80.5,74)*volume} height={lerp(80.5,66)} fill="#cf8967"/>
 <rect x={lerp(468.5,484)} y={lerp(335,400)} width={lerp(80.5,74)} height={lerp(80.5,77)} fill="#c7d0ad"/>
 </g>
 <g opacity={volume*(1-material)} fontSize="15"><rect x="760" y="500" width="13" height="13" fill="#67635d"/><text x="785" y="512" fill="#67635d">Espacio habitable</text><rect x="760" y="530" width="13" height="13" fill="#cf8967"/><text x="785" y="542" fill="#67635d">Núcleo sanitario</text><rect x="760" y="560" width="13" height="13" fill="#c7d0ad"/><text x="785" y="572" fill="#67635d">Patio central</text></g>
 <g opacity={material}><rect x="388" y="174" width="96" height="430" fill="url(#conceptBrick)"/><rect x="558" y="308" width="90" height="252" fill="url(#conceptBrick)"/><path d="M484 334H558V400H484ZM484 477H558V543H484Z" fill="#adb3b1" stroke="#858e8a"/></g>
 <g opacity={clamp((progress-1.3)*3)*(1-material)} fill="#67635d" fontSize="16"><path d="M388 215H170M648 325H770" stroke="currentColor"/><text x="160" y="205" textAnchor="end">Espacio público</text><text x="780" y="320">Espacio privado</text></g>
 <g opacity={material*(1-patio)} fontSize="17" fill="#80513c"><path d="M388 230H190M558 362H770" stroke="currentColor"/><text x="180" y="220" textAnchor="end">Ladrillo</text><text x="780" y="355">Hormigón</text></g>
 <g opacity={patio}><rect x="484" y="400" width="74" height="77" fill="#c7d0ad"/><circle cx="521" cy="438" r={25*patio} fill="#93a274"/><circle cx="509" cy="430" r={15*patio} fill="#a9b487"/><circle cx="532" cy="429" r={16*patio} fill="#839366"/><path className={s.flow} d="M521 435H370M521 435H670M521 435V295M521 435V578" fill="none" stroke="#77845b" strokeWidth="2" strokeDasharray="7 5" markerEnd="url(#conceptArrow)"/><path d="M558 438H764" stroke="#77845b"/><text x="774" y="430" fill="#657047" fontSize="20">Patio central</text><text x="774" y="455" fill="#657047" fontSize="14">Luz · aire · relación</text></g>
 </svg>
 <footer><span>{captions[active]}</span></footer>
 </div></div><div className={s.timeline}><i style={{transform:`scaleX(${progress/4.99})`}}/></div>
 </div></div>;
}
