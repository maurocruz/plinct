import { useState, useEffect } from 'react'

function useModal () {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(
    () => () => {
      document.body.style.overflowY = ''
    },
    []
  )

  const toggleModal = () =>
    setIsModalVisible(isModalVisible => {
      document.body.style.overflowY = !isModalVisible ? 'hidden' : ''
      return !isModalVisible
    })

  return {
    isModalVisible,
    toggleModal
  }
}

export default useModal
