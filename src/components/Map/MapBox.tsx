import React from "react";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import GeoJsonInterface from '../../interfaces/geoJson/GeoJsonInterface';

/**
 * COMPONENTE MAPA EM LEAFLET
 * 
 * @param param0 
 * @returns 
 */
const MapBox = ({newFeatureCollection}) => 
{
    // TOKEN
    const MAPBOX_TOKEN = "pk.eyJ1IjoibWF1cm9jcnV6IiwiYSI6ImNrdXI5bHpiaTNseTAydnQ0OWIwaHZlYmkifQ.4oPSaqbvl4ybOhV4ysjUdA";
    // TITLE SIZE
    const tilesize = "256";
    
    // CENTER DEFAULT BRASÍLIA
    let longitude = -47.889556334719465;
    let latitude = -15.791592864042546;
    let mapZoom = 5;

    // calcula o centro e o zoom do mapa
    const collection: GeoJsonInterface = newFeatureCollection;
    if (collection.features.length > 1) {

    } else {
        longitude = collection.features[0].geometry.coordinates[0];
        latitude = collection.features[0].geometry.coordinates[1];
        mapZoom = 14;
    }

    const center = { lng: longitude, lat: latitude }
    const name = "nome";

    return (
        <MapContainer 
            center={center} 
            zoom={mapZoom}        
            style={{ height: "100%", width: "100%" }}    
            dragging={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            attributionControl={true}
            zoomControl={true}>

            <TileLayer 
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                url={`https://api.mapbox.com/styles/v1/maurocruz/ckur99bp404ze15o0icj8kt6h/tiles/${tilesize}/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`}               
            />
             
            <GeoJSON data={newFeatureCollection} />

        </MapContainer>        
    )
}

export default MapBox;
