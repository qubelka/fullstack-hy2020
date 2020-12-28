import React from 'react'

const Notification = ({ msg }) => {
  if (!msg) return null

  return <div style={{ color: 'red' }}>{msg}</div>
}

export default Notification
