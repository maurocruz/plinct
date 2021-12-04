import useAppContext from '@contexts/App'
import dynamic from 'next/dynamic';

import Map from '@components/Map'

const MapBox = dynamic(
  () => import('../components/Map/MapBox'),
  {
    loading: () => <p>Loading map</p>,
    ssr: false
  }
)

export default function Home() {
  const { collections, newFeatureCollection } = useAppContext()

  if (newFeatureCollection) {
    return (
      <MapBox newFeatureCollection={newFeatureCollection} />
    )
  }

  return (
    <Map featureCollection={collections.profiles} />
  )
}
