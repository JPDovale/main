'use client'
import { Language } from '@/stores/app'
import { NavigationItem } from './NavifationItem'
import { SwitchLanguage } from './SwitchLanguage'
import { SwitchTheme } from './SwitchTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { GoogleLogo } from '@phosphor-icons/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useFirebaseStore } from '@/stores/firebase'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import { CookiesKeys, useCookies } from '@/hooks/useCookies'
import { useTheme } from '@/hooks/useTheme'

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
  const { set } = useCookies()
  const { language } = useLanguage()
  const { theme } = useTheme()
  const { getFirebaseAuth, user, setUser } = useFirebaseStore((state) => ({
    getFirebaseAuth: state.getFirebaseAuth,
    setUser: state.setUser,
    user: state.user,
  }))

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider()
    const firebaseAuth = getFirebaseAuth()

    firebaseAuth.languageCode = language

    try {
      const response = await signInWithPopup(firebaseAuth, provider)
      setUser(response.user)
      set(CookiesKeys.USER, JSON.stringify(response.user))
    } catch (error) {
      console.log(error)

      alert('Erro ao realizar login com o Google')
    }
  }

  return (
    <nav className="flex h-full items-center">
      <ul className="flex gap-4 h-full items-center">
        <li>
          <NavigationItem href="/">
            {translations[language].home}
          </NavigationItem>
        </li>
        {/* <li> */}
        {/*   <NavigationItem href="/projects"> */}
        {/*     {translations[language].projects} */}
        {/*   </NavigationItem> */}
        {/* </li> */}
        <li>
          <NavigationItem href="/articles">
            {translations[language].articles}
          </NavigationItem>
        </li>
        {/* <li> */}
        {/*   <NavigationItem href="/contact"> */}
        {/*     {translations[language].contact} */}
        {/*   </NavigationItem> */}
        {/* </li> */}
        <li>
          <SwitchTheme />
        </li>
        <li>
          <SwitchLanguage />
        </li>

        {user && (
          <li>
            <Avatar
              data-theme={theme}
              className="border border-violet-700 w-8 h-8 data-[theme=dark]:border-green-500 ease-in-out duration-200"
            >
              <AvatarImage src={user.photoURL || ''} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </li>
        )}

        {!user && (
          <li
            onClick={handleGoogleLogin}
            data-theme={theme}
            className="border cursor-pointer border-violet-700 p-1 -ml-2 rounded-md text-violet-700 data-[theme=dark]:border-green-500 data-[theme=dark]:text-green-500 ease-in-out duration-200"
          >
            <GoogleLogo />
          </li>
        )}
      </ul>
    </nav>
  )
}
