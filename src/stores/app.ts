import { create } from 'zustand'

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum Language {
  PORTUGUESE_BR = 'pt-BR',
  ENGLISH = 'en-US',
}

interface UseAppStore {
  theme: Theme
  language: Language

  isLoading: boolean

  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
}

export const useAppStore = create<UseAppStore>((set) => {
  return {
    theme: Theme.LIGHT,
    language: Language.PORTUGUESE_BR,

    isLoading: true,

    setTheme: (theme: Theme) => set({ theme, isLoading: false }),
    setLanguage: (language: Language) => set({ language }),
  }
})
