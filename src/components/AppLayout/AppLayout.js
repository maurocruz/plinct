import InfoPanel from '../InfoPanel'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  return (
    <main className={styles.container}>
      {children}
      <InfoPanel />
    </main>
  )
}

export default AppLayout
