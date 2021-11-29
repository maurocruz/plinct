import AppHeader from '@components/AppHeader'
import Loading from '@components/Loading'
import InfoPanel from '@components/InfoPanel'
import Modal from '@components/Modal'
import ProfileForm from '@components/ProfileForm'

import useAppContext from '@contexts/App'

import * as styles from './AppLayout.module.css'

const AppLayout = ({ isLoading, children }) => {
  const { isModalVisible, toggleModal } = useAppContext()
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.map}>
        {isLoading ? <Loading /> : children}
      </div>
      <InfoPanel />
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          <ProfileForm />
        </Modal>
      )}
    </main>
  )
}

export default AppLayout
