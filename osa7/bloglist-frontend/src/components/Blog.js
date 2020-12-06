import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup } from 'react-bootstrap'
import { updateBlog, deleteBlog, addComment } from '../actions/blog-actions'

const Blog = ({ match }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const blog = blogs.find(blog => blog.id === match.params.id)

  if (!blog) return null

  const handleLike = () => {
    const updatedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
      comments: blog.comments,
    }

    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const handleComment = e => {
    e.preventDefault()
    const comment = e.target.commentField.value
    e.target.commentField.value = ''
    dispatch(addComment(blog, comment))
  }

  const handleBlogRemove = () => {
    const id = blog.id
    const blogToDelete = blogs.find(blog => blog.id === id)
    if (
      window.confirm(
        `Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      dispatch(deleteBlog(blogToDelete))
    }
  }

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2 className='blog-item'>{blog.title}</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row>
              <Col>
                <a href={`${blog.url}`}>{blog.url}</a>
              </Col>
            </Row>
            <Row>
              <Col data-testid='likes'>
                {blog.likes}
                <Button
                  variant='info'
                  size='sm'
                  style={{ marginLeft: 5 }}
                  onClick={handleLike}
                >
                  like
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>{blog.author}</Col>
            </Row>
            <Row>
              <Col>
                {blog.user.username === user.username ? (
                  <Button variant='info' size='sm' onClick={handleBlogRemove}>
                    remove blog
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Col>
            <Row>
              <Col>
                <h3>comments</h3>
              </Col>
            </Row>

            <Row>
              <Col>
                <form onSubmit={handleComment}>
                  <input type='text' name='commentField' />
                  <Button
                    variant='info'
                    size='sm'
                    style={{ marginLeft: 5 }}
                    type='submit'
                  >
                    add comment
                  </Button>
                </form>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col>
                <ListGroup>
                  {blog.comments.map(comment => (
                    <ListGroup.Item variant='light' key={comment.slice(6)}>
                      {comment}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Blog
