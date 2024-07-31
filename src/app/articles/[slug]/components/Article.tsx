'use client'
import { useTheme } from '@/hooks/useTheme'
import type { Post } from '@/services/mainapi/posts/getPostsRequest'
import { marked } from 'marked'
import Link from 'next/link'

interface ArticleProps {
  article: Post
}

export function Article({ article }: ArticleProps) {
  const { theme } = useTheme()

  return (
    <article className="w-full flex flex-col max-w-screen-md mx-auto z-10 pb-40 mt-12 px-4">
      <h1
        data-theme={theme}
        className="text-5xl font-bold font-title text-center text-violet-700 data-[theme=dark]:text-green-500 ease-in-out duration-200 max-md:text-4xl"
      >
        {article.title}
      </h1>

      <div className="flex gap-2 text-xs font-body flex-wrap justify-between w-full mt-6">
        {article.tags.map((tag) => (
          <Link
            href={`/articles?tag=${tag}`}
            data-theme={theme}
            key={tag}
            className="bg-violet-700/60 text-white rounded-full px-3 py-0.5 flex-1 text-center ease-in-out duration-200 data-[theme=dark]:bg-green-500/60 max-md:px-1"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div
        data-theme={theme}
        className="prose prose-lg min-w-full text-justify mt-8 data-[theme=dark]:prose-invert ease-in-out duration-200 max-md:prose-sm"
        dangerouslySetInnerHTML={{
          __html: marked(article.content.replace(/\\n/g, '\n')),
        }}
      />
    </article>
  )
}
