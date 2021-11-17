import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER_ME } from '@/lib/constants'
import { decodeToken, isTokenExpired } from '@/services/auth'
import { IRefreshToken } from '@/services/auth/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface Props {
  req: NextRequest
  res: NextResponse
}

export async function authMiddleware({ req, res }: Props) {
  const refreshTokenString = req.cookies[REFRESH_TOKEN]
  let start = Date.now()

  if (!refreshTokenString && req.url !== '/login') {
    clearCookies(res)
    return NextResponse.redirect(`/login?l=${Date.now() - start}`)
  }

  const refreshToken = decodeToken<IRefreshToken>(refreshTokenString)

  const isRefreshTokenExp = refreshToken ? isTokenExpired(refreshToken) : true

  if (req.url === '/login' && !isRefreshTokenExp) {
    return NextResponse.redirect('/')
  }

  if (req.url !== '/login' && isRefreshTokenExp) {
    clearCookies(res)
    return NextResponse.redirect(`/login?l=${Date.now() - start}`)
  }

  return null
}

function clearCookies(res: NextResponse) {
  res.clearCookie(ACCESS_TOKEN)
  res.clearCookie(REFRESH_TOKEN)
  res.clearCookie(REMEMBER_ME)
}
