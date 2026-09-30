'use client';
import { useState } from 'react';
import Image from 'next/image';
import docs from './documentation.json';
import type { LightboxItem } from '@/components/portfolio/shared/Lightbox';
import s from './DocumentExplorer.module.css';
export function DocumentExplorer({onOpen}:{onOpen:(items:LightboxItem[],index:number)=>void}) {
  const [page,setPage]=useState(0);
  const [piece,setPiece]=useState(0);
  const doc=docs[page];
  const change=(index:number)=>{setPage((index+docs.length)%docs.length);setPiece(0);};
  return <details className={s.explorer}><summary>Explorar toda la documentación <span>35 hojas ↗</span></summary><div className={s.content}>
    <label htmlFor="document-page">Elegir hoja del PDF</label><div className={s.navigation}><button type="button" onClick={()=>change(page-1)} aria-label="Hoja anterior">←</button><select id="document-page" value={page} onChange={e=>change(Number(e.target.value))}>{docs.map((d,i)=><option key={d.page} value={i}>{String(d.page).padStart(2,'0')} · {d.title}</option>)}</select><button type="button" onClick={()=>change(page+1)} aria-label="Hoja siguiente">→</button></div>
    <div className={s.stage} key={page}>{doc.items.map((item,i)=><button type="button" key={item.src} className={`${s.piece} ${i===piece?s.active:''}`} aria-hidden={i!==piece} tabIndex={i===piece?0:-1} aria-label={`Ampliar pieza ${i+1}: ${doc.title}`} onClick={()=>onOpen(doc.items,i)}><Image src={item.src} alt={item.alt} width={item.w} height={item.h} sizes="90vw"/></button>)}</div>
    <div className={s.bottom}><div className={s.pieces}>{doc.items.map((item,i)=><button type="button" key={item.src} onClick={()=>setPiece(i)} aria-pressed={piece===i}>Pieza {i+1}</button>)}</div><button type="button" onClick={()=>onOpen([doc.sheet],0)}>Ver hoja completa ↗</button></div>
  </div></details>;
}
