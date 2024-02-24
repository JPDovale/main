'use client'

import { useAppStore } from '@/stores/app'

export function useLanguage() {
  const { language, setLanguage } = useAppStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
  }))

  return { language, setLanguage }
}
