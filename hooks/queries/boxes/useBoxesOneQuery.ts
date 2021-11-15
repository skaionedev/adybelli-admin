import { getAxios } from '@/lib/axios'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IOrderProductFull } from '../orders/types'
import type { IBox } from './types'
const axios = getAxios()

interface Response extends IBox {
  orderedProducts: IOrderProductFull[]
}
type QueryType = () => UseQueryResult<Response, unknown>

export const useBoxesOneQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()
  const { query } = useRouter()

  const boxId = query.id

  return useQuery(
    ['boxes-one', isAuthenticated, boxId],
    async () => {
      const { data } = await axios.get(`/admin/boxes/${boxId}`)
      console.log({ data })

      return data
    },
    {
      enabled: isAuthenticated && Boolean(boxId),
      refetchOnMount: true
    }
  )
}
