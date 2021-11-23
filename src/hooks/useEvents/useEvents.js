import { useCallback } from 'react'

import { dataToGeoFeatureCollection } from '@lib/geo'

import staticData from '@public/events'

function useEvents () {
  const generateFeatureCollection = useCallback(() => {
    const { events } = staticData
    return dataToGeoFeatureCollection(events)
  }, [])

  return generateFeatureCollection()
}

export default useEvents
