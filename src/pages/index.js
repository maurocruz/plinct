import useAppContext from '@contexts/App'

import dynamic from 'next/dynamic';

const MapBox = dynamic(
  () => import('../components/Map/MapBox'),
  {
    loading: () => <p>Loading map</p>,
    ssr: false
  }
)

export default function Home() {
  const { data } = useAppContext()  

    return (
      <MapBox data={data} />
    )
}
