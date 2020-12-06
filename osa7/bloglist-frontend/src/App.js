import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Table, Row, Col } from 'react-bootstrap'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './actions/blog-actions'
import { initializeUser } from './actions/user-actions'
import Users from './components/Users'
import User from './components/User'

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

  const usersMatch = useRouteMatch('/users/:id')
  const blogsMatch = useRouteMatch('/blogs/:id')

  const blogForm = () => (
    <Togglable buttonLabel='New blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      {user ? <Menu /> : null}

      <Row>
        <Col>
          <h1>Bloglist app</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Notification />
        </Col>
      </Row>

      <Row>
        <Col>{user ? null : <LoginForm />}</Col>
      </Row>

      {user ? (
        <Switch>
          <Route exact path='/'>
            {blogForm()}
            <h2>Blogs</h2>
            <Table striped bordered hover variant='dark'>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`} style={{ color: 'white' }}>
                        {blog.title} by {blog.author}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Route>
          <Route path='/users/:id'>
            {usersMatch ? <User match={usersMatch} /> : null}
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            {blogsMatch ? <Blog match={blogsMatch} /> : null}
          </Route>
        </Switch>
      ) : null}
    </div>
  )
}

export default App
