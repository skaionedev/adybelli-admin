import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'
import { parseCookies, setCookie } from 'nookies'
import React from 'react'
import { AppThemeContextType, ThemeType } from './types'
import { getTheme } from './getTheme'
import { ConfirmProvider } from 'material-ui-confirm'
import { APP_THEME } from '@/lib/constants'
import { getResolution } from '@/lib/utils'

const ThemeContext = React.createContext<AppThemeContextType>({
  mode: 'dark',
  toggleTheme: () => undefined
})

const AppThemeProvider: React.FC = ({ children }) => {
  const cookies = parseCookies({})
  const isMobile = getResolution() === 'MOBILE'

  let initialThemeMode = cookies[APP_THEME] ? (cookies[APP_THEME] as ThemeType) : 'dark'

  if (process.browser && cookies.APP_THEME) {
    initialThemeMode = cookies.APP_THEME as ThemeType
  }

  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>(initialThemeMode)

  React.useEffect(() => {
    setCookie({}, APP_THEME, themeMode, {
      path: '/',
      maxAge: 10 * 365 * 24 * 60 * 60,
      secure: process.env.NODE_ENV !== 'development'
    })
  }, [])

  const toggleTheme = () => {
    const mode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(mode)
    setCookie({}, APP_THEME, mode, {
      path: '/',
      secure: process.env.NODE_ENV !== 'development'
    })
  }

  const theme = getTheme(themeMode)

  const memoedValue = React.useMemo(
    () => ({
      mode: themeMode,
      toggleTheme
    }),
    [themeMode]
  )

  return (
    <ThemeContext.Provider value={memoedValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider
          defaultOptions={{
            confirmationText: 'Ок',
            cancellationText: 'Отмена',
            title: 'Внимание',
            description: 'Вы уверены что хотите сделать это?'
          }}
        >
          {children}
        </ConfirmProvider>
        <ToastContainer
          position={isMobile ? 'top-center' : 'top-right'}
          pauseOnHover
          hideProgressBar={false}
          theme={memoedValue.mode}
          toastStyle={{
            zIndex: 99999
          }}
        />
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppThemeProvider

export const useThemeContext = (): AppThemeContextType => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a AppThemeProvider')
  }
  return context
}
