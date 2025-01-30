import fr from "./locales/fr.json"
import VueI18n from "@/libs/vue-i18n"

export default new VueI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {"fr": fr},
})

export const SUPPORTED_LOCALES = ['fr', 'en']