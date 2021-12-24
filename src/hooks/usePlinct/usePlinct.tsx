import axios from 'axios'
import { useEffect, useState } from 'react'

import useAppContext from '../../contexts/App'

import PlaceInterface from '../../interfaces/plinctApi/PlaceInterface'
import Data from '../../lib/Data'

const usePlinct = () => {

    const { setData } = useAppContext()

    const [ type, setType ] = useState('place')
    const [ queryStrings, setQueryStrings ] = useState(String)
    const [ mapZoom, setMapZoom ] = useState(14)

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


                // TODO calcular o centro do mapa com múlitplas features
                const numberOfItems = dataPlace.length;
                const lngCenter = (lngMax + lngMin) / 2
                const latCenter = (latMax + latMin) / 2

                const lngDiff = lngMax - lngMin 
                const latDiff = latMax - latMin 

                const DiffMax = lngDiff > latDiff ? lngDiff : latDiff

                console.log(DiffMax)

                const zoom = 
                    DiffMax > 3 ? 7.3
                    : DiffMax > 2.3 ? 7.5
                    : DiffMax > 2 ? 8
                    : DiffMax > 1 ? 9
                    : DiffMax > 0.2 ? 11 
                    : DiffMax > 0.007 ? 16 
                    : 18

                data.setViewPort().latitude(latCenter).longitude(lngCenter).zoom(zoom)

                setData(data.ready())

                setIsLoadPlinct(false);
            })
        }
    },[isLoadingPlinct,type])

    return {
        setIsLoadPlinct,
        setType,
        setQueryStrings,
        setMapZoom
    }

}

export default usePlinct

