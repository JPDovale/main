'use client'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { Language } from '@/stores/app'

const translations = {
  [Language.PORTUGUESE_BR]: {
    whatIDo: '<Desenvolvedor fullstack> | Criando arte em forma de código',
    whoAmI:
      'Apoixonado por tecnologia e arte desde os 8 anos, buscando um mundo que vá além das telas.',
    about:
      'Olá! Me chamo João Paulo do Vale. Sou entusiasta de tecnologia desde os 8 anos, quando me aventurei no mundo da programação criando mods para Minecraft. Após superar obstáculos, incluindo a falta de recursos, reacendi a minha paixão pelo desenvolvimento de software. Hoje me comprometo com o aprendizado contínuo na vasta área da computação.',
    aboutTitle: 'Sobre mim',
  },
  [Language.ENGLISH]: {
    whatIDo: '<Fullstack developer> | Creating art in code form',
    whoAmI:
      'Passionate about technology and art since the age of 8, seeking a world that goes beyond screens.',
    about:
      "Hello! My name is João Paulo do Vale. I've been enthusiastic about technology since I was 8 years old, when I ventured into the world of programming by creating mods for Minecraft. After overcoming obstacles, including a lack of resources, I rekindled my passion for software development. Today, I am committed to continuous learning in the vast field of computing.",
    aboutTitle: 'About me',
  },
}

export function Presentation() {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <section
      data-theme={theme}
      className="w-full max-w-screen-xl mx-auto flex flex-col items-center mt-44 text-violet-700 data-[theme=dark]:text-green-500 ease-in-out duration-200 px-4"
    >
      <h1 className="text-7xl z-[1] font-bold font-title max-md:text-6xl max-md:text-center">
        João Paulo do Vale
      </h1>
      <h3 className="font-bold font-body z-[1] sm:text-lg">
        {translations[language].whatIDo}
      </h3>

      <p
        data-theme={theme}
        className="text-xl font-bold border-b border-t rounded-3xl py-4 px-2 border-violet-700 mt-20 font-body max-w-lg text-center shadow-2xl mb-60 data-[theme=dark]:border-green-500 backdrop-blur-[1px] max-md:text-sm :mb-40"
      >
        {translations[language].whoAmI}
      </p>

      <h3 className="text-3xl w-full mb-4 max-w-screen-lg font-bold font-body opacity-60 text-gray-500 max-md:text-2xl">
        {translations[language].aboutTitle}
      </h3>

      <p
        data-theme={theme}
        className="font-body text-black text-justify mb-20 max-w-screen-lg text-lg font-bold opacity-80 ease-in-out duration-200 data-[theme=dark]:text-white max-md:text-sm"
      >
        {translations[language].about}
      </p>
    </section>
  )
}
