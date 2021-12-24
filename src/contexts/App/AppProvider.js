import { useState } from 'react'
import AppContext from './AppContext'
import AppLayout from '@components/AppLayout'
import Data from "../../lib/Data";

const AppProvider = ({ children }) => 
{
  // start location
  const dataStart = new Data();
  dataStart.setViewPort().latitude(-15.791592864042546).longitude(-47.889556334719465).zoom(5)

  const [ data, setData ] = useState(dataStart.ready())

  const [ isLoadingData, setIsLoadingData ] = useState(false)

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        setIsLoadingData
      }}
    >
      <AppLayout isLoading={isLoadingData}>
        {children}
      </AppLayout>
    </AppContext.Provider>
  )
}

export default AppProvider
