import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from 'static/locales/ru.json'
import en from 'static/locales/en.json'

const resources = {
  en: JSON.stringify(en),
  ru: JSON.stringify(ru)
}

i18n
  .use(initReactI18next)
  init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n