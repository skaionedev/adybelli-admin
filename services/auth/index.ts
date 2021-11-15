import defautlAxios from 'axios'
import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { getAxios } from '../../lib/axios'
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, REMEMBER_ME } from '../../lib/constants'
import type {
  IAccessToken,
  IRefreshToken,
  IStringTokens,
  ITokens,
  TDecodeToken,
  TGetTokens
} from './types'

const axios = getAxios()

export const getTokens: TGetTokens = async props => {
  const { email, password, remember } = props
  try {
    const { data } = await axios.post(`/auth/login`, {
      email,
      password
    })

    if (remember) {
      setCookie({}, REMEMBER_ME, 'true', {
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60
        // secure: process.env.NODE_ENV !== 'development'
      })
    }

    return data
  } catch (error) {
    Promise.reject(error)
    return {} as ITokens
  }
}

export const isTokenValid = (token: string): boolean => {
  try {
    if (!token) throw new Error('invalid token')

    const decoded = jwtDecode(token)

    return Boolean(decoded)
  } catch (error) {
    console.log(error)
    return false
  }
}

export const decodeToken: TDecodeToken = token => {
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

export const isTokenExpired = (token: IAccessToken | IRefreshToken): Boolean => {
  const { exp } = token
  if (Date.now() >= exp * 1000) return true
  else return false
}

export function setTokens(props: IStringTokens) {
  const { accessToken, refreshToken } = props

  const decodedAT: any = jwtDecode(accessToken)
  const decodedRT: any = jwtDecode(refreshToken)

  const remember = parseCookies({})[REMEMBER_ME]

  setCookie({}, ACCESS_TOKEN, accessToken, {
    path: '/',
    maxAge: remember ? (decodedRT.exp * 1000 - Date.now()) / 1000 : undefined
    // secure: process.env.NODE_ENV !== 'development'
  })
  setCookie({}, REFRESH_TOKEN, refreshToken, {
    path: '/',
    maxAge: remember ? (decodedRT.exp * 1000 - Date.now()) / 1000 : undefined
    // secure: process.env.NODE_ENV !== 'development'
  })
}

export function clearTokens() {
  destroyCookie({}, ACCESS_TOKEN, { path: '/' })
  destroyCookie({}, REFRESH_TOKEN, { path: '/' })
  destroyCookie({}, REMEMBER_ME, { path: '/' })
}

export async function refreshTokens(): Promise<IStringTokens | undefined> {
  const cookies = parseCookies(null)
  const refreshToken = cookies[REFRESH_TOKEN]

  try {
    const { data } = await defautlAxios.get(`${API_URL}/auth/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
