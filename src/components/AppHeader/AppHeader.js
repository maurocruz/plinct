import { useMemo } from 'react'
import Image from 'next/image'
import Select from 'react-select'

import useAppContext from '@contexts/App'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { collections, selectedFeature, setSelected } = useAppContext()

  const options = useMemo(() => {
    return collections?.profiles?.features?.map(feature => {
      const { properties } = feature
      return properties && {
        value: {
          type: properties.type,
          uid: properties.uid,
        },
        label: properties.name,
      }
    })
  }, [collections])

  const selectedOption = useMemo(() => {
    return options?.find(option => option.value.uid === selectedFeature?.uid)
  }, [options, selectedFeature])

  const handleChange = option => {
    setSelected(option?.value)
  }

  return (
    <div className={styles.component}>
      <div className={styles.logo}>
        <Image src={logo} width="109" alt="X-Team" />
      </div>
      <div className={styles.selector}>
        <Select
          instanceId="profile-selector"
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isClearable
          isSearchable
          placeholder={options ? 'Select profile...' : 'Loading profiles...'}
          isDisabled={!options}
        />
      </div>
    </div>
  )
}

export default AppHeader
