import { useState, useEffect } from 'react'

function <%= componentName %> () {
  // This is a sample, just a basic boolean flag Hook
  const [is<%= componentName %>, setIs<%= componentName %>] = useState(false)
  useEffect(() => {
    setIs<%= componentName %>(true)
  }, [setIs<%= componentName %>])

  return { is<%= componentName %>, setIs<%= componentName %> }
}

export default <%= componentName %>
