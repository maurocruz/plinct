import Image from 'next/image'

import loader from '@public/x-loader.gif'

import * as styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image src={loader} alt="Loading..." width="100" height="100" />
    </div>
  )
}

export default Loading
