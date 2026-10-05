import { countries } from './countries';
export function CountryFlag({country, className = ''}: {country:string; className?:string}) {
  const info = countries[country];
  return info ? <span className={'country-flag '+className} role="img" aria-label={'Bandera de '+info.name}>{info.flag}</span> : null;
}
