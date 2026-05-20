import { useContext } from 'react'
import { I18nContext } from '../features/i18n/I18nProvider'
import type { I18nContextType } from '../features/i18n/I18nProvider'

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
