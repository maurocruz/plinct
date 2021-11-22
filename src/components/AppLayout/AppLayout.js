import AppHeader from '@components/AppHeader'
import InfoPanel from '@components/InfoPanel'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.map}>
        {children}
      </div>
      <InfoPanel />
    </main>
  )
}

export default AppLayout
