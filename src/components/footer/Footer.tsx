import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Ader Studio — Ezequiel Ader Arquitecto</span>
      <div className={styles.links}>
        <a href="#vision">Estudio</a>
        <a href="#bim">BIM</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </div>
      <span>Buenos Aires · Weimar</span>
    </footer>
  );
}
