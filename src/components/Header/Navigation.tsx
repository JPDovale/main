'use client'
import { Language } from '@/stores/app'
import { NavigationItem } from './NavifationItem'
import { SwitchLanguage } from './SwitchLanguage'
import { SwitchTheme } from './SwitchTheme'
import { useLanguage } from '@/hooks/useLanguage'

const translations = {
  [Language.PORTUGUESE_BR]: {
    home: 'Inicio',
    projects: 'Projetos',
    articles: 'Artigos',
    contact: 'Contato',
  },
  [Language.ENGLISH]: {
    home: 'Home',
    projects: 'Projects',
    articles: 'Articles',
    contact: 'Contact',
  },
}

export function Navigation() {
  const { language } = useLanguage()

  return (
    <nav className="flex h-full items-center">
      <ul className="flex gap-4 h-full items-center">
        <li>
          <NavigationItem href="/">
            {translations[language].home}
          </NavigationItem>
        </li>
        <li>
          <NavigationItem href="/projects">
            {translations[language].projects}
          </NavigationItem>
        </li>
        <li>
          <NavigationItem href="/articles">
            {translations[language].articles}
          </NavigationItem>
        </li>
        <li>
          <NavigationItem href="/contact">
            {translations[language].contact}
          </NavigationItem>
        </li>
        <li>
          <SwitchTheme />
        </li>
        <li>
          <SwitchLanguage />
        </li>
      </ul>
    </nav>
  )
}
