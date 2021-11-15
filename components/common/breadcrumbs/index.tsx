import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'

import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'

interface Props {
  back?: string
  backLink?: string
  current?: string | number
}

const AppBreadcrumbs = (props: Props) => {
  const { back = 'назад', current, backLink = '/' } = props
  const router = useRouter()
  return (
    <StyledBreadcrumbs>
      <Link
        onClick={() => router.back()}
        underline="none"
        color="inherit"
        component="div"
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',

          transition: 'opacity .25s ease-out',
          ':hover': {
            opacity: 0.85
          }
        }}
      >
        <BsArrowLeft size={18} style={{ marginRight: 6 }} />
        {back}
      </Link>

      {current && (
        <Typography noWrap color="text.primary">
          {current}
        </Typography>
      )}
    </StyledBreadcrumbs>
  )
}

export default AppBreadcrumbs

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-bottom: 16px;
  ol {
    flex-wrap: nowrap;
    position: relative;
    overflow: hidden;
    max-width: calc(100vw - 24px);
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-left: 2px;
  }
`
