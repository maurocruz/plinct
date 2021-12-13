import React, { useEffect, useState } from "react";
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { Icon } from '@iconify/react';


/**
 * COMPONENTE MAPA EM LEAFLET
 * 
 * @param param0 
 * @returns 
 */
const MapBox = ({ userLocation}) => 
{
    // TOKEN
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    const [ features, setFeatures ] = useState(userLocation.features);

    // calcula o centro e o zoom do mapa
    const longitude = userLocation.features[0].geometry.coordinates[0];
    const latitude = userLocation.features[0].geometry.coordinates[1];
    const mapZoom = userLocation.features[0].properties.zoom;
    
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: mapZoom,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator()
    });

    useEffect(()=>{
        setViewport({
            ...viewport,
            latitude: userLocation.features[0].geometry.coordinates[1],
            longitude: userLocation.features[0].geometry.coordinates[0],
            zoom: userLocation.features[0].properties.zoom
        })
        setFeatures(userLocation.features);        
    },[userLocation])

    const styleTooltip = {
        backgroundColor: 'rgba(255,255,255,0.7)',
        fontSize: '14px',
        padding: '3px 5px',
        marginLeft: '25px',
        marginTop: '-10px'
    }

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
                    <div className="mapboxgl-user-location-dot mapboxgl-marker mapboxgl-marker-anchor-center" style={{transform: 'translate(-50%, -50%) translate(540px, 469px) rotateX(0deg) rotateZ(0deg);'}}></div>
                </Marker>
            )

        })}

        </ReactMapGL>
    )
}

export default MapBox;
