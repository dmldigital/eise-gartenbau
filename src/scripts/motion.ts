import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { sonarStarten } from './sonar';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduziert = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lenis als globaler Scroll-Treiber. Laeuft ueber den echten Fenster-Scroll,
 * damit der bestehende Header-Scrollmechanismus (window.scrollY) unveraendert
 * weiterarbeitet. ScrollTrigger wird bei jedem Lenis-Frame aktualisiert.
 */
export function scrollStarten() {
  if (reduziert()) return null;

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch bleibt nativ: auf Mobile fuehlt sich erzwungenes Smoothing traege an
    // und die gepinnten Sektionen laufen ohne Zusatzlogik fluessiger.
    syncTouch: false,
  });

  // Das globale `scroll-smooth` am <html> wuerde gegen Lenis arbeiten
  // (zwei konkurrierende Scroll-Interpolationen).
  document.documentElement.style.scrollBehavior = 'auto';

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anker-Links (#faq, #kontakt, …) muessen ueber Lenis laufen, sonst springt
  // die Seite hart und ScrollTrigger verliert den Fortschritt.
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const ziel = link?.getAttribute('href');
    if (!link || !ziel || ziel === '#') return;
    const element = document.querySelector<HTMLElement>(ziel);
    if (!element) return;
    event.preventDefault();
    lenis.scrollTo(element, { offset: -110 });
  });

  return lenis;
}

