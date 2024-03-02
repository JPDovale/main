'use client'
import { useTheme } from '@/hooks/useTheme'
import { tv } from 'tailwind-variants'

const logoStyles = tv({
  base: 'text-3xl font-title leading-none font-bold underline ease-in-out duration-200 max-sm:text-2xl',
  variants: {
    theme: {
      dark: 'text-green-500',
      light: 'text-violet-700',
    },
  },
})

export function Logo() {
  const { theme } = useTheme()

  return <span className={logoStyles({ theme })}>{'*>JPDOVALE'}</span>
}
