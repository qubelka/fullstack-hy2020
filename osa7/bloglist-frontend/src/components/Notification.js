import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  if (!notification) {
    return null
  }

  return <Alert variant={`${notification.type}`}>{notification.text}</Alert>
}

export default Notification
