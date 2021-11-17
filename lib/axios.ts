import axios, { AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'
import { clearTokens, refreshTokens, setTokens } from '../services/auth'
import { API_URL, ACCESS_TOKEN } from './constants'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const getAxios = (): AxiosInstance => {
  axiosInstance.interceptors.request.use(config => {
    const cookies = parseCookies(null)

    const accessToken = cookies[ACCESS_TOKEN]
    if (accessToken) config!.headers!.Authorization = `Bearer ${accessToken}`
    // const locale = cookies.NEXT_LOCALE
    // config.params = { lang: locale ? locale : 'ru', ...config.params }

    return config
  })

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    async function (error) {
      const originalRequest = error.response.config
      const status = error.response ? error.response.status : null

      if (status !== 401) {
        return Promise.reject(error)
      }

      const data = await refreshTokens()

      if (!data?.accessToken) {
        clearTokens()
        if (typeof window !== 'undefined') {
          return (window.location.href = '/login')
        }
        return Promise.reject(error)
      }

      setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
        return axios(originalRequest)
      }
    }
  )

  return axiosInstance
}
