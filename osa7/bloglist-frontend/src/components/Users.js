import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { initializeUsers } from '../actions/users-actions'
import { useDispatch, useSelector } from 'react-redux'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(store => store.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Username</th>
            <th scope='col'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`} style={{ color: 'white' }}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
