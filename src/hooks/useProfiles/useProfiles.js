import { useEffect, useState } from 'react'

import { dataToGeoFeatureCollection } from '../../lib/geo'

import data from '../../../public/data'

function useProfiles () {
  const [collection, setCollection] = useState(null)

  const generateFeatureCollection = () => {
    const { profiles } = data
    const featureCollection = dataToGeoFeatureCollection(profiles)
    setCollection(featureCollection)
  }

  useEffect(() => {
    generateFeatureCollection()
  }, [])

  return collection
}

export default useProfiles
