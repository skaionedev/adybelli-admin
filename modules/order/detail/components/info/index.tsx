import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { formatDateDetail, priceConverter } from '@/lib/utils'
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import {
  BsCashStack,
  BsTagsFill,
  BsFillCreditCard2BackFill,
  BsFillCalendarEventFill
} from 'react-icons/bs'
import { FaTruckLoading, FaPercentage, FaUser } from 'react-icons/fa'
import {
  MdContactless,
  MdLocationOn,
  MdCheck,
  MdSmartphone,
  MdEmail
} from 'react-icons/md'
import OrderDetailOrderStatus from '../order-status'

interface MyListProps {
  label: string
  value: string | number
  bold?: boolean
  icon?: JSX.Element
}
const MyListItem = (props: MyListProps) => {
  const { label, value, bold = false, icon } = props

  const primaryText = (
    <Typography
      variant="caption"
      sx={{ opacity: 0.7, display: 'block', marginTop: '-2px', userSelect: 'none' }}
    >
      {label}:
    </Typography>
  )
  const secondaryText = (
    <Typography variant="body2" sx={{ fontWeight: bold ? 'bold' : 'normal' }}>
      {value}
    </Typography>
  )
  return (
    <ListItem dense>
      {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>}

      <ListItemText sx={{ my: 0.2 }} primary={primaryText} secondary={secondaryText} />
    </ListItem>
  )
}

const OrderDetailInfo = () => {
  const { data } = useOrdersOneQuery()
  if (!data) return null

  // const isNoDiscount = Number(data?.discount || 0) <= 0

  // const paymentIcon =
  //   data.payment_code === 'terminal' ? (
  //     <MdContactless size={20} />
  //   ) : data.payment_code === 'card' ? (
  //     <BsFillCreditCard2BackFill />
  //   ) : (
  //     <BsCashStack />
  //   )

  return (
    <Card variant="outlined">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 1, px: 2 }}
      >
        <Typography color="primary">Инфо о заказе</Typography>
        <OrderDetailOrderStatus />
      </Stack>
      <Divider />
      <List>
        <MyListItem
          label="Подтвержден"
          value={data?.is_confirmed ? 'да' : 'нет'}
          icon={<MdCheck />}
        />
        <MyListItem
          label="Дата заказа"
          value={formatDateDetail(data.createdAt)}
          icon={<BsFillCalendarEventFill />}
        />
        <MyListItem
          label="Тип оплаты"
          value={data?.payment_method + ''}
          icon={<MdContactless />}
        />
        <MyListItem
          label="Доставка"
          value={data?.shipping_price}
          icon={<FaTruckLoading />}
        />
        <MyListItem
          label="Статус"
          value={data?.statusDetail.name}
          icon={<MdContactless />}
        />
        <MyListItem bold label="Cумма" value={data?.total} icon={<BsCashStack />} />
        <Divider component="li" sx={{ mb: 0.5 }} />
        <MyListItem label="Заказчик" value={data?.user.name} icon={<FaUser />} />
        <MyListItem label="Телефон" value={data?.user.phone} icon={<MdSmartphone />} />
        <MyListItem label="Email" value={data?.user.email} icon={<MdEmail />} />
        <MyListItem label="Aдрес" value={data?.address} icon={<MdLocationOn />} />
        {/* <MyListItem label="Тип оплаты" value={data?.payment_type} icon={paymentIcon} /> */}

        {/* <MyListItem
          label={isNoDiscount ? 'Стоимость' : 'Стоимость до скидки'}
          value={priceConverter(data?.cost_before_discount)}
          icon={<BsTagsFill />}
        />

        <MyListItem label="Скидка" value={priceConverter(data?.discount)} icon={<FaPercentage />} />
        {!isNoDiscount && (
          <MyListItem
            label="Стоимость после скидки"
            value={priceConverter(data?.cost_after_discount)}
            icon={<BsTagsFill />}
          />
        )}
        <MyListItem
          label="Доставка"
          value={priceConverter(data?.delivery_price)}
          icon={<FaTruckLoading />}
        /> */}
        {/* <Divider component="li" sx={{ mb: 0.5 }} /> */}
        {/* <MyListItem bold label="Итого" value={priceConverter(data?.total_cost)} /> */}
      </List>
    </Card>
  )
}

export default OrderDetailInfo
