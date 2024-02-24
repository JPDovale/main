'use client'
import { useTheme } from '@/hooks/useTheme'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const headerStyles = tv({
  base: 'flex w-full h-14 fixed top-0 border-b shadow-sm z-10 ease-in-out duration-200',
  variants: {
    theme: {
      dark: 'bg-zinc-900 border-b-green-500 text-zinc-100',
      light: 'bg-zinc-100 border-b-violet-500 text-zinc-900',
    },
  },
})

interface RootProps extends HTMLAttributes<HTMLHeadElement> {}

export function Root({ className, ...props }: RootProps) {
  const { theme } = useTheme()
  return <header className={headerStyles({ className, theme })} {...props} />
}

Root.displayName = 'Header.Root'
