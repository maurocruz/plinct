import AppHeader from '@components/AppHeader'
import Loading from '@components/Loading'
import InfoPanel from '@components/InfoPanel'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ isLoading, children }) => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.map}>
        {isLoading ? <Loading /> : children}
      </div>
      <InfoPanel />
    </main>
  )
}

export default AppLayout
