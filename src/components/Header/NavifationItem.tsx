'use client'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const navigationItemStyles = tv({
  base: 'font-title font-bold uppercase ease-in-out duration-200',
  variants: {
    theme: {
      light: 'text-violet-700 hover:underline hover:text-violet-900',
      dark: 'text-green-500 hover:underline hover:text-green-700',
    },
    active: {
      true: 'underline opacity-60 cursor-default pointer-events-none',
    },
  },
})

interface NavigationItemProps {
  children: ReactNode
  href: string
}

export function NavigationItem({ children, href }: NavigationItemProps) {
  const { theme } = useTheme()
  const pathname = usePathname()

  const isActive = href === pathname

  return (
    <Link
      href={href}
      className={navigationItemStyles({ theme, active: isActive })}
    >
      {children}
    </Link>
  )
}
