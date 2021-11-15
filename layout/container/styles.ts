import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPaper = styled(Paper)`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
`

export const StyledBox = styled('div')`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => theme.breakpoints.up('xs')} {
    padding: 74px 8px 8px 8px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 90px 20px 20px 20px;
  }
`
