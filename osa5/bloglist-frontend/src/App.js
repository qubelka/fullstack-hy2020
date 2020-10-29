import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [message, setMessage] = useState({})
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({})
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMessageWithTimeout = (messageText, type='info') => {
    setMessage({
      text: messageText,
      type: type
    })
    setTimeout(() => {
      setMessage({})
    }, 5000)
  }

  const handleLoginChange = ({target}) => {
    const value = target.value
    setCredentials({
      ...credentials,
      [target.name]: value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentialsInfo = {
      username: credentials.username,
      password: credentials.password
    }

    try {
      const user = await loginService.login(credentialsInfo)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setCredentials({})
    } catch (exception) {
      setMessageWithTimeout('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs((prev) => {
        return [...prev, createdBlog]
      })
      setMessageWithTimeout(`Added a new blog: ${createdBlog.title} by ${createdBlog.author}`)
    } catch (exception) {
      setMessageWithTimeout(exception.response.data.error, 'error')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification message={message} />

      {user ?
        <>
          <p>{ user.name } logged in</p>
          <button type='button' onClick={handleLogout}>Log out</button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </> :
        <LoginForm
          handleLogin={handleLogin}
          handleChange={handleLoginChange}
          credentials={credentials} />
      }
    </div>
  )
}

export default App