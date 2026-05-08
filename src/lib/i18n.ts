// Translation scaffold for future Rwanda / pan-African expansion. The site
// ships in English; French, Kinyarwanda and Swahili stubs are included so
// the routing + copy layer can be wired up without a refactor when locales
// go live.

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'rw', label: 'Kinyarwanda' },
  { code: 'sw', label: 'Kiswahili' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';

type Dict = Record<string, string>;

const dictionaries: Record<LocaleCode, Dict> = {
  en: {
    'nav.shop': 'Shop',
    'nav.collections': 'Collections',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'cta.shop': 'Shop the collection',
    'cta.add_to_bag': 'Add to bag',
    'cta.view_all': 'View all',
  },
  fr: {
    'nav.shop': 'Boutique',
    'nav.collections': 'Collections',
    'nav.about': 'Notre histoire',
    'nav.contact': 'Contact',
    'cta.shop': 'Découvrir la collection',
    'cta.add_to_bag': 'Ajouter au panier',
    'cta.view_all': 'Tout voir',
  },
  rw: {
    'nav.shop': 'Igurisha',
    'nav.collections': 'Amakoleksiyo',
    'nav.about': 'Inkuru yacu',
    'nav.contact': 'Twandikire',
    'cta.shop': 'Reba ikoleksiyo',
    'cta.add_to_bag': 'Shyira mu gakapu',
    'cta.view_all': 'Reba byose',
  },
  sw: {
    'nav.shop': 'Duka',
    'nav.collections': 'Mikusanyiko',
    'nav.about': 'Hadithi yetu',
    'nav.contact': 'Wasiliana',
    'cta.shop': 'Tazama mkusanyiko',
    'cta.add_to_bag': 'Weka kwenye begi',
    'cta.view_all': 'Tazama yote',
  },
};

export function t(key: string, locale: LocaleCode = DEFAULT_LOCALE) {
  return dictionaries[locale]?.[key] ?? dictionaries.en[key] ?? key;
}
