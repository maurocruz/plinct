import React, { useContext } from 'react'
import usePlinct from '../../hooks/usePlinct/usePlinct'

import styles from './AppHeader.module.css'

const WhereButton = () => {
    const { setIsLoadPlinct, setType, setQueryStrings } = usePlinct()

    function handleOnClick(additionalType: string) {
        setIsLoadPlinct(true)
        setType('place')
        setQueryStrings(`additionalType=${additionalType}`)
    }

    return (
        <>
            <button
                className={styles.button}
                onClick={() => handleOnClick('City')}
            >
                Show cities?
            </button>
            <button
                className={styles.button}
                onClick={() => handleOnClick('FoodEstablishment')}
            >
                Piri food establishment?
            </button>
            <button
                className={styles.button}
                onClick={() => handleOnClick('LodgingBusiness')}
            >
                Piri lodging business?
            </button>
        </>
    )
}

export default WhereButton