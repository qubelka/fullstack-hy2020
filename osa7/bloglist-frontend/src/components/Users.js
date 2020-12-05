import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th scope='col'>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
