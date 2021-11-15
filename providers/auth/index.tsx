import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/lib/constants'
import { clearTokens, isTokenValid, setTokens, getTokens, decodeToken } from '@/services/auth'
import { IAccessToken, IGetTokensProps } from '@/services/auth/types'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { toast } from 'react-toastify'
import { IAuthContext } from './types'

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const cookies = parseCookies({})
    const token = cookies[REFRESH_TOKEN]
    return Boolean(token)
  })

  const [user, setUser] = React.useState(initUser)

  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()

  function initUser() {
    const cookies = parseCookies({})
    const token = cookies[ACCESS_TOKEN]
    if (!token) return null
    return decodeToken<IAccessToken>(token)
  }

  async function login(values: IGetTokensProps) {
    try {
      setLoading(true)
      const { accessToken, refreshToken } = await getTokens(values)
      if (!isTokenValid(accessToken)) throw new Error('invalid Token')
      setTokens({ refreshToken, accessToken })
      setUser(initUser)
      setLoading(false)
      router.replace('/')
    } catch (error: any) {
      setLoading(false)
      toast.error('Что-то пошло не так', {
        toastId: 'auth-error'
      })
    }
  }

  function logout() {
    clearTokens()
    setIsAuthenticated(false)
    router.replace('/login')
  }

  const memoedValue = React.useMemo(
    () => ({
      isAuthenticated,
      loading,
      user,
      login,
      logout
    }),
    [loading, user, isAuthenticated]
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}

export default AuthProvider
