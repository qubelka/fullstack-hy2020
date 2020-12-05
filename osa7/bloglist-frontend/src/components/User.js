import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const users = useSelector(store => store.users)
  const id = match.params.id
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
