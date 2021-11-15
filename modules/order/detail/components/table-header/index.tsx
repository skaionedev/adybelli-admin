import TableToolbar from '@/components/common/table/toolbar'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { Button } from '@mui/material'
// import { useOrderAllQuery } from '@/hooks/queries/orders/useOrderAllQuery'
import React from 'react'

const OrderDetailTableHeader = () => {
  const { data } = useOrdersOneQuery()
  return (
    <TableToolbar
      title="Товары"
      titleCount={data?.orderDetails.length || 0}
      titleCountTooltip="Количество товаров"
    />
  )
}

export default OrderDetailTableHeader
