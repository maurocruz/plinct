/**
 * 
 * COMPONENT MAP EM MAPBOX
 * 
 */

import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { LayerProps, NavigationControl, MapEvent, Marker } from 'react-map-gl';
import { Icon } from '@iconify/react';

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from '../EventInfo/EventInfo'
import DataInterface from "../../interfaces/DataInterface";

// LAYER PROPERTIES
const layerProps: LayerProps = {
    id: 'point-default',
    type: 'circle',
    paint: {
        'circle-radius': 7, 
        'circle-color': '#1da1f2',
        "circle-opacity": 0.9,
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 3,
        'circle-stroke-opacity': 0.9
    }
};

// NAVIGATION STYLE
const navigationControlerStyle = {
    top: '5px',
    left: '5px'
}

/**  
 * @param param0 
 * @returns 
 */
const MapBox = ({ data }) => 
{    
    const DATA = data as DataInterface;

    const [ viewport, setViewport ] = useState(data.viewport);
    const [ rightButton, setRightButton ] = useState<MapEvent>(null)
    const [ eventInfo, setEventInfo ] = useState(null);


    const reactMap = useRef();

    // for get map size
    const mapContainer = useRef<HTMLDivElement>()

    useEffect(()=>{
        setViewport(data.viewport);

    },[data])

    function _onClick(e: MapEvent) {
        if (e.rightButton) {
            setRightButton(e);
        }
    }
    
    return (
        <div ref={mapContainer}>
            <ReactMapGL
                ref={reactMap}
                mapStyle="mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={(viewport: any) => setViewport(viewport)}
                onClick={_onClick}      
            >
                {DATA.geojson.features.map((feature) => {
                    const coordinates = feature.geometry.coordinates
                    const lng = coordinates[0]
                    const lat = coordinates[1]
                    return (
                        <Marker key={lng+lat} longitude={lng} latitude={lat} offsetLeft={-15} offsetTop={-20}>
                            <Icon icon="gis:poi" color="#006ed6" width='30px' />
                            <div style={{fontSize: '0.7em', backgroundColor: 'rgba(255,255,255,0.8)'}}>{feature.properties.name}</div>
                        </Marker>
                    )
                })}

                <NavigationControl 
                    style={navigationControlerStyle}
                    showCompass={false}
                />

                {rightButton && <TooltipRightButton mapEvent={rightButton} setRightButton={setRightButton} setEventInfo={setEventInfo}/>}

                {eventInfo && <EventInfo>{eventInfo}</EventInfo>}

            </ReactMapGL>
        </div>
    )
}

export default MapBox;
