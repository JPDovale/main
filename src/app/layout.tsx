import type { Metadata } from 'next'
import { Pixelify_Sans, Roboto } from 'next/font/google'
import './globals.css'
import { PreloadProvider } from '@/providers/PreloadProvider'
import { Analytics } from '@vercel/analytics/react'

const pixels = Pixelify_Sans({
  subsets: ['latin-ext'],
  weight: ['400', '700'],
  variable: '--font-pixels',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'JPDovale',
  description:
    'Apoixonado por tecnologia e arte desde os 8 anos, buscando um mundo que vá além das telas.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${pixels.variable} ${roboto.variable} bg-zinc-100 overflow-x-hidden`}
      >
        <PreloadProvider>{children}</PreloadProvider>
        <Analytics />
      </body>
    </html>
  )
}
