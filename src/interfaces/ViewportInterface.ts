import GeoJsonInterface from './geoJson/GeoJsonInterface'

interface ViewportInterface {
    type: string,
    fitBounds: [[number,number],[number,number]],
    latitude: number,
    longitude: number,
    zoom: number
}

export default ViewportInterface