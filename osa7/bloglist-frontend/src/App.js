import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './actions/blog-actions'
import { initializeUser, logout } from './actions/user-actions'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const blogs = useSelector(store => {
    return store.blogs.sort((a, b) => b.likes - a.likes)
  })

  const user = useSelector(store => store.user)

  const blogForm = () => (
    <Togglable buttonLabel='New blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification />

      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button type='button' onClick={() => dispatch(logout())}>
            Log out
          </button>
          <Link to='/'>
            <button>Blogs</button>
          </Link>
          <Link to='/users'>
            <button>Users</button>
          </Link>
        </>
      ) : (
        <LoginForm />
      )}

      {user ? (
        <Switch>
          <Route exact path='/'>
            {blogForm()}
            <h2>Blogs</h2>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
        </Switch>
      ) : null}
    </div>
  )
}

export default App
