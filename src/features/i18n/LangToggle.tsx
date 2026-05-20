import { useI18n } from '../../hooks/useI18n'

export function LangToggle() {
  const { lang, toggleLang } = useI18n()

  return (
    <button
      onClick={toggleLang}
      className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      aria-label={lang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
    >
      {lang === 'tr' ? 'EN' : 'TR'}
    </button>
  )
}
