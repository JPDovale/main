'use client'
import { Language, Theme, useAppStore } from '@/stores/app'
import { CookiesKeys, useCookies } from './useCookies'
import { useEffect } from 'react'

export function usePreload() {
  const { get } = useCookies()
  const { setTheme, isLoadingApp, setLanguage } = useAppStore((state) => ({
    setTheme: state.setTheme,
    isLoadingApp: state.isLoading,
    setLanguage: state.setLanguage,
  }))

  useEffect(() => {
    if (isLoadingApp) {
      const theme = get<Theme>(CookiesKeys.THEME) ?? Theme.LIGHT
      const language =
        get<Language>(CookiesKeys.LANGUAGE) ?? Language.PORTUGUESE_BR

      setTheme(theme)
      setLanguage(language)
    }
  }, [get, setTheme, setLanguage, isLoadingApp])

  const isLoading = isLoadingApp

  return { isLoading }
}
