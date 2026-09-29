import Image from 'next/image';
import s from '../UrbetrackCase.module.css';

const PROVEEDORES = [
  {
    "name": "ABC CONSTRUCCIONES",
    "src": "/images/urbetrack/proveedores/transparentes/ABC CONSTRUCCIONES.png",
    "w": 1254,
    "h": 1254,
    "displayW": 84.1,
    "displayH": 84.1,
    "left": 48.15,
    "top": 2.38
  },
  {
    "name": "BANCHERO",
    "src": "/images/urbetrack/proveedores/transparentes/BANCHERO.png",
    "w": 6252,
    "h": 2500,
    "displayW": 168.32,
    "displayH": 67.31,
    "left": 7.33,
    "top": 11.5
  },
  {
    "name": "GRUPO A2",
    "src": "/images/urbetrack/proveedores/transparentes/GRUPO A2.png",
    "w": 1619,
    "h": 972,
    "displayW": 129.18,
    "displayH": 77.55,
    "left": 23.58,
    "top": 3.27
  },
  {
    "name": "LA EUROPEA",
    "src": "/images/urbetrack/proveedores/transparentes/LA EUROPEA.png",
    "w": 2172,
    "h": 724,
    "displayW": 184.85,
    "displayH": 61.62,
    "left": -3.19,
    "top": 14.96
  },
  {
    "name": "LG",
    "src": "/images/urbetrack/proveedores/transparentes/LG.png",
    "w": 512,
    "h": 512,
    "displayW": 80.19,
    "displayH": 80.19,
    "left": 49.36,
    "top": 4.75
  },
  {
    "name": "LUCCIOLA",
    "src": "/images/urbetrack/proveedores/transparentes/LUCCIOLA.png",
    "w": 2170,
    "h": 725,
    "displayW": 165.1,
    "displayH": 55.16,
    "left": 6.73,
    "top": 15.71
  },
  {
    "name": "MAMPARAL",
    "src": "/images/urbetrack/proveedores/transparentes/MAMPARAL.png",
    "w": 346,
    "h": 90,
    "displayW": 165.25,
    "displayH": 42.99,
    "left": 7.61,
    "top": 23.75
  },
  {
    "name": "SAMSUNG",
    "src": "/images/urbetrack/proveedores/transparentes/SAMSUNG.png",
    "w": 980,
    "h": 980,
    "displayW": 210.19,
    "displayH": 210.19,
    "left": -15.09,
    "top": -60.09
  },
  {
    "name": "VOLTAMPERE",
    "src": "/images/urbetrack/proveedores/transparentes/VOLTAMPERE.png",
    "w": 1254,
    "h": 1254,
    "displayW": 82.68,
    "displayH": 82.68,
    "left": 48.56,
    "top": 4.22
  }
];

export function Proveedores() {
  return (
      <section className={s.providers} data-chapter="Proveedores">
        <div className={s.kicker}>Proveedores</div>
        <div className={s.providerStrip} tabIndex={0} role="region" aria-label="Proveedores del proyecto">
          <div className={s.providerTrack}>
            {[0, 1].map((copy) => (
              <div className={s.providerGroup} key={copy} aria-hidden={copy === 1}>
                {PROVEEDORES.map((provider) => (
                  <div className={s.providerLogo} data-provider={provider.name} key={provider.name}>
                    <Image src={provider.src} alt={provider.name} width={provider.w} height={provider.h} sizes="200px" style={{ width: provider.displayW, height: provider.displayH, left: provider.left, top: provider.top }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
