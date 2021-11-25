import { useState, useEffect } from 'react'
import Draggable from 'react-draggable'

import EventInfo from '@components/EventInfo'
import ProfileInfo from '@components/ProfileInfo'

import useAppContext from '@contexts/App'

import * as styles from './InfoPanel.module.css'

const Panel = () => {
  const [visible, setVisible] = useState(true)
  const { selectedFeature, setSelected } = useAppContext()

  useEffect(() => {
    if (selectedFeature) {
      setVisible(true)
    }
  }, [selectedFeature])

  const close = () => {
    setVisible(false)
    setSelected(null)
  }

  // TO DO: allow to display "events" type
  const Info = {
    profile: ProfileInfo,
    event: EventInfo,
  }

  return selectedFeature && visible ? (
    <Draggable>
      <section className={styles.info}>
        <div className={styles.close} onClick={close}>X</div>
        <ProfileInfo />
      </section>
    </Draggable>
  ) : null
}

export default Panel
