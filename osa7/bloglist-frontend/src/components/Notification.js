import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  if (!notification) {
    return null
  }

  return <div className={notification.type}>{notification.text}</div>
}

export default Notification
