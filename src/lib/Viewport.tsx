
import { FlyToInterpolator } from 'react-map-gl';

class Viewport 
{
    private viewport = {
        type: "ViewPort",
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator(),
        fitBounds: []
    }

    zoom(zoom: number) {
        this.viewport['zoom'] = zoom
        return this
    }

    latitude(latitude: number) {
        this.viewport['latitude'] = latitude
        return this
    }

    longitude(longitude: number) {
        this.viewport['longitude'] = longitude
        return this
    }

    fitBounds(longitude: number, latitude: number) {
        this.viewport.fitBounds.push([ longitude, latitude ]);
    }

    ready() 
    {       
        return this.viewport
    }
}

export default Viewport
