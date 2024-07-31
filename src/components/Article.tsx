'use client'
import { marked } from 'marked'
import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'
import type { Post } from '@/services/mainapi/posts/getPostsRequest'

interface ArticleProps {
  article: Post
}

export function Article({ article }: ArticleProps) {
  const { theme } = useTheme()

  const createdAt = new Date(article.createdAt).toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div
      data-theme={theme}
      className="bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col gap-2 ease-in-out duration-200 data-[theme=dark]:bg-zinc-800"
    >
      <h3
        data-theme={theme}
        className="font-title text-2xl text-center text-violet-700 data-[theme=dark]:text-green-500 ease-in-out duration-200"
      >
        {article.title}
      </h3>

      <div className="flex gap-2 text-xs font-body flex-wrap justify-between w-full">
        {article.tags.map((tag) => (
          <Link
            href={`/articles?tag=${tag}`}
            data-theme={theme}
            key={tag}
            className="bg-violet-700/60 text-white rounded-full px-3 py-0.5 flex-1 text-center ease-in-out duration-200 data-[theme=dark]:bg-green-500/60"
          >
            {tag}
          </Link>
        ))}
      </div>

      <p
        data-theme={theme}
        className="text-sm font-body text-justify prose prose-sm prose-violet data-[theme=dark]:prose-green data-[theme=dark]:prose-invert ease-in-out duration-200"
        dangerouslySetInnerHTML={{
          __html: marked(article.summary.replace(/\\n/g, '\n')),
        }}
      />

      <span className="text-[10px] mt-3 font-bold opacity-60">
        Criado em: {createdAt} Por JPDovale
      </span>

      <Link
        data-theme={theme}
        href={`articles/${article.slug}`}
        className="text-sm bg-violet-700/60 text-white px-3 py-0.5 font-body self-start rounded-full mt-2 hover:bg-violet-600 ease-in-out duration-200 text-center data-[theme=dark]:bg-green-500/60 data-[theme=dark]:hover:bg-green-600"
      >
        Ler mais
      </Link>
    </div>
  )
}
