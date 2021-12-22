/**
 * 
 * COMPONENT MAP EM MAPBOX
 * 
 */

import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { MapEvent } from 'react-map-gl';

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from '../EventInfo/EventInfo'
import Points from "./Points";

import DataInterface from "../../interfaces/DataInterface";
import { FeatureInterface } from "../../interfaces/geoJson/GeoJsonInterface";
import { Navigation, UserLocation } from "./Controls";

/**  
 * @param param0 
 * @returns 
 */
const MapBox = ({ data }) => 
{    
    const DATA = data as DataInterface;
    //const [ DATA, setDATA ] = useState<DataInterface>(data);

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
    
    // street style
    // mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h
    // satellite style
    // mapbox://styles/maurocruz/ckxgf6qdl0p4g14rrqmkr7vh5

    //<UserLocation setDATA={SetDATA} />

    //console.log(DATA.geojson.features)

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

            </ReactMapGL>
        </div>
    )
}

export default MapBox;
