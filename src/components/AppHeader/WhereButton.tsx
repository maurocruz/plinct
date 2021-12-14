import React, { useContext } from 'react'
import usePlinct from '../../hooks/usePlinct/usePlinct'

import styles from './AppHeader.module.css'

const WhereButton = () => {
    const { setIsLoadPlinct, setType, setQueryStrings, setMapZoom } = usePlinct()

    function handleOnClick() {
        setIsLoadPlinct(true)
        setType('place')
        setQueryStrings('nameLike=Piren%C3%B3polis&additionalType=administrativeArea')
        setMapZoom(13)
    }

    return (
        <button
            className={styles.button}
            onClick={handleOnClick}
        >
            Where is Pirenópolis?
        </button>
    )
}

export default WhereButton