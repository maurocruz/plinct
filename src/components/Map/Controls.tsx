import { Icon } from "@iconify/react"
import { NavigationControl } from "react-map-gl"
import useAppContext from "../../contexts/App"
import useLocation from "../../hooks/useLocation/useLocation"

const Navigation = () => {
    return (
        <NavigationControl 
            style={{ top: '40px', left: '5px' }}
            showCompass={false}
        />
    )
}

const UserLocation = () => {

    const { setData } = useAppContext()

    const { dataUseLocation } = useLocation()

    function _toUseLocation(e: any) { 
        if (dataUseLocation) {
            setData(dataUseLocation)
        } 
        e.preventDefault();
    }

    return (
        <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
            <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                <button className="mapboxgl-ctrl-icon" type="button" title="Use location" onClick={_toUseLocation} >
                    <Icon icon="gis:location-arrow" width="18" />
                </button>
            </div>
        </div>
    )
}

export { Navigation, UserLocation }