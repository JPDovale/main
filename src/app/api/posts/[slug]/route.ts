import { prisma } from '@/services/prisma/prismaConnection'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { validateApiKey } from '../validateApiKey'

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
