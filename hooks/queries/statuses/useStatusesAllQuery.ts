import { getAxios } from '@/lib/axios'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IStatus } from './types'

const axios = getAxios()

type QueryType = () => UseQueryResult<IStatus[], unknown>

export const useStatusesAllQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()
  const { locale, query } = useRouter()

  return useQuery(
    ['statuses-all', isAuthenticated],
    async () => {
      const { data } = await axios.get(`/statuses`)
      console.log({ status: data })

      return data
    },
    {
      enabled: isAuthenticated,
      staleTime: Infinity,
      refetchOnMount: true
    }
  )
}
