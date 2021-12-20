import GeoJsonInterface from "./geoJson/GeoJsonInterface";
import ViewportInterface from "./ViewportInterface";

export default interface DataInterface {
    type: "Data",    
    viewport: ViewportInterface,
    geojson: GeoJsonInterface,
    properties: {}
}