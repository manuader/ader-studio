'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Footer } from '@/components/footer/Footer';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import { asset, climate, concepts, drawings, renders, stages } from './data';
import s from './Piaggio.module.css';
import { BrickGallery } from './BrickGallery';
import { ClimateHouse } from './ClimateHouse';
import { ConceptJourney } from './ConceptJourney';
import { DesignJourney } from './DesignJourney';
import { FacadeSequence } from './FacadeSequence';
import { DocumentExplorer } from './DocumentExplorer';
import { SectionViewer,AxoViewer } from './DrawingViewers';
const pad = (n: number) => String(n).padStart(2, '0');
const pdf = '/documentos/casa-piaggio-anteproyecto.pdf';
const sheet = (page: number, alt: string): LightboxItem => ({ src: `/images/casa-piaggio/lamina-${pad(page)}.webp`, w: 1920, h: 1080, alt });
const conceptLabels = ['Grilla', 'Programa', 'Materialidad', 'Patio'];
const groups: { title: string; items: LightboxItem[]; page: number }[] = [
  { title: 'Planta', items: [asset('p19-X90', 'Planta de Casa Piaggio')], page: 19 },
  { title: 'Fachadas', items: [asset('p20-X7', 'Recorrido de fachadas')], page: 20 },
  { title: 'Axonométricas', items: [asset('p21-X10', 'Axonométrica del conjunto'), asset('p21-X4', 'Axonométrica del patio y las terrazas')], page: 21 },
  { title: 'Cortes', items: drawings.slice(3).map(x => sheet(x.page, x.title)), page: 22 },
];
const positions = [[78,0],[46,50],[58,6],[70,30],[40,4],[52,44],[84,8],[44,0],[56,40],[90,5]];
export function PiaggioCase() {
  const root = useRef<HTMLElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const [introOnly,setIntroOnly]=useState(true);
  const [stage, setStage] = useState(0);
  const [weather, setWeather] = useState(0);
  const [concept, setConcept] = useState(0);
  const [group, setGroup] = useState(0);
  const [drawing, setDrawing] = useState(0);
  const [viewer, setViewer] = useState<{items: LightboxItem[]; index: number | null}>({items: [], index: null});
  const open = (items: LightboxItem[], index = 0) => setViewer({items, index});
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.querySelectorAll<HTMLElement>('[data-reveal]').forEach(node => gsap.fromTo(node, {y:30,opacity:.35}, {y:0,opacity:1,duration:1.15,ease:'power3.out',scrollTrigger:{trigger:node,start:'top 94%',once:true}}));
      el.querySelectorAll<HTMLElement>('[data-drift]').forEach((node,i) => gsap.fromTo(node,{y:i%2?18:-18},{y:i%2?-18:18,ease:'none',scrollTrigger:{trigger:node,start:'top bottom',end:'bottom top',scrub:1.2}}));
    }, el);
    const intro=el.querySelector<HTMLElement>('#piaggio-inicio');
    if(intro){const timeline=gsap.timeline({scrollTrigger:{trigger:intro,start:'top top',end:'bottom bottom',scrub:.8}});timeline.fromTo(intro.querySelectorAll('[data-wall-line]'),{strokeDashoffset:1600},{strokeDashoffset:0,duration:1.2,stagger:.012,ease:'none'},0).fromTo(intro.querySelector('h1'),{opacity:0,y:50},{opacity:1,y:0,duration:1},1.7).to(intro.querySelector('[class*="heroImage"]'),{opacity:1,scale:1,duration:1.5},2.8).to(intro.querySelector('[class*="introWall"]'),{opacity:0,duration:1},2.8);}
    let frame = 0;
    const update = () => { frame=0; setIntroOnly(scrollY<innerHeight*.2); let selected=0; stages.forEach((item,i) => {const n=document.getElementById(item.id); if(n && n.getBoundingClientRect().top<innerHeight*.45) selected=i;}); setStage(selected); };
    const onScroll = () => {if(!frame) frame=requestAnimationFrame(update);};
    update(); window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll);
    return () => {mm.revert();cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);};
  }, []);
  useEffect(() => {
    const node=nav.current;if(!node)return;
    const update=()=>{const link=node.querySelectorAll('a')[stage];if(link){node.style.setProperty('--pill-left',`${link.offsetLeft}px`);node.style.setProperty('--pill-width',`${link.offsetWidth}px`);}};
    update();const observer=new ResizeObserver(update);observer.observe(node);return()=>observer.disconnect();
  },[stage]);
  const picture=(item:LightboxItem,priority=false)=><Image src={item.src} alt={item.alt} width={item.w} height={item.h} sizes="(max-width: 760px) 92vw, 85vw" priority={priority}/>;
  const memory=(text:string)=><details className={s.memory}><summary>Leer la memoria <span aria-hidden>+</span></summary><p>{text}</p></details>;
  const heading=(i:number,title:ReactNode,line:string)=><header className={s.heading} data-reveal><span className={s.eyebrow}>{pad(i+1)} / {stages[i].short}</span><h2>{title}</h2><p>{line}</p></header>;
  const current=groups[group];
  return <>
    <SiteNav initialContext="Casa Piaggio"/>
    <main ref={root} className={s.page}>
      <nav className={s.stageNav} aria-label="Etapas del anteproyecto"><a className={s.navBrand} href="#piaggio-inicio" aria-label="Casa Piaggio, inicio">CP</a><div className={s.navLinks} ref={nav}><span className={s.navPill} aria-hidden/>{stages.map((item,i)=><a key={item.id} href={`#${item.id}`} aria-current={stage===i?'location':undefined}><span>{pad(i+1)}</span>{['Investigar','Concepto','Diseño','Habitar'][i]}</a>)}</div><a className={s.navPdf} href={pdf} target="_blank" rel="noopener noreferrer">PDF ↗</a></nav>
      <div className={s.introJourney} id="piaggio-inicio"><section className={`${s.section} ${s.hero}`} aria-labelledby="piaggio-title"><div className={s.introWall} aria-hidden><svg viewBox="0 0 1440 960" preserveAspectRatio="none">{Array.from({length:13},(_,row)=><g key={row}><path data-wall-line d={`M0 ${row*80}H1440`}/>{Array.from({length:8},(_,col)=>{const x=(col-1)*240+(row%2?120:0);return <path data-wall-line key={col} d={`M${x} ${row*80}v80M${x+160} ${row*80}v80`}/>;})}</g>)}</svg></div> <div className={s.heroTop}><Link href="/proyectos">← Proyectos</Link><span>Residencial · Anteproyecto · 2026</span></div><div className={s.heroImage}>{picture({src:'/images/casa-piaggio/acceso-portada-final.png',w:2048,h:1152,alt:'Acceso a Casa Piaggio: volúmenes de ladrillo unidos por hormigón'},true)}<span className={s.heroBricks} aria-hidden>{Array.from({length:30},(_,i)=>{const row=Math.floor(i/5),col=i%5;const left=col%2===0?Math.floor(col/2)*50:Math.floor(col/2)*50+33.333;return <i key={i} style={{'--delay':`${i*25}ms`,left:`${left-(row%2?25:0)}%`,top:`${row*100/6}%`,width:`${col%2===0?33.333:16.667}%`,height:`${100/6}%`} as CSSProperties}/>;})}</span></div><div className={s.heroTitle}><h1 id="piaggio-title">Casa<br/>Piaggio</h1><p><span>ADER Studio</span>Dos cuerpos. Un patio.</p></div><a className={s.begin} style={{opacity:introOnly?0:1}} href="#investigacion" aria-label="Comenzar el recorrido">↓</a></section></div>
      <div id="investigacion" className={s.researchJourney}><section className={`${s.section} ${s.research}`}>
        {heading(0,<>Investigación y diagnóstico</>,'Escuchar el lugar. Encontrar una regla.')}
        <ClimateHouse onOpen={open}/>
      </section></div>
      <section id="concepto" className={`${s.section} ${s.concept}`}>
        <ConceptJourney onOpen={open}/>
      </section>
      <section id="desarrollo" className={`${s.section} ${s.development}`}>
        <DesignJourney onOpen={open}/>
      </section>
      <section id="experiencia" className={`${s.section} ${s.experience}`}>

        <BrickGallery onOpen={open}/>{memory('Los renders exploran cómo se habitaría la propuesta. La luz, la relación con el jardín y la convivencia del ladrillo, el hormigón y la madera permiten volver a mirar las decisiones del proyecto. Cada imagen es una nueva pregunta sobre la experiencia de la casa.')}
      </section>
      <section className={`${s.section} ${s.closing}`}><span className={s.eyebrow}>Un estado del proceso</span><h2>La investigación<br/>continúa.</h2><a className={s.pdfButton} href={pdf} target="_blank" rel="noopener noreferrer">Explorar la entrega <span>35 páginas ↗</span></a><div className={s.closingLinks}><Link href="/#contacto">Conversemos sobre tu proyecto ↗</Link><Link href="/proyectos">← Volver a proyectos</Link></div></section>
    </main><Footer/><Lightbox items={viewer.items} index={viewer.index} onChange={index=>setViewer(v=>({...v,index}))}/>
  </>;
}
