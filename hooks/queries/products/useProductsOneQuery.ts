import axiosInstance from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

interface Response {}

type QueryType = () => UseQueryResult<Response, unknown>

export const useProductsOneQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()
  const { locale, query } = useRouter()

  const productId = query.id ?? ''

  return useQuery(
    ['orders-all', isAuthenticated, productId],
    async () => {
      const { data } = await axiosInstance.get(`/admin/products/${productId}`)
      return data
    },
    {
      enabled: isAuthenticated && Boolean(productId),
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
