import React, { useEffect, useState } from "react";
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';

/**
 * COMPONENTE MAPA EM LEAFLET
 * 
 * @param param0 
 * @returns 
 */
const MapBox = ({ location }) => 
{
    // TOKEN
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    const [ features, setFeatures ] = useState(location.features);

    // calcula o centro e o zoom do mapa
    const longitude = location.features[0].geometry.coordinates[0];
    const latitude = location.features[0].geometry.coordinates[1];
    const mapZoom = location.features[0].properties.zoom ?? 8;
    
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: mapZoom,
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator()
    });

    useEffect(()=>{
        setViewport({
            ...viewport,
            latitude: location.features[0].geometry.coordinates[1],
            longitude: location.features[0].geometry.coordinates[0],
            zoom: location.features[0].properties.zoom ?? 12
        })
        setFeatures(location.features);        
    },[location])

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
        >
        
        {features.map((response: any)=>{
            const latitude = response.geometry.coordinates[1];
            const longitude = response.geometry.coordinates[0];
            const name = response.properties.name;

            return (
                <Marker key={latitude} latitude={latitude} longitude={longitude} offsetLeft={-7.5} offsetTop={-7.5}>
                    <div className="mapboxgl-user-location-dot mapboxgl-marker mapboxgl-marker-anchor-center"></div>
                </Marker>
            )

        })}

        </ReactMapGL>
    )
}

export default MapBox;
