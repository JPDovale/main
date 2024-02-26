import { prisma } from '@/services/prisma/prismaConnection'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { validateApiKey } from '../validateApiKey'
import { generateSlug } from '../generateSlug'

interface Params {
  params: { slug: string }
}

const paramsSchema = z.object({ slug: z.string().trim().min(1).max(255) })

export async function GET(req: NextRequest, { params }: Params) {
  const validation = paramsSchema.safeParse(params)
  if (!validation.success) {
    return new NextResponse('invalid params', { status: 400 })
  }

  const { slug } = validation.data

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
    return new NextResponse('not found', { status: 404 })
  }

  return NextResponse.json({
    ok: true,
    post: {
      ...post,
      tags: post.tags.map(({ tag }) => tag),
    },
  })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const validation = paramsSchema.safeParse(params)
  if (!validation.success) {
    return new NextResponse('invalid params', { status: 400 })
  }

  const apiKeyError = validateApiKey(req)
  if (apiKeyError) {
    return apiKeyError
  }

  const { slug } = validation.data

  const post = await prisma.post.findUnique({
    where: { slug },
  })

  if (!post) {
    return new NextResponse('not found', { status: 404 })
  }

  await prisma.post.delete({
    where: { slug },
  })

  return NextResponse.json({ ok: true })
}

const reqBodySchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1).max(30000),
  tags: z.array(z.string().trim().min(2).max(255)).optional().default([]),
})

export async function PUT(req: NextRequest, { params }: Params) {
  const validationParams = paramsSchema.safeParse(params)
  if (!validationParams.success) {
    return new NextResponse('invalid params', { status: 400 })
  }

  const body = await req.json()
  const validation = reqBodySchema.safeParse(body)

  const apiKeyResponse = validateApiKey(req)
  if (apiKeyResponse) {
    return apiKeyResponse
  }

  if (!validation.success) {
    return new NextResponse('Invalid body', { status: 400 })
  }

  const { slug } = validationParams.data
  const post = validation.data

  const postWithSameSlug = await prisma.post.findUnique({
    where: { slug },
  })

  if (!postWithSameSlug) {
    return new NextResponse('Post not found', {
      status: 404,
    })
  }

  const newPost = await prisma.post.update({
    where: {
      slug,
    },
    data: {
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
