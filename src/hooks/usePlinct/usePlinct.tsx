import axios from 'axios'
import { useEffect, useState } from 'react'
import GeoJson from '../../lib/GeoJson'

import useAppContext from '../../contexts/App'

import PlaceInterface from '../../interfaces/plinctApi/PlaceInterface'

const usePlinct = () => {

    const { setLocation } = useAppContext()

    const [ type, setType ] = useState('place')
    const [ queryStrings, setQueryStrings ] = useState(String)
    const [ mapZoom, setMapZoom ] = useState(14)

    const [ isLoadingPlinct, setIsLoadPlinct ] = useState(false)

    useEffect(() => {
        if (isLoadingPlinct) {
            axios.get<PlaceInterface[]>(`https://plinct.com.br/api/${type}?${queryStrings}`)
            .then(response => {
                const dataPlace = response.data
                const location = new GeoJson()
                const latitude = parseFloat(dataPlace[0].latitude)
                const longitude = parseFloat(dataPlace[0].longitude)
                location.createPoint(longitude,latitude)
                location.properties('zoom', mapZoom)
                setLocation(location.ready())
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

