import { useState } from 'react'

import AppContext from './AppContext'

import usePlaces from '../../hooks/usePlaces'
import useProfiles from '../../hooks/useProfiles'

const AppProvider = ({ children }) => {
  const [selected, setSelected] = useState({})

  const places = usePlaces()
  const profiles = useProfiles()

  return (
    <AppContext.Provider
      value={{
        collections: {
          places,
          profiles,
        },
        selected,
        setSelected
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
