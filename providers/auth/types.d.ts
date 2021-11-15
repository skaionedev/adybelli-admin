import type { IAccessToken } from '@/services/auth/types'

export interface IAuthContext {
  isAuthenticated: boolean
  user?: IAccessToken | null
  loading: boolean
  login: (values: ILoginProps) => void
  logout: () => void
}
