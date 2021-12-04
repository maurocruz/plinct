import axios from 'axios';
import { useEffect, useState } from 'react'
import GeoJson from '../../lib/GeoJson'

import useAppContext from '../../contexts/App';

import PlaceInterface from '../../interfaces/plinctApi/PlaceInterface';

const usePlinct = () => {

    const { setNewFeatureCollection } = useAppContext();

    const [ type, setType ] = useState('place');
    const [ queryStrings, setQueryStrings ] = useState(String);

    const [ isLoadingPlinct, setIsLoadPlinct ] = useState(false);

    useEffect(() => {
        if (isLoadingPlinct) {
            axios.get<PlaceInterface[]>(`https://plinct.com.br/api/${type}?${queryStrings}`)
            .then(response => {
                const dataPlace = response.data

                const newCollection = new GeoJson();

                const latitude = parseFloat(dataPlace[0].latitude)
                const longitude = parseFloat(dataPlace[0].longitude)

                newCollection.createPoint(longitude,latitude);

                setNewFeatureCollection(newCollection.ready())
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

export default usePlinct;

