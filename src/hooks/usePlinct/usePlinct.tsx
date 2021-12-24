import axios from 'axios'
import { useEffect, useState } from 'react'

import useAppContext from '../../contexts/App'

import PlaceInterface from '../../interfaces/plinctApi/PlaceInterface'
import Data from '../../lib/Data'

const usePlinct = () => {

    const { setData } = useAppContext()

    const [ type, setType ] = useState('place')
    const [ queryStrings, setQueryStrings ] = useState(String)

    const [ isLoadingPlinct, setIsLoadPlinct ] = useState(false)


    useEffect(() => {
        if (isLoadingPlinct) {

            let longitude: number;
            let latitude: number;
            let lngMax: number
            let lngMin: number
            let latMax: number
            let latMin: number

            axios.get<PlaceInterface[]>(`https://plinct.com.br/api/${type}?${queryStrings}`)
            .then(response => {
                const dataPlace = response.data

                const data = new Data();

                dataPlace.map(item => {
                    // Max
                    lngMax = !longitude ? parseFloat(item.longitude) : (lngMax < parseFloat(item.longitude) ? parseFloat(item.longitude) : (lngMax < longitude ? longitude : lngMax ))
                    latMax = !latitude ? parseFloat(item.latitude) : (latMax < parseFloat(item.latitude) ? parseFloat(item.latitude) : (latMax < latitude ? latitude : latMax ))
                    // MIN
                    lngMin = !longitude ? parseFloat(item.longitude) : (lngMin > parseFloat(item.longitude) ? parseFloat(item.longitude) : (lngMin > longitude ? longitude : lngMin ))
                    latMin = !latitude ? parseFloat(item.latitude) : (latMin > parseFloat(item.latitude) ? parseFloat(item.latitude) : (latMin > latitude ? latitude : latMin ))

                    longitude = parseFloat(item.longitude)
                    latitude = parseFloat(item.latitude)
                   
                    data.setGeojson().geometry(longitude,latitude).properties('name', item.name).properties('id',item.idplace).saveFeature()
                })


                // MONTA VIEWPORT
                data.setViewPort().bbox(lngMax,latMax,lngMin,latMin);

                setData(data.ready())

                setIsLoadPlinct(false);
            })
        }
    },[isLoadingPlinct,type])

    return {
        setIsLoadPlinct,
        setType,
        setQueryStrings
    }

}

export default usePlinct

