import { compareSync } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export function validateApiKey(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) {
    return new NextResponse('Unauthorized', {
      status: 401,
    })
  }

  const apiSecret = process.env.ACCESS_KEY
  if (!apiSecret) {
    return new NextResponse('Unauthorized', {
      status: 401,
    })
  }

  const apiKetIsValid = compareSync(apiSecret, apiKey)
  if (!apiKetIsValid) {
    return new NextResponse('Unauthorized', {
      status: 401,
    })
  }

  return null
}
