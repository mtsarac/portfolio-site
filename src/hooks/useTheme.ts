import { useContext } from 'react'
import { ThemeContext } from '../features/theme/ThemeProvider'
import type { ThemeContextType } from '../features/theme/ThemeProvider'

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
