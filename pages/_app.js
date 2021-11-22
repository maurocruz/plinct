import '../src/styles/globals.css'

import { AppProvider } from '../src/contexts/App'
import AppContainer from '../src/containers/App'

function App({ Component, pageProps }) {
  return (
    <AppProvider {...pageProps}>
      <AppContainer>
        <Component />
      </AppContainer>
    </AppProvider>
  )
}

export default App
