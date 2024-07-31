import type { HTMLAttributes } from 'react'

interface ContentProps extends HTMLAttributes<HTMLDivElement> {}

export function Content({ ...props }: ContentProps) {
  return (
    <div
      className="flex w-full items-center justify-between max-w-screen-xl mx-auto"
      {...props}
    />
  )
}

Content.displayName = 'Header.Content'
