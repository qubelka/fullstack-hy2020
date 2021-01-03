import React from 'react'

const Notification = ({ msg }) => {
  if (!msg) return null

  return (
    <div style={{ color: msg.type === 'info' ? 'green' : 'red' }}>
      {msg.text}
    </div>
  )
}

export default Notification
