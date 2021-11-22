import * as styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
}

export default AppLayout