/** Zeilenweises Reveal hinter einer Maske — der Standard fuer alle Headlines. */
export function zeilenReveal(selektor = '[data-reveal="lines"]') {
  const elemente = gsap.utils.toArray<HTMLElement>(selektor);
  if (!elemente.length) return;

  if (reduziert()) {
    gsap.set(elemente, { autoAlpha: 1 });
    return;
  }

  // Erst hier verstecken, nicht im Markup: ohne JavaScript bleiben alle
  // Ueberschriften normal lesbar.
  gsap.set(elemente, { autoAlpha: 0 });

  const aufbauen = () => {
    elemente.forEach((element) => {
      // Sichtbar schalten passiert immer — auch wenn das Splitten scheitert,
      // darf keine Ueberschrift unsichtbar stehen bleiben.
      try {
        const split = new SplitText(element, { type: 'lines', mask: 'lines', linesClass: 'zeile' });
        gsap.set(element, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 112,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      } catch {
        gsap.set(element, { autoAlpha: 1 });
      }
    });
    ScrollTrigger.refresh();
  };

  // Erst nach dem Laden der Webfonts splitten, sonst sitzen die Zeilenumbrueche
  // auf den Fallback-Metriken und springen beim Fontwechsel.
  if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(aufbauen).catch(aufbauen);
  else aufbauen();
}

/** Weiches Aufsteigen fuer Fliesstext, Listen und Karten. */
export function stufenReveal(selektor = '[data-reveal="up"]') {
  const elemente = gsap.utils.toArray<HTMLElement>(selektor);
  if (!elemente.length) return;

  if (reduziert()) {
    gsap.set(elemente, { autoAlpha: 1, y: 0 });
    return;
  }

  elemente.forEach((element) => {
    const kinder = element.hasAttribute('data-reveal-kinder')
      ? gsap.utils.toArray<HTMLElement>(element.children)
      : [element];

    gsap.set(kinder, { autoAlpha: 0, y: 36 });
    gsap.to(kinder, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
  });
}

/**
 * Bild-Reveal: der Rahmen gibt das Motiv von unten frei, das Motiv selbst
 * laeuft danach langsamer als die Seite (Innen-Parallax).
 */
export function bildReveal(selektor = '[data-reveal-image]') {
  const rahmen = gsap.utils.toArray<HTMLElement>(selektor);
  if (!rahmen.length) return;

  rahmen.forEach((wrapper) => {
    const bild = wrapper.querySelector<HTMLElement>('img, video');
    if (!bild) return;

    if (reduziert()) {
      gsap.set(wrapper, { clipPath: 'none' });
      return;
    }

    gsap.fromTo(
      wrapper,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: wrapper, start: 'top 90%', once: true },
      },
    );

    const weite = Number(wrapper.dataset.parallax || 12);
    gsap.set(bild, { scale: 1.18, transformOrigin: 'center center' });
    gsap.fromTo(
      bild,
      { yPercent: -weite / 2 },
      {
        yPercent: weite / 2,
        ease: 'none',
        scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/** Fortschrittsbalken am oberen Rand. */
export function leseFortschritt(selektor = '[data-scroll-progress]') {
  const balken = document.querySelector<HTMLElement>(selektor);
  if (!balken) return;

  gsap.set(balken, { scaleX: 0, transformOrigin: '0% 50%' });
  ScrollTrigger.create({
    start: 0,
    end: () => document.documentElement.scrollHeight - window.innerHeight,
    invalidateOnRefresh: true,
    onUpdate: (self) => gsap.set(balken, { scaleX: self.progress }),
  });
}

/** Sticky-Sprungnavigation: markiert den Abschnitt, in dem man gerade liest. */
export function abschnittsSpion(navSelektor = '[data-subnav]') {
  const nav = document.querySelector<HTMLElement>(navSelektor);
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  if (!links.length) return;

  const markiere = (aktiv: HTMLAnchorElement | null) =>
    links.forEach((link) => link.setAttribute('aria-current', String(link === aktiv)));

  links.forEach((link) => {
    const abschnitt = document.querySelector<HTMLElement>(link.getAttribute('href') as string);
    if (!abschnitt) return;
    ScrollTrigger.create({
      trigger: abschnitt,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => self.isActive && markiere(link),
    });
  });

  markiere(links[0]);
}

/** Sammelstart fuer die Unterseiten. */
export function unterseiteStarten() {
  scrollStarten();
  zeilenReveal();
  stufenReveal();
  bildReveal();
  leseFortschritt();
  abschnittsSpion();
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

const feinerZeiger = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Hero-Auftakt: Zeilen laufen aus der Maske, die drei Bildstreifen öffnen sich
 * nacheinander von unten und setzen sich aus einem leichten Zoom.
 */
export function heroAuftakt() {
  const titel = document.querySelector<HTMLElement>('[data-hero-title]');
  const kicker = document.querySelector<HTMLElement>('[data-hero-kicker]');
  const linie = document.querySelector<HTMLElement>('[data-hero-rule]');
  const text = document.querySelector<HTMLElement>('[data-hero-text]');
  const knopf = document.querySelector<HTMLElement>('[data-hero-cta]');
  const felder = gsap.utils.toArray<HTMLElement>('[data-hero-panel]');
  const kopf = document.querySelector<HTMLElement>('[data-site-header]');
  const tab = document.querySelector<HTMLElement>('[data-logo-tab]');
  if (!titel || reduziert()) return;

  gsap.set([kicker, text, knopf].filter(Boolean), { autoAlpha: 0, y: 28 });
  gsap.set(linie, { scaleX: 0, transformOrigin: '0% 50%' });
  gsap.set(titel, { autoAlpha: 0 });
  gsap.set(felder, { clipPath: 'inset(100% 0% 0% 0%)' });
  if (kopf) gsap.set(kopf, { autoAlpha: 0 });
  if (tab) gsap.set(tab, { yPercent: -110 });

  const starten = () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (kopf) tl.to(kopf, { autoAlpha: 1, duration: 0.9, ease: 'power2.out' }, 0);
    if (tab) tl.to(tab, { yPercent: 0, duration: 1.4, ease: 'expo.out' }, 0.35);
    tl.to(felder, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, stagger: 0.14 }, 0.05);
    felder.forEach((feld, i) => {
      const bild = feld.querySelector('img');
      if (bild) tl.fromTo(bild, { scale: 1.28 }, { scale: 1, duration: 2.1, ease: 'expo.out' }, 0.05 + i * 0.14);
    });
    if (kicker) tl.to(kicker, { autoAlpha: 1, y: 0, duration: 1 }, 0.2);
    try {
      const split = new SplitText(titel, { type: 'lines', mask: 'lines', linesClass: 'zeile' });
      gsap.set(titel, { autoAlpha: 1 });
      tl.from(split.lines, { yPercent: 112, duration: 1.3, stagger: 0.11 }, 0.3);
    } catch {
      gsap.set(titel, { autoAlpha: 1 });
    }
    if (linie) tl.to(linie, { scaleX: 1, duration: 1.1 }, 0.75);
    if (text) tl.to(text, { autoAlpha: 1, y: 0, duration: 1 }, 0.85);
    if (knopf) tl.to(knopf, { autoAlpha: 1, y: 0, duration: 1 }, 1);
    tl.add(() => ScrollTrigger.refresh(), '>');
  };
  if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(starten).catch(starten);
  else starten();
}

/** Große Hintergrundbilder laufen beim Scrollen langsamer als die Seite. */
export function hintergrundParallax(selektor = '[data-parallax-bg]') {
  if (reduziert()) return;
  gsap.utils.toArray<HTMLElement>(selektor).forEach((bild) => {
    const weite = Number(bild.dataset.parallaxBg || 8);
    gsap.fromTo(
      bild,
      { yPercent: -weite },
      { yPercent: weite, ease: 'none', scrollTrigger: { trigger: bild.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

/** Runde Buttons folgen dem Zeiger ein Stück – nur mit Maus, nie auf dem Telefon. */
export function magnetisch(selektor = '[data-magnet]') {
  if (reduziert() || !feinerZeiger()) return;
  gsap.utils.toArray<HTMLElement>(selektor).forEach((knopf) => {
    const x = gsap.quickTo(knopf, 'x', { duration: 0.7, ease: 'power3.out' });
    const y = gsap.quickTo(knopf, 'y', { duration: 0.7, ease: 'power3.out' });
    knopf.addEventListener('pointermove', (e) => {
      const r = knopf.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.28);
      y((e.clientY - (r.top + r.height / 2)) * 0.28);
    });
    knopf.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

/** Sammelstart der Startseite. */
export function homeStarten() {
  if (!feinerZeiger()) ScrollTrigger.config({ ignoreMobileResize: true });
  scrollStarten();
  heroAuftakt();
  zeilenReveal();
  stufenReveal();
  bildReveal();
  hintergrundParallax();
  magnetisch();
  sonarStarten();
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
