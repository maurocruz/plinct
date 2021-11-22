import AppContext from './AppContext'

import usePlaces from '../../hooks/usePlaces'
import useProfiles from '../../hooks/useProfiles'

const AppProvider = ({ children }) => {
  const places = usePlaces()
  const profiles = useProfiles()

  return (
    <AppContext.Provider
      value={{
        collections: {
          places,
          profiles,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
