import { Map, GoogleApiWrapper } from 'google-maps-react'

export function MapContainer({ google }) {
  const mapStyles = {
    width: '100%',
    height: '100%'
  }

  return (
    <Map
      google={google}
      initialCenter={{
        lat: 10.99835602,
        lng: 77.01502627
      }}
      zoom={11}
      style={mapStyles}
    />
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY
})(MapContainer)
