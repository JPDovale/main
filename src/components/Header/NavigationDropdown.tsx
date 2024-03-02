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
import { LogOut, Menu, User } from 'lucide-react'
import { CookiesKeys, useCookies } from '@/hooks/useCookies'
import { useTheme } from '@/hooks/useTheme'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

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

export function NavigationDropdown() {
  const { set } = useCookies()
  const { language } = useLanguage()
  const { theme } = useTheme()
  const { getFirebaseAuth, user, setUser } = useFirebaseStore((state) => ({
    getFirebaseAuth: state.getFirebaseAuth,
    setUser: state.setUser,
    user: state.user,
  }))

  const pathname = usePathname()
  const isToShowLanguageSwitch = !pathname.includes('/articles')

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider()
    const firebaseAuth = getFirebaseAuth()

    firebaseAuth.languageCode = language

    try {
      const response = await signInWithPopup(firebaseAuth, provider)
      setUser(response.user)
      set(CookiesKeys.USER, JSON.stringify(response.user))
    } catch (error) {
      alert('Erro ao realizar login com o Google')
    }
  }

  function handleLogout() {
    setUser(null)
    set(CookiesKeys.USER, '')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-theme={theme}
        className="sm:hidden border border-violet-700 p-1 rounded-md text-violet-700 data-[theme=dark]:border-green-500 data-[theme=dark]:text-green-500 ease-in-out duration-200"
      >
        <Menu size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <NavigationItem href="/">
              {translations[language].home}
            </NavigationItem>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <NavigationItem href="/articles">
              {translations[language].articles}
            </NavigationItem>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="flex justify-between items-center">
          <DropdownMenuItem>
            <SwitchTheme />
          </DropdownMenuItem>

          {isToShowLanguageSwitch && (
            <DropdownMenuItem>
              <SwitchLanguage />
            </DropdownMenuItem>
          )}

          {user && (
            <DropdownMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    data-theme={theme}
                    className="border border-violet-700 w-8 h-8 data-[theme=dark]:border-green-500 ease-in-out duration-200 cursor-pointer"
                  >
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <button
                      className="flex gap-2 cursor-pointer items-center flex-1"
                      type="button"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} /> Sair
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
          )}

          {!user && (
            <DropdownMenuItem
              onClick={handleGoogleLogin}
              data-theme={theme}
              className="border border-violet-700 cursor-pointer p-1 rounded-md text-violet-700 data-[theme=dark]:border-green-500 data-[theme=dark]:text-green-500 ease-in-out duration-200"
            >
              <GoogleLogo size={16} />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
