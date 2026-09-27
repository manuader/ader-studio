/**
 * La intro del logo se ve una sola vez; después solo al hacer click en el logo
 * de la navbar. `html.intro-skip` la oculta (y muestra el logo de la navbar)
 * antes del primer pintado: lo pone el script del <head> en la carga inicial y
 * la intro misma en navegaciones del lado del cliente.
 */
export const SKIP_CLASS = 'intro-skip';
const SEEN_KEY = 'ader-intro-seen';
const REPLAY_KEY = 'ader-intro-replay';
export const REPLAY_EVENT = 'replay-intro';

/** Script inline del <head>: decide antes de pintar si la intro se saltea. */
export const introSkipScript = `try{if(localStorage.getItem('${SEEN_KEY}')&&!sessionStorage.getItem('${REPLAY_KEY}'))document.documentElement.classList.add('${SKIP_CLASS}')}catch(e){}`;

/**
 * ¿Hay que reproducir la intro? 'first' = primera visita (espera interacción),
 * 'replay' = pedida desde el logo (arranca sola). Consume el pedido de replay.
 */
export function introMode(): 'first' | 'replay' | null {
  try {
    const replay = sessionStorage.getItem(REPLAY_KEY);
    sessionStorage.removeItem(REPLAY_KEY);
    if (replay) return 'replay';
    return localStorage.getItem(SEEN_KEY) ? null : 'first';
  } catch {
    // Sin storage (modo privado estricto): mejor no trabar la navegación.
    return null;
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {}
}

/** Click en el logo de la navbar: pide la intro para la próxima carga de la home. */
export function requestIntroReplay() {
  try {
    sessionStorage.setItem(REPLAY_KEY, '1');
  } catch {}
}
