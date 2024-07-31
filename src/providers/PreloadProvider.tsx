'use client'
import { usePreload } from '@/hooks/usePreload'
import { useTheme } from '@/hooks/useTheme'
import type { ReactNode } from 'react'

interface PreloadProviderProps {
  children: ReactNode
}

export function PreloadProvider({ children }: PreloadProviderProps) {
  const { isLoading } = usePreload()
  const { theme } = useTheme()

  if (isLoading) return null

  return (
    <section
      data-theme={theme}
      className="bg-zinc-100 min-h-screen data-[theme=dark]:bg-zinc-900 text-zinc-900 data-[theme=dark]:text-zinc-100 ease-in-out duration-200"
    >
      {children}
    </section>
  )
}
