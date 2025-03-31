import fr from "./locales/fr.json"
import VueI18n from "@/libs/vue-i18n"

export default new VueI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    legacy: false,
    globalInjection: true,
    messages: {"fr": fr},
    numberFormats: {
        'en-US': {
            currency: {
                style: 'currency',
                currency: 'USD'
            }
        },
        'fr-FR': {
            currency: {
                style: 'currency',
                currency: 'EUR'
            }
        }
    }
})

export const SUPPORTED_LOCALES = ['fr', 'en']