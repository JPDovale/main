'use client'

import { LanguagesIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useTheme } from '@/hooks/useTheme'
import { Language } from '@/stores/app'
import { CookiesKeys, useCookies } from '@/hooks/useCookies'
import { useLanguage } from '@/hooks/useLanguage'

export function SwitchLanguage() {
  const { theme } = useTheme()
  const { set } = useCookies()
  const { setLanguage, language } = useLanguage()

  function handleSwitchLanguage(language: string) {
    set(CookiesKeys.LANGUAGE, language)
    setLanguage(language as Language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-theme={theme}
        className="border border-violet-700 p-1 rounded-md text-violet-700 data-[theme=dark]:border-green-500 data-[theme=dark]:text-green-500 ease-in-out duration-200"
      >
        <LanguagesIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent data-theme={theme} align="end">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleSwitchLanguage}
        >
          <DropdownMenuRadioItem value={Language.PORTUGUESE_BR}>
            PT-BR
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Language.ENGLISH}>
            EN-US
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
