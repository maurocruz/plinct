import { useEffect, useState } from "react";
import Data from "../../lib/Data";

/**
 * BUSCA A LOCALIZAÇÂO DO USUÁRIO
 * 
 * @returns 
 */

const useLocation = () => {

  const data = new Data();
  data.setViewPort().latitude(-15.791592864042546).longitude(-47.889556334719465).zoom(8)
  data.setGeojson().geometry(-47.889556334719465, -15.791592864042546).properties('name','Default location').saveFeature()

  const [ dataUseLocation, setDataUserLocation ] = useState(data.ready());

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude; 
        const longitude = position.coords.longitude;   

        const data = new Data();
        data.setViewPort().latitude(latitude).longitude(longitude).zoom(13)
        data.setGeojson().geometry(longitude,latitude).properties('name','User Location').saveFeature()

        setDataUserLocation(data.ready());   
      });    
  },[])

  return {
    dataUseLocation
  }
}

export default useLocation;