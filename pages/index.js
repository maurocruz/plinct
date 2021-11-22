import Head from 'next/head'

import useAppContext from '../src/contexts/App'

import AppLayout from '../src/components/AppLayout'
import Map from '../src/components/Map'

export default function Home() {
  const { collections } = useAppContext()

  return (
    <AppLayout>
      <Head>
        <title>X-Map</title>
      </Head>

      <Map featureCollection={collections.profiles} />
    </AppLayout>
  )
}
