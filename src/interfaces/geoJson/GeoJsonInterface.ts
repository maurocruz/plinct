

interface Geometry {
    type: string,
    coordinates: [number, number]
}

interface Feature {
    type: string,
    geometry: Geometry,
    properties: {} 

}

interface GeoJsonInterface {
    type: String
    features: Feature[]
}

export default GeoJsonInterface;