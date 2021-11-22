import { useState, useEffect } from 'react'
import { Map } from 'google-maps-react'

import Loading from '../Loading'

const mapStyles = {
  width: '100%',
  height: '100%'
}

export default function MapContainer({ google, featureCollection }) {
  const [locationX, setLocationX] = useState(0)
  const [locationY, setLocationY] = useState(0)
  const [locationRendered, setLocationRendered] = useState(false)
  const [zoom, setZoom] = useState(3)

  const showPosition = position => {
    setLocationX(position.coords.latitude)
    setLocationY(position.coords.longitude)
    setLocationRendered(true)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, () => setLocationRendered(true))
    }
  }

  const loadGeoData = (mapProps, map) => {
    map.data.addGeoJson(featureCollection)
  }

  useEffect(() => {
    getUserLocation()
  }, []) // eslint-disable-line

  return locationRendered ? (
    <Map
      google={google}
      initialCenter={{
        lat: locationX,
        lng: locationY
      }}
      zoom={zoom}
      style={mapStyles}
      onReady={loadGeoData}
    />
  ) : (
    <Loading />
  )
}
