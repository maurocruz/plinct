import { useState, useMemo } from 'react'

import AppContext from './AppContext'

import AppLayout from '@components/AppLayout'

import useEvents from '@hooks/useEvents'
import usePlaces from '@hooks/usePlaces'
import useProfiles from '@hooks/useProfiles'

const AppProvider = ({ children }) => {
  const { events, isLoadingEvents } = useEvents()
  const { places, isLoadingPlaces } = usePlaces()
  const { profiles, isLoadingProfiles } = useProfiles()
  const [selectedNode, setSelected] = useState()

  const collections = useMemo(() => ({
    events,
    places,
    profiles,
  }), [events, places, profiles])

  const selectedFeature = useMemo(() => {
    const { type, uid } = selectedNode || {}
    const feature = collections[`${type}s`]?.features.find(feature => feature.properties.uid === uid)
    return feature?.properties
  }, [collections, selectedNode])

  const isLoadingData = isLoadingEvents || isLoadingPlaces || isLoadingProfiles

  return (
    <AppContext.Provider
      value={{
        collections,
        selectedFeature,
        setSelected,
      }}
    >
      <AppLayout isLoading={isLoadingData}>
        {children}
      </AppLayout>
    </AppContext.Provider>
  )
}

export default AppProvider
