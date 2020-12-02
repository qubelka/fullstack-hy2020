import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './actions/notification-actions'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [doNotShowLoggingMsg, setDoNotShowLoggingMsg] = useState(true)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

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

  const addBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(prev => {
        return [...prev, createdBlog]
      })
      dispatch(
        setNotification(
          `Added a new blog: ${createdBlog.title} by ${createdBlog.author}`
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  const updateBlog = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      if (updatedBlog) {
        dispatch(setNotification('Blog updated'))
        const filteredList = blogs.filter(blog => blog.id !== updatedBlog.id)
        setBlogs(filteredList.concat(updatedBlog))
      }
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  const deleteBlog = async id => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    if (
      window.confirm(
        `Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        dispatch(setNotification('Blog successfully removed!'))
      } catch (exception) {
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        dispatch(
          setNotification(
            `The blog '${blogToDelete.title}' had already been removed!`,
            'error'
          )
        )
      }
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
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
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
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
