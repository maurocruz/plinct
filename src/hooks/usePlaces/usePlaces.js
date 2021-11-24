import { useEffect, useState } from 'react'

import { dataToGeoFeatureCollection } from '@lib/geo'
import { getSamples } from '@lib/random'

import schema from './schema'

function usePlaces () {
  const [isLoading, setIsLoading] = useState(true)
  const [featureCollection, setFeatureCollection] = useState(null)

  const generateFeatureCollection = () => {
    const allMarkers = getSamples(schema, 3)
    const featureCollection = dataToGeoFeatureCollection(allMarkers)
    setFeatureCollection(featureCollection)
    setIsLoading(false)
  }

  useEffect(() => {
    generateFeatureCollection()
  }, [])

  return {
    places: featureCollection,
    isLoadingPlaces: isLoading,
  }
}

export default usePlaces
