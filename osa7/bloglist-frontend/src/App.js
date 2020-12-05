import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './actions/blog-actions'
import { initializeUser, logout } from './actions/user-actions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const blogs = useSelector(store => store.blogs)
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
          {blogForm()}
          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
