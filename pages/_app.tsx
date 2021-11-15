import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { CacheProvider, EmotionCache } from '@emotion/react'

import createEmotionCache from '../lib/createEmotionCache'
import AppThemeProvider from '../providers/theme'
import AuthProvider from '../providers/auth'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import AppLayout from '@/layout'
import '@/public/global.css'
import '@/public/toastify.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const queryClientRef = React.useRef<QueryClient | undefined>(undefined)

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnMount: false } }
    })
  }

  return (
    <>
      <Head>
        <title key="head-title">Akat Seller</title>
        <link rel="icon" href="/favicon.svg" key="favicon" id="favicon" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <AppThemeProvider>
              <AuthProvider>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </AuthProvider>
            </AppThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
