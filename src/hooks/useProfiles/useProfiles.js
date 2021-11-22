import { useEffect, useState } from 'react'

import { geoFeaturesToCollection } from '../../lib/geo'

import data from '../../../data'

function useProfiles () {
  const [collection, setCollection] = useState(null)

  const generateFeatureCollection = () => {
    const { profiles } = data
    const featureCollection = geoFeaturesToCollection(profiles)
    setCollection(featureCollection)
  }

  useEffect(() => {
    generateFeatureCollection()
  }, [])

  return collection
}

export default useProfiles
