import { useEffect, useState, useMemo } from 'react'
import { Map } from 'google-maps-react'
import { MarkerClusterer } from "@googlemaps/markerclusterer"

import Loading from '../Loading'

import useAppContext from '@contexts/App'

const mapStyles = {
  width: '100%',
  height: 'calc(100vh - 80px)',
}

let googleMap

export default function MapContainer({ google, featureCollection, newFeatureCollection }) {

  if (newFeatureCollection) featureCollection = newFeatureCollection;

  // dafaults
  const zoom = 14;



  const { setSelected, selectedFeature } = useAppContext()
  const [map, setMap] = useState()

  useEffect(() => {
    if (!googleMap) {
      return null
    }

    if (selectedFeature) {
      const lng = selectedFeature.coordinates[0]
      const lat = selectedFeature.coordinates[1]
      googleMap.setCenter({ lat, lng })
      googleMap.setZoom(9)
    } else {
      googleMap.fitBounds(bounds)
    }
  }, [selectedFeature, bounds])

  const bounds = useMemo(() => new google.maps.LatLngBounds(), [google])

  const loadGeoData = (mapProps, map) => {
    googleMap = map

    const markerClusterer = new MarkerClusterer(map, null, { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' })
    markerClusterer.setMap(map)
    google.maps.event.addListener(map.data, 'addfeature', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        const marker = new google.maps.Marker({
          position: event.feature.getGeometry().get(),
          title: event.feature.getProperty('name'),
          map: map
        })

        google.maps.event.addListener(marker, 'click', function (marker, event) {
          return function() {
            const type = event.feature.getProperty('type')
            const location = event.feature.getProperty('location')
            setSelected({ type, location })
          }
        }(marker, event))

        markerClusterer.addMarker(marker)
        bounds.extend(event.feature.getGeometry().get())
        map.fitBounds(bounds)
        map.setCenter(event.feature.getGeometry().get())
      }
    })
    map.data.addGeoJson(featureCollection)
    map.setZoom(zoom)
    map.data.setMap(null)
  }

  return featureCollection ? (
    <Map
      google={google}
      style={mapStyles}
      onReady={loadGeoData}
    />
  ) : (
    <Loading />
  )
}
