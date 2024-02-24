'use client'

import { useAppStore } from '@/stores/app'

export function useTheme() {
  const { theme, setTheme } = useAppStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))

  return { theme, setTheme }
}
