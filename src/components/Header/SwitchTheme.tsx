'use client'
import { CookiesKeys, useCookies } from '@/hooks/useCookies'
import { Switch } from '../ui/switch'
import { useTheme } from '@/hooks/useTheme'
import { Theme } from '@/stores/app'

export function SwitchTheme() {
  const { set } = useCookies()
  const { setTheme, theme } = useTheme()

  function handleSwitchThemeMode() {
    if (theme === Theme.DARK) {
      set(CookiesKeys.THEME, Theme.LIGHT)
      setTheme(Theme.LIGHT)

      return
    }

    set(CookiesKeys.THEME, Theme.DARK)
    setTheme(Theme.DARK)
  }

  return (
    <Switch
      className="ml-4"
      onCheckedChange={handleSwitchThemeMode}
      checked={theme === Theme.DARK}
    />
  )
}
