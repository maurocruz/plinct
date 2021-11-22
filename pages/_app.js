import '../src/styles/globals.css'

import { AppProvider } from '../src/contexts/App'
import AppLayout from '../src/components/AppLayout'

function App({ Component, pageProps }) {
  return (
    <AppProvider {...pageProps}>
      <AppLayout>
        <Component />
      </AppLayout>
    </AppProvider>
  )
}

export default App
