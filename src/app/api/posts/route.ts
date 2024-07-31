import { prisma } from '@/services/prisma/prismaConnection'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateSummary } from './generateSummary'
import { validateApiKey } from './validateApiKey'
import { generateSlug } from './generateSlug'

const reqQuerySchema = z.object({
  page: z.coerce.number().min(1),
  size: z.coerce.number().min(20).max(100),
  tag: z.string().trim().max(255).optional().nullable(),
})

export async function GET(req: NextRequest) {
  const query = {
    page: req.nextUrl.searchParams.get('page') ?? 1,
    size: req.nextUrl.searchParams.get('size') ?? 30,
    tag: req.nextUrl.searchParams.get('tag'),
  }

  const validation = reqQuerySchema.safeParse(query)

  if (!validation.success) {
    return new NextResponse('Invalid query', { status: 400 })
  }

  const { page, size, tag } = validation.data

  const postsOnDatabase = await prisma.post.findMany({
    where: tag
      ? {
          tags: {
            some: {
              tag,
            },
          },
        }
      : {},
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: size,
    skip: (page - 1) * size,
  })

  const posts = postsOnDatabase.map((post) => ({
    ...post,
    tags: post.tags.map(({ tag }) => tag),
    summary: generateSummary(post.content),
  }))

  return NextResponse.json({
    ok: true,
    posts,
    status: 200,
  })
}

const reqBodySchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1).max(30000),
  tags: z.array(z.string().trim().min(2).max(255)).optional().default([]),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = reqBodySchema.safeParse(body)

  const apiKeyResponse = validateApiKey(req)
  if (apiKeyResponse) {
    return apiKeyResponse
  }

  if (!validation.success) {
    return new NextResponse('Invalid body', { status: 400 })
  }

  const post = validation.data

  const postWithSameSlug = await prisma.post.findUnique({
    where: { slug: generateSlug(post.title) },
  })

  if (postWithSameSlug) {
    return new NextResponse('Post with same slug already exists', {
      status: 409,
    })
  }

  const newPost = await prisma.post.create({
    data: {
      slug: generateSlug(post.title),
      title: post.title,
      content: post.content,
      tags: {
        connectOrCreate: post.tags.map((tag) => ({
          where: {
            tag: generateSlug(tag),
          },
          create: {
            tag: generateSlug(tag),
          },
        })),
      },
    },
  })

  return NextResponse.json({ ok: true, postId: newPost.slug })
}
