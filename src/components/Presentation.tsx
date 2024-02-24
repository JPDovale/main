'use client'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { Language } from '@/stores/app'

const translations = {
  [Language.PORTUGUESE_BR]: {
    whatIDo: '<Desenvolvedor fullstack> | Criando arte em forma de código',
    whoAmI:
      'Apoixonado por tecnologia e arte desde os 8 anos, buscando um mundo que vá além das telas.',
  },
  [Language.ENGLISH]: {
    whatIDo: '<Fullstack developer> | Creating art in code form',
    whoAmI:
      'Passionate about technology and art since the age of 8, seeking a world that goes beyond screens.',
  },
}

export function Presentation() {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <section
      data-theme={theme}
      className="w-full max-w-screen-xl mx-auto flex flex-col items-center mt-44 text-violet-700 data-[theme=dark]:text-green-500 ease-in-out duration-200"
    >
      <h1 className="text-7xl z-[1] font-bold font-title">
        João Paulo do Vale
      </h1>
      <h3 className="text-lg font-bold font-body z-[1]">
        {translations[language].whatIDo}
      </h3>

      <p
        data-theme={theme}
        className="text-xl font-bold border-b border-t rounded-3xl py-4 px-2 border-violet-700 mt-20 font-body max-w-lg text-center shadow-2xl mb-60 data-[theme=dark]:border-green-500 backdrop-blur-[1px]"
      >
        {translations[language].whoAmI}
      </p>
    </section>
  )
}
