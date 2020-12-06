import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/user-actions'
import React from 'react'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  return (
    <nav className='header'>
      <ul>
        <li>
          <Link to='/'>Blogs</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li> {user.name} logged in</li>
        <li>
          <button type='button' onClick={() => dispatch(logout())}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
