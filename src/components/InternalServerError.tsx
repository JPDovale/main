'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { Language } from '@/stores/app'
import { MaskSad } from '@phosphor-icons/react'

const translations = {
  [Language.PORTUGUESE_BR]: {
    message: 'Servidores indispiníveis no momento... Volte mais tarde',
  },
  [Language.ENGLISH]: {
    message: 'Servers temporarily unavailable... Please try again later',
  },
}

export function InternalServerError() {
  const { language } = useLanguage()
  const { theme } = useTheme()

  return (
    <div
      data-theme={theme}
      className="text-center flex flex-col m-auto text-violet-700 data-[theme=dark]:text-green-500 ease-in duration-200"
    >
      <span className="text-8xl font-bold font-body">500</span>
      <span className="text-3xl max-w-lg flex flex-col items-center gap-4 font-title ">
        {translations[language].message}
        <MaskSad className="w-10 h-10" />
      </span>
    </div>
  )
}
