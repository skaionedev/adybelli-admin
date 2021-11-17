import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER_ME } from '@/lib/constants'
import { decodeToken, isTokenExpired } from '@/services/auth'
import { IRefreshToken } from '@/services/auth/types'
import { NextURL } from 'next/dist/server/web/next-url'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface Props {
  req: NextRequest
  res: NextResponse
}

export async function authMiddleware({ req, res }: Props) {
  const refreshTokenString = req.cookies[REFRESH_TOKEN]

  if (!refreshTokenString && req.url !== '/login') {
    // clearCookies(res)
    return NextResponse.redirect(`/login`)
  }

  const refreshToken = decodeToken<IRefreshToken>(refreshTokenString)

  const isRefreshTokenExp = refreshToken ? isTokenExpired(refreshToken) : true

  if (req.url === '/login' && !isRefreshTokenExp) {
    return NextResponse.redirect('/')
  }

  if (req.url !== '/login' && isRefreshTokenExp) {
    clearCookies(res)
    return NextResponse.redirect(`/login`)
  }

  return null
}

function clearCookies(res: NextResponse) {
  res.clearCookie(ACCESS_TOKEN)
  res.clearCookie(REFRESH_TOKEN)
  res.clearCookie(REMEMBER_ME)
}
