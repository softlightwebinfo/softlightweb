import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    localePath: typeof window === "undefined" ? "public/locales" : "locales",
    browserLanguageDetection: true,
    otherLanguages: ['es'],
    keySeparator: false,
    localeSubpaths: {
        en: 'en',
        es: 'es'
    }, // locale subpaths for url could be none, foreign or all
});
export default NextI18NextInstance

/* Optionally, export class methods as named exports */
export const {
    appWithTranslation,
    withTranslation,
    Link,
    Router,
} = NextI18NextInstance;
