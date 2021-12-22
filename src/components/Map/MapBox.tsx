
import React, { useEffect, useState } from "react";
import ReactMapGL, { MapEvent } from 'react-map-gl';

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from '../EventInfo/EventInfo'
import Points from "./Points";

import DataInterface from "../../interfaces/DataInterface";
import { FeatureInterface } from "../../interfaces/geoJson/GeoJsonInterface";
import { ChangeTileset, Navigation, UserLocation } from "./Controls";

/**  
 * COMPONENT MAP EM MAPBOX
 * 
 * @param param0 
 * @returns 
 */
const MapBox = ({ data }) => 
{    
    const DATA = data as DataInterface;

    const mapStreet = "mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h"
    const mapSattelite = "mapbox://styles/maurocruz/ckxgf6qdl0p4g14rrqmkr7vh5"

    const [ viewport, setViewport ] = useState(data.viewport);
    const [ rightButton, setRightButton ] = useState<MapEvent>(null)
    const [ eventInfo, setEventInfo ] = useState(null);
    const [ mapStyle, setMapStyle ] = useState(mapStreet)

    useEffect(()=>{
        setViewport(data.viewport);
    },[data])

    function _onClick(e: MapEvent) {
        if (e.rightButton) {
            setRightButton(e);
        }
    }

    return (
        <ReactMapGL
            mapStyle={mapStyle} 
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={(viewport: any) => setViewport(viewport)}
            onClick={_onClick}      
        >
            
            {DATA.geojson.features.map((feature: FeatureInterface) => { 
                return <Points key={feature.properties.id} feature={feature} /> 
            })}

            <UserLocation />

            <Navigation />

            {rightButton && 
                <TooltipRightButton 
                    mapEvent={rightButton} 
                    setRightButton={setRightButton} 
                    setEventInfo={setEventInfo}
                />
            }

            {eventInfo && <EventInfo>{eventInfo}</EventInfo>}

            <ChangeTileset mapStyle={mapStyle} setMapStyle={setMapStyle} mapStreet={mapStreet} mapSattelite={mapSattelite} />

        </ReactMapGL>
    )
}

export default MapBox;
