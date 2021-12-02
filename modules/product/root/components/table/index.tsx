import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { useProductsAllQuery } from '@/hooks/queries/products/useProductsAllQuery'
import { convertPaymentTypes, formatDateDetail, getStatusColor } from '@/lib/utils'
import {
  Chip,
  Stack,
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
import { ImageWrapper, StyledLink, StyledTitle } from './styles'
import NextImage from 'next/image'
import { IProduct } from '@/hooks/queries/products/types'
import { ASSETS_URL } from '@/lib/constants'

const ProductRootTable = () => {
  const { data, status, isFetched, isFetching } = useProductsAllQuery()
  const router = useRouter()

  function resolvePathUrl(row: IProduct) {
    return `${ASSETS_URL}${row.image}`
  }
  const blank = '-------------'
  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Ид</TableHeaderCell>
            <TableHeaderCell align="left">Наименование</TableHeaderCell>
            <TableHeaderCell align="left">Цена </TableHeaderCell>
            <TableHeaderCell align="left">Цена </TableHeaderCell>
            <TableHeaderCell align="left">Цена</TableHeaderCell>
            <TableHeaderCell align="left">В наличии</TableHeaderCell>
            <TableHeaderCell align="left">Пол </TableHeaderCell>
            <TableHeaderCell align="left">Бренд</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TablePlaceholder
            status={status}
            length={data?.count}
            isFetching={isFetching && !isFetched}
          />

          {status === 'success' &&
            data?.rows?.map(row => (
              <TableRow
                hover
                key={row.prod_id}
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/products/${row.prod_id}`)}
              >
                <TableCell>{row.prod_id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ImageWrapper>
                      <NextImage
                        unoptimized
                        objectFit="contain"
                        height={50}
                        width={50}
                        src={resolvePathUrl(row)}
                      />
                    </ImageWrapper>
                    <Tooltip title={row.name_ru}>
                      <StyledTitle>{row.name_ru}</StyledTitle>
                    </Tooltip>
                  </Stack>
                </TableCell>
                <TableCell>$ {row?.price_usd?.toFixed(2)} </TableCell>
                <TableCell>TL {row?.price_lira?.toFixed(2)} </TableCell>
                <TableCell> {row.sale_price.toFixed(2)}</TableCell>
                <TableCell>{row.on_sale ? 'Да' : 'Нет'}</TableCell>
                <TableCell>{row.gender || blank}</TableCell>
                <TableCell>{row.trademark.title}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductRootTable
