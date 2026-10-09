import gsap from 'gsap';

/**
 * Sonar für die runden Buttons: drei sehr feine, leicht weichgezeichnete Ringe gehen nacheinander vom Button aus,
 * wachsen nur wenige Pixel (unter einem Zentimeter) und blenden dabei sanft ein und wieder aus.
 * Gezeichnet als kleines SVG genau um den Button – es liegt nichts über dem restlichen Bereich.
 * Läuft nur, solange der Button im Bild ist.
 */
const NS = 'http://www.w3.org/2000/svg';
const RINGE = 3;
const REICHWEITE = 30; // px über den Buttonrand hinaus (≈ 0,8 cm)
const RAND = 10; // Platz für die Weichzeichnung

interface Sonar {
  button: HTMLElement;
  zone: HTMLElement;
  svg: SVGSVGElement;
  gruppe: SVGGElement;
  filter: SVGFilterElement;
  ringe: SVGCircleElement[];
  tweens: gsap.core.Timeline[];
}

const reduziert = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let zaehler = 0;

function bauen(button: HTMLElement): Sonar | null {
  const zone = button.closest<HTMLElement>('[data-sonar-zone]');
  if (!zone) return null;
  const id = `sonar-weich-${zaehler++}`;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;pointer-events:none;z-index:1;overflow:visible';

  const defs = document.createElementNS(NS, 'defs');
  const filter = document.createElementNS(NS, 'filter');
  filter.setAttribute('id', id);
  filter.setAttribute('filterUnits', 'userSpaceOnUse');
  const blur = document.createElementNS(NS, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '1.4');
  filter.appendChild(blur);
  defs.appendChild(filter);
  svg.appendChild(defs);

  const gruppe = document.createElementNS(NS, 'g');
  gruppe.setAttribute('filter', `url(#${id})`);
  svg.appendChild(gruppe);

  const farbe = button.dataset.sonar || '#fed715';
  const ringe = Array.from({ length: RINGE }, () => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke', farbe);
    c.setAttribute('stroke-width', '1.8');
    c.style.opacity = '0';
    gruppe.appendChild(c);
    return c;
  });
  zone.appendChild(svg);
  return { button, zone, svg, gruppe, filter, ringe, tweens: [] };
}

/** Position und Größe um den Button neu messen und die Ringe neu aufziehen (bei Größenänderung). */
function messen(s: Sonar) {
  s.tweens.forEach((t) => t.kill());
  s.tweens = [];

  const b = s.button.getBoundingClientRect();
  const z = s.zone.getBoundingClientRect();
  if (b.width === 0 || z.width === 0) {
    s.svg.style.display = 'none';
    return;
  }
  s.svg.style.display = '';

  const r0 = b.width / 2;
  const groesse = 2 * (r0 + REICHWEITE + RAND);
  const cx = b.left - z.left + b.width / 2;
  const cy = b.top - z.top + b.height / 2;
  s.svg.style.left = `${cx - groesse / 2}px`;
  s.svg.style.top = `${cy - groesse / 2}px`;
  s.svg.setAttribute('width', String(groesse));
  s.svg.setAttribute('height', String(groesse));
  s.svg.setAttribute('viewBox', `0 0 ${groesse} ${groesse}`);
  s.filter.setAttribute('x', '0');
  s.filter.setAttribute('y', '0');
  s.filter.setAttribute('width', String(groesse));
  s.filter.setAttribute('height', String(groesse));
  const m = groesse / 2;

  const dauer = 3.6;
  s.ringe.forEach((ring, i) => {
    ring.setAttribute('cx', String(m));
    ring.setAttribute('cy', String(m));
    if (reduziert()) {
      ring.setAttribute('r', String(r0 + 8 + i * 9));
      ring.style.opacity = String(0.3 - i * 0.08);
      return;
    }
    // Radius wächst nur um die Reichweite; die Deckkraft blendet weich ein und läuft langsam wieder aus.
    const tl = gsap.timeline({ repeat: -1, delay: (dauer / RINGE) * i });
    tl.fromTo(ring, { attr: { r: r0 + 1 } }, { attr: { r: r0 + REICHWEITE }, duration: dauer, ease: 'sine.out' }, 0);
    tl.fromTo(ring, { opacity: 0 }, { opacity: 0.58, duration: dauer * 0.22, ease: 'sine.out' }, 0);
    tl.to(ring, { opacity: 0, duration: dauer * 0.78, ease: 'sine.inOut' }, dauer * 0.22);
    s.tweens.push(tl);
  });
}

export function sonarStarten() {
  const alle = Array.from(document.querySelectorAll<HTMLElement>('[data-sonar]'))
    .map(bauen)
    .filter((s): s is Sonar => Boolean(s));
  if (!alle.length) return;

  const neuMessen = () => alle.forEach(messen);
  neuMessen();
  window.addEventListener('load', neuMessen, { once: true });
  let wartet = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(wartet);
    wartet = window.setTimeout(neuMessen, 160);
  });

  if (reduziert() || !('IntersectionObserver' in window)) return;
  const beobachter = new IntersectionObserver(
    (eintraege) => {
      eintraege.forEach((e) => {
        alle
          .filter((x) => x.button === e.target)
          .forEach((s) => s.tweens.forEach((t) => (e.isIntersecting ? t.resume() : t.pause())));
      });
    },
    { rootMargin: '80px 0px' },
  );
  alle.forEach((s) => beobachter.observe(s.button));
}
