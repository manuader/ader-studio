'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import Image from 'next/image';
import {climate} from './data';
import type {LightboxItem} from '@/components/portfolio/shared/Lightbox';
import s from './ClimateHouse.module.css';
const readings=[
 {title:'El aire también se habita.',period:'Verano · mayor bochorno',value:'38 %',unit:'condiciones bochornosas · 9 feb.',text:'El bochorno alcanza su máximo en febrero y prácticamente desaparece en julio. El porcentaje describe frecuencia de condiciones, no humedad relativa ni agua sobre los muros.',response:'Explorar ventilación y sombra alrededor del patio.'},
 {title:'La casa entre dos estaciones.',period:'Enero ↔ julio',value:'30 / 18 °C',unit:'máxima y mínima medias · enero',text:'En julio las curvas descienden a aproximadamente 14 / 5 °C. El diagrama alterna atmósferas cálidas y frescas sin representar un cálculo de asoleamiento.',response:'Estudiar protección en verano y abrigo en invierno.'},
 {title:'Recibir el agua. Darle salida.',period:'Febrero · mayor probabilidad',value:'35 %',unit:'probabilidad de día con lluvia · 8 feb.',text:'La probabilidad baja hasta 16 % alrededor del 19 de junio. El gráfico expresa frecuencia de lluvia, no milímetros ni intensidad de una tormenta.',response:'Revisar aleros, escurrimiento de cubiertas y drenaje del patio.'},
 {title:'Leer de dónde llega el aire.',period:'Este → norte → este',value:'E / N',unit:'direcciones predominantes según época',text:'El este predomina al inicio y al final del año; el norte, aproximadamente entre abril y agosto. La dirección indica de dónde viene el viento, no hacia dónde sopla.',response:'Norte confirmado arriba a la derecha. Compará el viento del este en los meses cálidos y el del norte en el tramo central del año.'},
];
export function ClimateHouse({onOpen}:{onOpen:(items:LightboxItem[],index:number)=>void}){
 const [active,setActive]=useState(0),[wind,setWind]=useState(0);const data=readings[active];
 const gesture=useRef<HTMLDivElement>(null),touch=useRef(0),lock=useRef(0);
 useEffect(()=>{const el=gesture.current;if(!el)return;let distance=0;const wheel=(e:WheelEvent)=>{if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();if(Date.now()<lock.current)return;distance+=e.deltaX;if(Math.abs(distance)>45){const direction=distance>0?1:3;setActive(i=>(i+direction)%4);distance=0;lock.current=Date.now()+800;}};el.addEventListener('wheel',wheel,{passive:false});return()=>el.removeEventListener('wheel',wheel);},[]);
 return <div ref={gesture} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{const delta=touch.current-e.changedTouches[0].clientX;if(Math.abs(delta)>50)setActive(i=>(i+(delta>0?1:3))%4);}} className={s.module}>
  <header className={s.climateHeading}><span>01 / INVESTIGAR</span><h2>Investigación<br/>y diagnóstico</h2></header><div className={s.tabs} aria-label="Clima sobre la casa">{climate.map((c,i)=><button key={c.title} aria-pressed={active===i} onClick={()=>setActive(i)}>{c.title}</button>)}</div>
  <div className={s.layout}>
   <div className={s.scene} data-climate={active}>
    <div className={s.topline}><span>{active===3?(wind===0?'Este · meses cálidos':'Norte · abril a agosto aprox.'):data.period}</span>{active===3&&<button onClick={()=>setWind(1-wind)}>Ver viento {wind===0?'norte':'este'} ↗</button>}</div>
    <svg className={s.world} viewBox="0 80 1000 640" role="img" aria-label={`Diagrama animado de ${climate[active].title.toLowerCase()} sobre la axonométrica de Casa Piaggio`}>
     <defs><radialGradient id="climateGlow"><stop stopColor="#e9ac55" stopOpacity=".5"/><stop offset="1" stopColor="#e9ac55" stopOpacity="0"/></radialGradient><linearGradient id="climateMist"><stop stopColor="#c8e0df" stopOpacity="0"/><stop offset=".5" stopColor="#c8e0df" stopOpacity=".6"/><stop offset="1" stopColor="#c8e0df" stopOpacity="0"/></linearGradient><marker id="climateArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#678e91"/></marker></defs>
     {active===1&&<g className={s.sun}><circle cx="190" cy="140" r="125" fill="url(#climateGlow)"/><circle cx="190" cy="140" r="30" fill="#e3a34d"/>{Array.from({length:12},(_,i)=><path key={i} d="M190 95V78" stroke="#d29a51" strokeWidth="3" transform={`rotate(${i*30} 190 140)`}/>)}</g>}
     <image href="/images/casa-piaggio/p21-X10.webp" x="35" y="160" width="930" height="558"/>
     {active===0&&<g className={s.humidity}>{[0,1,2,3].map(i=><ellipse key={i} cx={350+i*70} cy={350+i*58} rx="340" ry="48" fill="url(#climateMist)" style={{'--delay':`${i*-2}s`} as CSSProperties}/>)}</g>}
     {active===1&&<g className={s.thermal}>{[0,1,2,3,4].map(i=><path key={i} d={`M${290+i*100} 400q-20 -30 0 -60t0 -60`} fill="none" stroke="#d48b4d" strokeWidth="3" style={{'--delay':`${i*-.6}s`} as CSSProperties}/>)}</g>}
     {active===2&&<g><g className={s.cloud} fill="#c0d1d4"><ellipse cx="460" cy="128" rx="120" ry="32"/><ellipse cx="420" cy="105" rx="50" ry="40"/><ellipse cx="485" cy="98" rx="55" ry="46"/><ellipse cx="540" cy="119" rx="40" ry="31"/></g><g className={s.rain}>{Array.from({length:34},(_,i)=><path key={i} d={`M${240+(i*73)%530} ${175+(i*47)%250}l-9 25`} stroke="#739caf" strokeWidth="2" strokeLinecap="round" style={{'--delay':`${i*-.19}s`} as CSSProperties}/>)}</g><g className={s.ripples} fill="none" stroke="#8db4c3" strokeWidth="2">{[0,1,2].map(i=><ellipse key={i} cx={350+i*145} cy={560+i*25} rx="34" ry="9" style={{'--delay':`${i*-.7}s`} as CSSProperties}/>)}</g></g>}
     {active===3&&<g><g aria-label={wind===0?"Viento desde el este, abajo a la derecha":"Viento desde el norte, arriba a la derecha"}>{[0,1,2,3].map(i=><path key={i} className={s.gust} d={wind===0?`M${780+i*50} 650 C${700+i*40} 540 ${550+i*40} 430 ${440+i*45} 390 S${220+i*40} 250 ${100+i*45} 175`:`M${690+i*65} 150 C${650+i*45} 230 ${510+i*45} 320 ${420+i*45} 365 S${220+i*40} 510 ${100+i*45} 580`} markerEnd="url(#climateArrow)" style={{'--delay':`${i*-.4}s`} as CSSProperties}/>)}</g><g transform="translate(805 105)"><path d="M-40 50L40 -10M-40 -10L40 50" stroke="#adb7b5"/><text x="48" y="-10">N</text><text x="48" y="60">E</text><path d={wind===0?'M40 50L-25 1':'M40 -10L-25 39'} className={s.windEast} strokeDasharray="12 10" fill="none" markerEnd="url(#climateArrow)" stroke="#678e91"/></g></g>}
    </svg>

   </div>
   <aside className={s.reading} aria-live="polite"><h3>{data.title}</h3><strong>{data.value}</strong><span className={s.unit}>{data.unit}</span><p>{data.text.split(". ").slice(0,2).join(". ")}</p><button className={s.chart} onClick={()=>onOpen(climate.map(c=>c.image),active)} aria-label={`Ampliar gráfico de ${climate[active].title}`}><Image src={climate[active].image.src} alt={climate[active].image.alt} width={climate[active].image.w} height={climate[active].image.h} sizes="(max-width:760px) 85vw, 28vw"/></button></aside>
  </div>
 </div>;
}
