import axios from 'axios'
import { SWRConfig } from 'swr'
import Head from 'next/head'

import { AppProvider } from '@contexts/App'

import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => axios.get(resource, init).then(res => res.data),
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <AppProvider {...pageProps}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
          <title>Plinct</title>
        </Head>
        <Component />
      </AppProvider>
    </SWRConfig>
  )
}

export default App
