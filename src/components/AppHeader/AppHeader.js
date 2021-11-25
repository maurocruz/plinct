import { useMemo } from 'react'
import Image from 'next/image'
import Select from 'react-select'

import useAppContext from '@contexts/App'

import * as styles from './AppHeader.module.css'

import logo from '@public/x-team-logo.svg'

const AppHeader = () => {
  const { collections, selectedFeature, selectedNode, setSelected } = useAppContext()

  const GROUP_LABEL_BY_PROFILES = 'By Profiles'
  const GROUP_LABEL_BY_LOCATIONS = 'By Locations'

  // TO DO: This only supports "profiles", the component should be abstracted
  const options = useMemo(() => {
    const features = collections?.profiles?.features || []
    const profiles = features.reduce((acc, cur) => [...acc, ...cur.properties.profiles], [])
    const profilesOptions = profiles.map(profile => {
      return {
        value: {
          type: 'profile',
          uid: profile.uid,
        },
        label: profile.name,
      }
    })
    const locationsOptions = features.reduce((acc, cur) => {
      const location = cur.properties.location
      return [
        ...acc,
        {
          value: {
            type: 'profile',
            location,
          },
          label: location,
        }
      ]
    }, [])
    const options = [
      {
        label: GROUP_LABEL_BY_PROFILES,
        options: profilesOptions,
      },
      {
        label: GROUP_LABEL_BY_LOCATIONS,
        options: locationsOptions,
      }
    ]
    return options
  }, [collections])

  const selectedOption = useMemo(() => {
    if (selectedNode?.uid) {
      const selectedOptionsGroup = options?.find(group => group.label === GROUP_LABEL_BY_PROFILES)
      const selected = selectedOptionsGroup?.options?.find(option => option.value.uid === selectedNode?.uid)
      return selected || null
    }
    if (selectedNode?.location) {
      const selectedOptionsGroup = options?.find(group => group.label === GROUP_LABEL_BY_LOCATIONS)
      const selected = selectedOptionsGroup?.options?.find(option => option.value.location === selectedNode?.location)
      return selected || null
    }
    return null
  }, [options, selectedNode])

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
