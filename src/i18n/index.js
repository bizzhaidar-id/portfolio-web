import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import id from './id'

let saved = null
try {
  saved = localStorage.getItem('lang')
} catch {
  // storage unavailable (private mode etc.)
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, id: { translation: id } },
  // English is the default; Indonesian only after the visitor picks it in the navbar.
  lng: saved === 'id' ? 'id' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem('lang', lng)
  } catch {
    // ignore
  }
})
document.documentElement.lang = i18n.language

export default i18n
