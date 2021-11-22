import React, { useContext } from 'react'

import <%= componentName %>Context from './<%= componentName %>Context'

// Safely guarded use<%= componentName %>Context hook
const use<%= componentName %>Context = () => {
  const context = useContext(<%= componentName %>Context)

  if (!context) {
    return console.erro('This hook should be wraped by <%= componentName %>Provider')
  }

  return context
}

export default use<%= componentName %>Context
