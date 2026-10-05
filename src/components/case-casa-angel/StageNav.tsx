'use client';
import { useEffect, useState } from 'react';
import { E1, E2, E3, E4, stageName } from './data';
import s from './CasaAngel.module.css';
const chapters = [E1, E2, E3, E4];
export function StageNav() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const update = () => {
      let key = '';
      chapters.forEach(c => { if ((document.getElementById(c.key)?.getBoundingClientRect().top ?? Infinity) < innerHeight * .45) key = c.key; });
      setActive(key);
    };
    update(); window.addEventListener('scroll', update, {passive:true});
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <nav className={s.stageNav} aria-label="Etapas del anteproyecto de Casa Ángel">
    {chapters.map((c,i)=><a key={c.key} href={'#'+c.key} aria-current={active===c.key?'location':undefined}><span>0{i+1}</span>{stageName(c)}</a>)}
    <a href="#proyecto">Proyecto ↗</a>
  </nav>;
}
