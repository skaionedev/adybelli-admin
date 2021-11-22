import AppBreadcrumbs from '@/components/common/breadcrumbs'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import { Card } from '@mui/material'
import React from 'react'

const ProductDetailContainer = () => {
  const { data } = useProductsOneQuery()
  console.log({ data })

  return (
    <>
      <AppBreadcrumbs current={13}></AppBreadcrumbs>
      <Card variant="outlined"></Card>
    </>
  )
}

export default ProductDetailContainer
