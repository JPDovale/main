'use client'
import { Language, Theme, useAppStore } from '@/stores/app'
import { CookiesKeys, useCookies } from './useCookies'
import { useEffect } from 'react'
import type { User } from 'firebase/auth'
import { useFirebaseStore } from '@/stores/firebase'

export function usePreload() {
  const { get } = useCookies()
  const { setTheme, isLoadingApp, setLanguage } = useAppStore((state) => ({
    setTheme: state.setTheme,
    isLoadingApp: state.isLoading,
    setLanguage: state.setLanguage,
  }))

  const { setUser } = useFirebaseStore((state) => ({
    setUser: state.setUser,
  }))

  useEffect(() => {
    if (isLoadingApp) {
      const theme = get<Theme>(CookiesKeys.THEME) ?? Theme.LIGHT
      const user = JSON.parse(get<string>(CookiesKeys.USER) ?? 'null') as User

      const language =
        get<Language>(CookiesKeys.LANGUAGE) ?? Language.PORTUGUESE_BR

      setTheme(theme)
      setLanguage(language)
      setUser(user)
    }
  }, [get, setTheme, setLanguage, setUser, isLoadingApp])

  const isLoading = isLoadingApp

  return { isLoading }
}
