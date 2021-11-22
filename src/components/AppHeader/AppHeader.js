import Image from 'next/image'

import * as styles from './AppHeader.module.css'

import logo from '../../../public/x-team-logo.svg'

const AppHeader = () => {
  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
    </div>
  )
}

export default AppHeader
