import useAppContext from '@contexts/App'
import dynamic from 'next/dynamic';

import Map from '@components/Map'
import { useState } from 'react';
import { useEffect } from 'react';

const MapBox = dynamic(
  () => import('../components/Map/MapBox'),
  {
    loading: () => <p>Loading map</p>,
    ssr: false
  }
)

export default function Home() {

  const { userLocation } = useAppContext()

    return (
      <MapBox userLocation={userLocation} />
    )
}
