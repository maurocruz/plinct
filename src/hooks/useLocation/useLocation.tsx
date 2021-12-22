import { useEffect, useState } from "react";

import useAppContext from '../../contexts/App'

import Data from "../../lib/Data";

/**
 * BUSCA A LOCALIZAÇÂO DO USUÁRIO
 * 
 * @returns user data location 
 */

const useLocation = () => {
  const { setData } = useAppContext()
  const [ dataUseLocation, setDataUserLocation ] = useState(null);

  // user location
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude; 
        const longitude = position.coords.longitude;   

        const data = new Data();
        
        data.setViewPort().latitude(latitude).longitude(longitude).zoom(13)

        data.setGeojson()
          .geometry(longitude,latitude)
          .properties('style','useLocation')
          .properties('id','useLocation')
          .saveFeature();
        
        setData(data.ready())

        setDataUserLocation(data.ready());   
      });    
  },[])

  return {
    dataUseLocation
  }
}

export default useLocation;