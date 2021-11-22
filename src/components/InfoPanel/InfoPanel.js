import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Draggable from 'react-draggable'

import useAppContext from '../../contexts/App'

import * as styles from './InfoPanel.module.css'

const InfoPanel = () => {
  const [visible, setVisible] = useState(true)
  const { collections, selected } = useAppContext()

  const feature = useMemo(() => {
    const { type, uid } = selected
    const feature = collections[`${type}s`]?.features.find(feature => feature.properties.uid === uid)
    return feature?.properties
  }, [collections, selected])

  useEffect(() => {
    if (feature) {
      setVisible(true)
    }
  }, [feature])

  const close = () => {
    setVisible(false)
  }

  return feature && visible ? (
    <Draggable>
      <div className={styles.info}>
        <div className={styles.close} onClick={close}>X</div>
        <div className={styles.avatar}>
          <Image src={`/data/${feature.uid}/avatar.jpg`} alt={feature.name} width='100' height='100' />
        </div>
        <strong className={styles.name}>{feature.name}</strong>
      </div>
    </Draggable>
  ) : null
}

export default InfoPanel
