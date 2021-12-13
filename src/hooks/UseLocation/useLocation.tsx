import { useEffect, useState } from "react";
import GeoJson from "../../lib/GeoJson";


/**
 * BUSCA A LOCALIZAÇÂO DO USUÁRIO
 * 
 * @returns 
 */

const useLocation = () => {

  const startLocation = new GeoJson();
  startLocation.createPoint(-47.889556334719465, -15.791592864042546);
  startLocation.properties('zoom', 8);
  startLocation.properties('name','Default location');

  const [ userLocation, setUserLocation ] = useState(startLocation.ready());

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position){    
        const location = new GeoJson();    
        const latitude = position.coords.latitude; 
        const longitude = position.coords.longitude;    
        location.createPoint(longitude,latitude);
        location.properties('zoom',13);
        location.properties('name','User location');
        setUserLocation(location.ready());        
      });    
  },[])

  return {
      userLocation
  }
}

export default useLocation;