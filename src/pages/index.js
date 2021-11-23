import useAppContext from '@contexts/App'

import Map from '@components/Map'

export default function Home() {
  const { collections } = useAppContext()

  return (
    <Map featureCollection={collections.profiles} />
  )
}
