import ListTile from '@/components/common/list-tile'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { formatDateDetail, convertPaymentTypesToString } from '@/lib/utils'
import { Stack } from '@mui/material'
import React from 'react'
import { BsFillCalendarEventFill, BsCashStack } from 'react-icons/bs'
import { FaTruckLoading } from 'react-icons/fa'
import { MdCheck, MdContactless } from 'react-icons/md'

const OrderDetailTableDetail = () => {
  const { data } = useOrdersOneQuery()
  if (!data) return null
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 1 }}>
      <ListTile
        label="Дата заказа"
        value={formatDateDetail(data.createdAt)}
        icon={<BsFillCalendarEventFill size={24} />}
      />
      <ListTile
        label="Тип оплаты"
        value={convertPaymentTypesToString(data?.payment_method)}
        icon={<MdContactless size={24} />}
      />
      <ListTile
        label="Доставка"
        value={data?.shipping_price}
        icon={<FaTruckLoading size={24} />}
      />
      <ListTile
        label="Подтвержден"
        value={data?.is_confirmed ? 'да' : 'нет'}
        icon={<MdCheck size={24} />}
      />

      <ListTile bold label="Cумма" value={data?.total} icon={<BsCashStack size={24} />} />
    </Stack>
  )
}

export default OrderDetailTableDetail
