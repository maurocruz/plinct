import { useMemo } from 'react'
import Image from 'next/image'
import Select from 'react-select'

import useAppContext from '@contexts/App'

import * as styles from './AppHeader.module.css'

import logo from '../../../public/x-team-logo.svg'

const AppHeader = () => {
  const { collections, setSelected } = useAppContext()

  const options = useMemo(() => {
    return collections?.profiles?.features.map(feature => {
      const { properties } = feature
      return {
        value: {
          type: properties.type,
          uid: properties.uid,
        },
        label: properties.name,
      }
    })
  }, [collections])

  const handleChange = option => {
    setSelected(option.value)
  }

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.selector}>
        <Select options={options} onChange={handleChange} />
      </div>
    </div>
  )
}

export default AppHeader
