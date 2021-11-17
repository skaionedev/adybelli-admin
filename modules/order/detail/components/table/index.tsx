import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { formatDateDetail } from '@/lib/utils'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { StyledTitle } from './styles'
import { MdModeEdit } from 'react-icons/md'
import { IOrderProductFull } from '@/hooks/queries/orders/types'
import OrderDetailProductStatus from '../product-status'

const OrderDetailTable = () => {
  const { data, status, isFetched, isFetching } = useOrdersOneQuery()
  const router = useRouter()

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">№</TableHeaderCell>
            <TableHeaderCell align="left">Наименование</TableHeaderCell>
            <TableHeaderCell align="left">Размер</TableHeaderCell>

            <TableHeaderCell align="left">Цена</TableHeaderCell>
            <TableHeaderCell align="left" style={{ minWidth: 80 }}>
              Кол-во
            </TableHeaderCell>
            <TableHeaderCell align="left">Сумма</TableHeaderCell>
            <TableHeaderCell align="left" style={{ minWidth: 120 }}>
              Статус
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TablePlaceholder
            status={status}
            length={data?.orderDetails.length}
            isFetching={isFetching && !isFetched}
          />

          {status === 'success' &&
            data?.orderDetails?.map(row => (
              <TableRow hover key={row.od_id}>
                <TableCell>{row.od_id}</TableCell>
                <TableCell align="left">
                  <Tooltip title={row.name_ru}>
                    <StyledTitle>{row.name_ru}</StyledTitle>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">{row.size}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.count}</TableCell>
                <TableCell align="left">{(row.price * row.count).toFixed(2)}</TableCell>
                <TableCell align="left">
                  <OrderDetailProductStatus product={row} />w
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetailTable
