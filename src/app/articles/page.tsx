import { Articles } from '@/components/Articles'
import { FallingLetters } from '@/components/FallingLetters'
import { Header } from '@/components/Header'
import { InternalServerError } from '@/components/InternalServerError'
import { getPostsRequest } from '@/services/mainapi/posts/getPostsRequest'

interface ArticlePageProps {
  searchParams: {
    tag: string
  }
}

export const revalidate = 600

export default async function ArticlePages({ searchParams }: ArticlePageProps) {
  const response = await getPostsRequest({ tag: searchParams.tag })

  return (
    <main className="flex flex-col w-full min-h-screen">
      <Header />
      <FallingLetters />

      {response.status !== 200 && <InternalServerError />}
      {response.status === 200 && response.data && (
        <Articles posts={response.data.posts} tag={searchParams.tag} />
      )}
    </main>
  )
}
