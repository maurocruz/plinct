import { useState, useMemo } from 'react'

import AppContext from './AppContext'

import AppLayout from '@components/AppLayout'

import useEvents from '@hooks/useEvents'
import usePlaces from '@hooks/usePlaces'
import useProfiles from '@hooks/useProfiles'
import useModal from '@hooks/useModal'

const AppProvider = ({ children }) => {
  const { events, isLoadingEvents } = useEvents()
  const { places, isLoadingPlaces } = usePlaces()
  const { profiles, isLoadingProfiles } = useProfiles()
  const { isModalVisible, toggleModal } = useModal()

  const [selectedNode, setSelected] = useState(null)

  const collections = useMemo(() => ({
    events,
    places,
    profiles,
  }), [events, places, profiles])

  const selectedFeature = useMemo(() => {
    const { type, uid, location } = selectedNode || {}
    const features = collections[`${type}s`]?.features || []
    if (location) {
      const feature = features.find(feature => feature.properties?.location === location)
      const profiles = feature?.properties
      return profiles
    }
    if (uid) {
      // This code only works for "profiles" at the moment
      const feature = features.find(feature => feature.properties?.profiles?.find(profile => profile.uid === uid))
      const profile = feature?.properties?.profiles?.find(profile => profile.uid === uid)
      return profile
    }
    return null
  }, [collections, selectedNode])

  const isLoadingData = isLoadingEvents || isLoadingPlaces || isLoadingProfiles

  return (
    <AppContext.Provider
      value={{
        collections,
        selectedFeature,
        selectedNode,
        setSelected,
        isModalVisible,
        toggleModal,
      }}
    >
      <AppLayout isLoading={isLoadingData}>
        {children}
      </AppLayout>
    </AppContext.Provider>
  )
}

export default AppProvider
