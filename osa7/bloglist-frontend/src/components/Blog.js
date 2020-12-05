import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlog, deleteBlog } from '../actions/blog-actions'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)
  const [detailedView, setDetailedView] = useState(false)

  const handleBlogUpdate = () => {
    const updatedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    }

    dispatch(updateBlog(blog.id, updatedBlog))
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

  if (!detailedView) {
    return (
      <div className='blog'>
        <div className='blog-item'>
          {blog.title}, {blog.author}
        </div>
        <button onClick={() => setDetailedView(true)}>view</button>
      </div>
    )
  } else {
    return (
      <div className='blog'>
        <div className='blog-item'>{blog.title}</div>
        <button onClick={() => setDetailedView(false)}>hide</button>
        <div>{blog.url}</div>
        <div className='blog-item' data-testid='likes'>
          {blog.likes}
        </div>
        <button onClick={handleBlogUpdate}>like</button>
        <div>{blog.author}</div>
        {blog.user.username === user.username ? (
          <button onClick={handleBlogRemove}>remove blog</button>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
