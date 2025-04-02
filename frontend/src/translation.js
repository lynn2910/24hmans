import i18n, {SUPPORTED_LOCALES} from '@/i18n'
import {nextTick} from "vue";

export const DEFAULT_LOCALE = 'fr';

const actions = {
    async switchLanguage(newLocale) {
        await actions.loadLocaleMessages(newLocale)
        actions.currentLocale = newLocale
        i18n.locale = newLocale;
        document.querySelector("html").setAttribute("lang", newLocale)
        localStorage.setItem("user-locale", newLocale)
    },
    async loadLocaleMessages(locale) {
        if (!i18n.availableLocales.includes(locale)) {
            const messages = await import(`@/locales/${locale}.json`)
            i18n.setLocaleMessage(locale, messages.default);
        }

        return nextTick()
    },

    get defaultLocale() {
        return DEFAULT_LOCALE;
    },

    get supportedLocales() {
        return SUPPORTED_LOCALES
    },

    isLocaleSupported(locale) {
        return actions.supportedLocales.includes(locale)
    },
    getUserLocale() {
        const locale = window.navigator.language || window.navigator.userLanguage || actions.defaultLocale
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() {
        const persistedLocale = localStorage.getItem("user-locale")
        if (actions.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },


    guessDefaultLocale() {
        const userPersistedLocale = actions.getPersistedLocale()
        if (userPersistedLocale) {
            return userPersistedLocale
        }
        const userPreferredLocale = actions.getUserLocale()
        if (actions.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (actions.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return actions.defaultLocale
    },

    async routeMiddleware(to, _from, next) {
        if (to.path.startsWith('/public')) return next();

        const paramLocale = to.params.locale
        if (!actions.isLocaleSupported(paramLocale)) {
            return next(actions.guessDefaultLocale())
        }
        await actions.switchLanguage(paramLocale)
        return next()
    },
}

export default actions;