import Head from 'next/head'

import useAppContext from '../src/contexts/App'

import Map from '../src/components/Map'

export default function Home() {
  const { collections } = useAppContext()

  return (
    <>
      <Head>
        <title>X-Map</title>
      </Head>

      <Map featureCollection={collections.profiles} />
    </>
  )
}
