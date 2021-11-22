import { useMemo } from 'react'
import Image from 'next/image'

import useAppContext from '../../contexts/App'

import * as styles from './InfoPanel.module.css'

const InfoPanel = () => {
  const { collections, selected } = useAppContext()

  const feature = useMemo(() => {
    const { type, uid } = selected
    const feature = collections[`${type}s`]?.features.find(feature => feature.properties.uid === uid)
    return feature?.properties
  }, [collections, selected])

  return feature ? (
    <div className={styles.info}>
      <strong>{feature.name}</strong>
      <div className={styles.avatar}>
        <Image src={`/data/${feature.uid}/avatar.jpg`} alt={feature.name} width='100' height='100' />
      </div>
    </div>
  ) : null
}

export default InfoPanel
