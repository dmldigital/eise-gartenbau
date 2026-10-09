import type { ServiceDetailContent } from '../types/service-detail';
import { leistungenA } from './leistungen-a';
import { leistungenB } from './leistungen-b';

/** Alle Leistungsseiten, Schlüssel = Pfad ohne /leistungen/ und ohne Slashes am Rand (z. B. 'pools/chlorpool'). */
export const services: Record<string, ServiceDetailContent> = { ...leistungenA, ...leistungenB };
