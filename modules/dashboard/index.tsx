import PageStateComponent from '@/components/common/page-state'
import { IOrderStatsItem } from '@/hooks/queries/orders/types'
import { useOrdersStatsQuery } from '@/hooks/queries/orders/useOrdersStatsQuery'
import { Card, CardContent, CircularProgress, Divider, Typography } from '@mui/material'
import React from 'react'
import { StyledGrid, StyledListItem } from './styles'

const Dashboard = () => {
  const { data, status } = useOrdersStatsQuery()

  return (
    <PageStateComponent status={status}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">Добро пожаловать</Typography>

          <StyledGrid>
            {data && (
              <StatCard
                title="Всего"
                quantity={data?.ordersCount}
                total={data?.ordersTotalPrice}
              />
            )}
            {data?.statuses?.map(item => (
              <StatCard
                key={item.code}
                title={item.name}
                quantity={item.ordersCount}
                total={item.ordersTotalPrice}
              />
            ))}
          </StyledGrid>
        </CardContent>
      </Card>
    </PageStateComponent>
  )
}

export default Dashboard

interface Props {
  title: string
  quantity: number
  total: number
}

function StatCard({ total, title, quantity }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <StyledListItem>
          {/* <span>Статус:</span> */}
          <div className="title">{title}</div>
        </StyledListItem>
        <Divider sx={{ my: 1 }} />
        <StyledListItem>
          <span>Кол-во:</span>
          <div>{quantity} шт.</div>
        </StyledListItem>
        <StyledListItem>
          <span>Сумма:</span>
          <div>{total.toFixed(2)} ТМТ</div>
        </StyledListItem>
      </CardContent>
    </Card>
  )
}
