import {notFound} from 'next/navigation';
import Study from './study';
export default function Page(){if(process.env.NODE_ENV!=='development')notFound();return <Study/>;}
