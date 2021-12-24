
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMapGL, { MapEvent, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from '../EventInfo/EventInfo'
import Points from "./Points";

import DataInterface from "../../interfaces/DataInterface";
import { FeatureInterface } from "../../interfaces/geoJson/GeoJsonInterface";
import { ChangeTileset } from "./Controls";

/**  
 * COMPONENT MAP EM MAPBOX
 * 
 * @param param0 
 * @returns 
 */
const MapBox = ({ data }) => 
{    
    const DATA = data as DataInterface;

    // VALUES QUE DEVEM SER DIMÂMICOS NO FUTURO
    const country = 'br' // país ou local cuja a busca do map deve ser restrito


    const mapStreet = "mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h"
    const mapSattelite = "mapbox://styles/maurocruz/ckxgf6qdl0p4g14rrqmkr7vh5"

    const [ viewport, setViewport ] = useState(data.viewport);
    const [ rightButton, setRightButton ] = useState<MapEvent>(null)
    const [ eventInfo, setEventInfo ] = useState(null);
    const [ mapStyle, setMapStyle ] = useState(mapStreet)

    const mapRef = useRef();

    useEffect(()=>{
        setViewport(data.viewport);
    },[data])

    function _onClick(e: MapEvent) {
        if (e.rightButton) {
            setRightButton(e);
        }
    }

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    return (
        <ReactMapGL
            ref={mapRef}
            mapStyle={mapStyle} 
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={handleViewportChange}
            onClick={_onClick}
        >
            
            {DATA.geojson.features.map((feature: FeatureInterface) => { 
                return <Points key={feature.properties.id} feature={feature} /> 
            })}

            <Geocoder
                mapRef={mapRef}
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                onViewportChange={handleViewportChange}
                types="place"
                countries={country}
                placeholder={"Procurar por local..."}
            />

            <GeolocateControl style={{top: 5, left: 5}}
                showAccuracyCircle={false}
                auto
             />

            <NavigationControl style={{ top: 40, left: 5 }}
                showCompass={false}
            />

            <ScaleControl style={{left: 20, bottom: 50 }} />


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
