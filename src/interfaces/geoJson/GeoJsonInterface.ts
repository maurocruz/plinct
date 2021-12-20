

interface Geometry {
    type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon' | 'GeometryCollection',
    coordinates: [number, number]
}

interface Feature {
    type: 'Feature',
    geometry: Geometry,
    properties: {
        name: string
    } 

}

interface GeoJsonInterface {
    type: 'FeatureCollection'
    features: Feature[]
}

export default GeoJsonInterface;