// Simple i18n setup
export const translations = {
  en: {
    loading: 'Loading...',
    personalHomepage: 'Personal homepage',
    socialMediaLinks: 'Social media links',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
    toggleDarkMode: 'Toggle dark mode (⌘+D)',
    visitLink: 'Visit {name} (opens in new window)',
    builtWith: 'Built with React, TypeScript & Tailwind CSS',
    pressShortcut: 'Press ⌘+D to toggle theme'
  },
  es: {
    loading: 'Cargando...',
    personalHomepage: 'Página personal',
    socialMediaLinks: 'Enlaces de redes sociales',
    switchToLightMode: 'Cambiar a modo claro',
    switchToDarkMode: 'Cambiar a modo oscuro',
    toggleDarkMode: 'Alternar modo oscuro (⌘+D)',
    visitLink: 'Visitar {name} (se abre en nueva ventana)',
    builtWith: 'Construido con React, TypeScript y Tailwind CSS',
    pressShortcut: 'Presiona ⌘+D para alternar tema'
  },
  fr: {
    loading: 'Chargement...',
    personalHomepage: 'Page d\'accueil personnelle',
    socialMediaLinks: 'Liens de réseaux sociaux',
    switchToLightMode: 'Passer au mode clair',
    switchToDarkMode: 'Passer au mode sombre',
    toggleDarkMode: 'Basculer le mode sombre (⌘+D)',
    visitLink: 'Visiter {name} (s\'ouvre dans une nouvelle fenêtre)',
    builtWith: 'Construit avec React, TypeScript et Tailwind CSS',
    pressShortcut: 'Appuyez sur ⌘+D pour basculer le thème'
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

// Simple translation function
export const t = (key: TranslationKey, lang: Language = 'en', params?: Record<string, string>): string => {
  let text = translations[lang]?.[key] || translations.en[key];
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
  }
  
  return text;
};

// Language detection
export const detectLanguage = (): Language => {
  const saved = localStorage.getItem('language') as Language;
  if (saved && translations[saved]) return saved;
  
  const browserLang = navigator.language.split('-')[0] as Language;
  return translations[browserLang] ? browserLang : 'en';
}; 