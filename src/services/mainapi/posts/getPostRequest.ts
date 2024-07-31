import { connection } from '../axiosConfig'
import type { Post } from './getPostsRequest'

interface GetPostRequest {
  slug: string
}

interface GetPostResponse {
  post: Post
}

export async function getPostRequest({ slug }: GetPostRequest) {
  return await connection.get<GetPostResponse>(`/posts/${slug}`)
}
