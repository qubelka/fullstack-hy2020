import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const users = useSelector(store => store.users)
  const id = match.params.id
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <div>
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      <ListGroup>
        {user.blogs.map(blog => (
          <ListGroup.Item key={blog.title}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
