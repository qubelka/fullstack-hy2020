import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './actions/notification-actions'
import { initializeBlogs } from './actions/blog-actions'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [doNotShowLoggingMsg, setDoNotShowLoggingMsg] = useState(true)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(store => store.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = credentialsInfo => {
    setDoNotShowLoggingMsg(false)
    // Timeout to imitate longer data fetching (otherwise logging msg not visible)
    setTimeout(async () => {
      try {
        const user = await loginService.login(credentialsInfo)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        setUser(user)
        blogService.setToken(user.token)
        setDoNotShowLoggingMsg(true)
      } catch (exception) {
        dispatch(
          setNotification(
            exception.response.data.error || 'Wrong username or password',
            'error'
          )
        )
        setDoNotShowLoggingMsg(true)
      }
    }, 0)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

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
          <button type='button' onClick={handleLogout}>
            Log out
          </button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </>
      ) : (
        <LoginForm
          handleLogin={login}
          doNotShowLoggingMsg={doNotShowLoggingMsg}
        />
      )}
    </div>
  )
}

export default App
