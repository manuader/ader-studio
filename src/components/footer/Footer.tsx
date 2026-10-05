import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Arquitecto Ader Ezequiel</span>
      <div className={styles.links}>
        <a href="/#vision">Estudio</a>
        <a href="/#bim">BIM</a>
        <a href="/proyectos">Proyectos</a>
        <a href="/fotografia">Fotografía</a>
        <a href="/#contacto">Contacto</a>
      </div>
      <span>Buenos Aires, Argentina</span>
    </footer>
  );
}
