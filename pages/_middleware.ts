import { authMiddleware } from '@/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.ua?.isBot) return null
  if (!req.page.name) return res

  const authRes = authMiddleware({ req, res })
  if (authRes) return authRes

  return res
}
