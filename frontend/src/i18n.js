import fr from "./locales/fr.json"
import VueI18n from "@/libs/vue-i18n"

export default new VueI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    legacy: false,
    globalInjection: true,
    messages: {"fr": fr},
    numberFormats: {
        'en': {
            currency: {
                style: 'currency',
                currency: 'USD'
            }
        },
        'fr': {
            currency: {
                style: 'currency',
                currency: 'EUR'
            }
        },
        'tr': {
            currency: {
                style: 'currency',
                currency: 'TRY'
            }
        },
        'zh': {
            currency: {
                style: 'currency',
                currency: 'CNY'
            }
        }
    }
})

export const SUPPORTED_LOCALES = ['fr', 'en', 'tr', 'zh', 'ru']