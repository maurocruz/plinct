import { useContext } from 'react'

import AppContext from './AppContext'

// Safely guarded useAppContext hook
const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    return console.erro('This hook should be wraped by AppProvider')
  }

  return context
}

export default useAppContext
