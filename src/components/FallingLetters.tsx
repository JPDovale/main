'use client'

import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'

interface Letter {
  char: string
  top: number
  left: number
}

const containerStyles = tv({
  base: 'absolute top-0 left-0 -z-[0] pointer-events-none select-none h-screen w-screen overflow-hidden ease-in-out duration-200',
  variants: {
    theme: {
      light: 'text-violet-700',
      dark: 'text-green-500',
    },
  },
})

export function FallingLetters() {
  const { theme } = useTheme()
  const [letters, setLetters] = useState<Letter[]>([])

  function createRandomLetter() {
    const letter: Letter = {
      char: String.fromCharCode(Math.floor(Math.random() * 26) + 65),
      top: 0,
      left: Math.random() * 100,
    }

    setLetters((currentLetters) => [...currentLetters, letter])

    const timeToRemoveLetter = Math.floor(Math.random() * (2500 - 2000)) + 2000

    setTimeout(() => {
      setLetters((currentLetters) => currentLetters.filter((l) => l !== letter))
    }, timeToRemoveLetter)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      createRandomLetter()
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={containerStyles({ theme })}>
      {letters.map((letter, index) => (
        <div
          key={index}
          style={{ top: `${letter.top}vh`, left: `${letter.left}vw` }}
          className="absolute top-0 animate-fall opacity-30 font-title"
        >
          {letter.char}
        </div>
      ))}
    </div>
  )
}
