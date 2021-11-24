import { useEffect, useState } from 'react'

import { dataToGeoFeatureCollection } from '@lib/geo'

import staticData from '@public/events'

function useEvents () {
  const [isLoading, setIsLoading] = useState(true)
  const [featureCollection, setFeatureCollection] = useState(null)

  const generateFeatureCollection = () => {
    const { events } = staticData
    const featureCollection = dataToGeoFeatureCollection(events)
    setFeatureCollection(featureCollection)
    setIsLoading(false)
  }

  useEffect(() => {
    generateFeatureCollection()
  }, [])

  return {
    events: featureCollection,
    isLoadingEvents: isLoading,
  }
}

export default useEvents
