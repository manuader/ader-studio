'use client';
import {useState} from 'react';
import OrbitalModel from '@/components/case-casa-piaggio/OrbitalModel';
export default function Study(){const [angle,setAngle]=useState(45);return <main style={{background:'white',padding:0}}><nav>{[0,15,30,45,60,75,90].map(a=><button key={a} onClick={()=>setAngle(a)} style={{padding:15}}>{a} grados</button>)}</nav><div id="capture"><OrbitalModel angle={angle}/></div></main>;}
