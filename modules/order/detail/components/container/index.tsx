import AppBreadcrumbs from '@/components/common/breadcrumbs'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { Card } from '@mui/material'
import React from 'react'
import OrderDetailCustomer from '../customer'
import OrderDetailInfo from '../info'
import OrderDetailTable from '../table'
import OrderDetailTableHeader from '../table-header'
import { StyledWrapper } from './styles'

const OrderDetailContainer = () => {
  const { data } = useOrdersOneQuery()
  return (
    <>
      <AppBreadcrumbs current={data?.order_id} />
      <StyledWrapper>
        <Card variant="outlined">
          <OrderDetailTableHeader />
          <OrderDetailTable />
        </Card>
        <div>
          {/* <OrderDetailCustomer /> */}
          <OrderDetailInfo />
        </div>
      </StyledWrapper>
    </>
  )
}

export default OrderDetailContainer
