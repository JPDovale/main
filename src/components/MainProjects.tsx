'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { projects } from '@/projects'
import { Language } from '@/stores/app'
import Image from 'next/image'
import Link from 'next/link'

const translations = {
  [Language.PORTUGUESE_BR]: {
    title: 'Projetos Principais',
  },
  [Language.ENGLISH]: {
    title: 'Main Projects',
  },
}

export function MainProjects() {
  const { language } = useLanguage()
  const { theme } = useTheme()

  return (
    <section
      className="w-full max-w-screen-lg mx-auto z-10 pb-40"
      id="main-projects"
    >
      <h2 className="text-3xl font-bold font-body opacity-60 text-gray-500">
        {translations[language].title}
      </h2>

      <ul className="flex flex-col gap-32 w-full mt-8">
        {projects.map((project, i) => {
          const even = i % 2 === 0

          return (
            <li
              key={project.title}
              className="flex data-[even=false]:flex-row-reverse justify-between gap-16"
              data-even={even}
            >
              <div className="w-1/2">
                <Image
                  className="rounded-lg z-[1] shadow-2xl shadow-black/50 w-full h-full object-cover"
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={700}
                  quality={100}
                />
              </div>

              <div className="w-1/2 flex flex-col gap-2">
                <h4
                  data-theme={theme}
                  className="text-3xl font-bold font-title text-violet-700 data-[theme=dark]:text-green-500 ease-in-out duration-200"
                >
                  {project.title}
                </h4>

                <p className="text-sm text-justify font-body">
                  {project.content.map((p, i) => (
                    <>
                      {p[language]}
                      {i !== project.content.length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </>
                  ))}
                </p>

                <span
                  data-theme={theme}
                  className="text-sm font-body font-bold text-violet-700 mt-4 data-[theme=dark]:text-green-500 ease-in-out duration-200"
                >
                  {project.stack}
                </span>

                <div className="flex gap-4 justify-center">
                  {project.links.map((link) => (
                    <Link
                      target="_blank"
                      key={link.text}
                      href={link.url}
                      data-theme={theme}
                      className="font-title flex gap-2 items-center uppercase text-violet-700 font-bold border border-violet-500 px-6 py-1 rounded-full hover:bg-violet-700 hover:text-zinc-100 hover:shadow-xl ease-in-out duration-200 data-[theme=dark]:text-green-500 data-[theme=dark]:hover:bg-green-500 data-[theme=dark]:border-green-500 data-[theme=dark]:hover:text-zinc-100"
                    >
                      <link.Icon size={16} />
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
