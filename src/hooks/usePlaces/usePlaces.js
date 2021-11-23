import { useEffect, useState } from 'react'

import { dataToGeoFeatureCollection } from '@lib/geo'
import { getSamples } from '@lib/random'

import schema from './schema'

function usePlaces () {
  const [collection, setCollection] = useState(null)

  const generateFeatureCollection = () => {
    const allMarkers = getSamples(schema, 3)
    const featureCollection = dataToGeoFeatureCollection(allMarkers)
    setCollection(featureCollection)
  }

  useEffect(() => {
    generateFeatureCollection()
  }, [])

  return collection
}

export default usePlaces
