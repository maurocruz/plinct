import { useState, useMemo } from 'react'

import AppContext from './AppContext'

import usePlaces from '@hooks/usePlaces'
import useProfiles from '@hooks/useProfiles'

const AppProvider = ({ children }) => {
  const places = usePlaces()
  const profiles = useProfiles()
  const [selectedNode, setSelected] = useState()

  const collections = useMemo(() => ({
    places,
    profiles,
  }), [places, profiles])

  const selectedFeature = useMemo(() => {
    const { type, uid } = selectedNode || {}
    const feature = collections[`${type}s`]?.features.find(feature => feature.properties.uid === uid)
    return feature?.properties
  }, [collections, selectedNode])

  return (
    <AppContext.Provider
      value={{
        collections,
        selectedFeature,
        setSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
