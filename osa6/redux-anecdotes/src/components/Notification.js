import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }

  if (notification.message) {
    style.display = 'block'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification