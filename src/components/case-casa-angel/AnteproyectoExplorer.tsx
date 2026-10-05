'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import { E1, E2, E3, E4, RENDERS, stageName } from './data';
import s from './AnteproyectoExplorer.module.css';
const chapters=[E1,E2,E3,E4];
const decisions=[
  {title:'Elevar la vida pública',text:'Los espacios públicos se ubican arriba; el acceso y los servicios, en planta baja. El croquis explica esa relación.',image:E2.images[0],stage:1},
  {title:'Difuminar los límites',text:'Las galerías y los espacios semicubiertos construyen una transición entre interior y exterior: la casa se abre al paisaje sin pasar de un ambiente a otro de forma abrupta.',image:E3.images[4],stage:2}
];
const statements=[
  'Leer el lote: conectividad, vecinos, viento, grilla y arbolado.',
  'Definir la idea: refugio elevado, implantación y organización del programa.',
  'Contrastar la propuesta: plantas, corte y axonométricas del conjunto.',
  'Explorar la experiencia: exteriores, interiores y relación con la luz.'
];
const documents=chapters.map((c,i)=>i===3?[...c.images,...RENDERS.filter(r=>!c.images.some(p=>p.src===r.src))]:c.images);
export function AnteproyectoExplorer(){
  const [stage,setStage]=useState(0);
  const [viewer,setViewer]=useState<{items:LightboxItem[];index:number|null}>({items:[],index:null});
  const tabs=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const sync=()=>{const i=chapters.findIndex(c=>'#'+c.key===location.hash);if(i>=0){setStage(i);requestAnimationFrame(()=>document.getElementById('documentacion-angel')?.scrollIntoView({block:'start',behavior:'instant'}));}};
    sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);
  },[]);
  const select=(i:number)=>{setStage(i);history.replaceState(null,'','#'+chapters[i].key);};
  const keys=(event:KeyboardEvent<HTMLButtonElement>,i:number)=>{
    let next=i;
    if(event.key==='ArrowRight')next=(i+1)%4;else if(event.key==='ArrowLeft')next=(i+3)%4;else if(event.key==='Home')next=0;else if(event.key==='End')next=3;else return;
    event.preventDefault();select(next);tabs.current?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
  };
  const chapter=chapters[stage];
  return <section id="anteproyecto" className={s.section} data-chapter="Casa Ángel · Anteproyecto" aria-labelledby="angel-decisions">
    <header className={s.heading}><div className="sec-label">Anteproyecto / Las decisiones</div><h2 id="angel-decisions" className="sec-title">La vida arriba.<br/><em>El paisaje adentro.</em></h2><p>Dos decisiones que conectan la organización de la casa con la experiencia de habitarla.</p></header>
    <div className={s.decisions}>{decisions.map((d,i)=><article key={d.title} className={s.decision}>
      <button className={s.imageButton} onClick={()=>setViewer({items:[d.image],index:0})} aria-label={'Ampliar: '+d.image.alt}><Image src={d.image.src} alt={d.image.alt} width={d.image.w} height={d.image.h} sizes="(max-width:768px) 90vw, 30vw"/></button>
      <span className={s.number}>0{i+1}</span><h3>{d.title}</h3><p>{d.text}</p><button className={s.textButton} onClick={()=>{select(d.stage);const docs=document.getElementById('documentacion-angel') as HTMLDetailsElement | null;if(docs){docs.open=true;docs.scrollIntoView({block:'start'});}}}>Explorar las piezas ↗</button>
    </article>)}</div>
    <details id="documentacion-angel" className={s.explorer} open>
      <summary>Explorar el anteproyecto <span>Cuatro etapas · Dibujos y renders</span></summary>
      <div ref={tabs} className={s.tabs} role="tablist" aria-label="Documentación del anteproyecto">{chapters.map((c,i)=><button type="button" key={c.key} role="tab" id={'doc-tab-'+c.key} aria-controls="angel-doc-panel" aria-selected={stage===i} tabIndex={stage===i?0:-1} onClick={()=>select(i)} onKeyDown={e=>keys(e,i)}><span>0{i+1}</span>{stageName(c)}</button>)}</div>
      <div id="angel-doc-panel" role="tabpanel" aria-labelledby={'doc-tab-'+chapter.key} className={s.panel}>
        <div className={s.panelIntro}><p>{statements[stage]}</p><details className={s.memory}><summary>Leer la memoria original</summary>{chapter.text.map(p=><p key={p.slice(0,20)}>{p}</p>)}</details></div>
        <div key={stage} className={s.documents}>{documents[stage].map((image,i)=><figure key={image.src}><button className={s.imageButton} onClick={()=>setViewer({items:documents[stage],index:i})} aria-label={'Ampliar: '+image.alt}><Image src={image.src} alt={image.alt} width={image.w} height={image.h} sizes="(max-width:768px) 85vw, 24vw" loading="lazy"/></button><figcaption>{image.alt}</figcaption></figure>)}</div>
      </div>
    </details>
    <Lightbox items={viewer.items} index={viewer.index} onChange={index=>setViewer(v=>({...v,index}))}/>
  </section>;
}
