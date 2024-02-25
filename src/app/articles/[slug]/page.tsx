import { Header } from '@/components/Header'
import { NotFoundError } from '@/components/NotFoundError'
import { getPostRequest } from '@/services/mainapi/posts/getPostRequest'
import { Article } from './components/Article'

interface ArticlePagesProps {
  params: {
    slug: string
  }
}

export default async function ArticlePages({ params }: ArticlePagesProps) {
  const response = await getPostRequest({ slug: params.slug })

  return (
    <main className="flex flex-col w-full min-h-screen">
      <Header />

      {response.status === 404 && <NotFoundError />}
      {response.status === 200 && response.data && (
        <Article article={response.data.post} />
      )}
    </main>
  )
}
