import { createI18n } from 'vue-i18n';
import uz from './uz.json';
import ru from './ru.json';
import en from './en.json';
import { storage } from '../utils/storage';

const savedLocale = storage.get('marketplace_locale', 'uz');

export const SUPPORTED_LOCALES = [
  { code: 'uz', name: 'Oʻzbekcha', short: 'UZ' },
  { code: 'ru', name: 'Русский', short: 'RU' },
  { code: 'en', name: 'English', short: 'EN' }
];

export const i18n = createI18n({
  legacy: true, // Options API support
  locale: savedLocale,
  fallbackLocale: 'uz',
  messages: {
    uz,
    ru,
    en
  }
});

export const setAppLocale = (locale) => {
  if (['uz', 'ru', 'en'].includes(locale)) {
    i18n.global.locale = locale;
    storage.set('marketplace_locale', locale);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
    }
  }
};
