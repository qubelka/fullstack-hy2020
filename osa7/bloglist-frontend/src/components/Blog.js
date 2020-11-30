import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [detailedView, setDetailedView] = useState(false)

  const handleBlogUpdate = () => {
    const updatedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog)
  }

  const handleBlogRemove = () => {
    deleteBlog(blog.id)
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
        <div className='blog-item'>
          {blog.title}
        </div>
        <button onClick={() => setDetailedView(false)}>hide</button>
        <div>
          {blog.url}
        </div>
        <div className='blog-item' data-testid='likes'>
          {blog.likes}
        </div>
        <button onClick={handleBlogUpdate}>like</button>
        <div>
          {blog.author}
        </div>
        {blog.user.username === user.username ? <button onClick={handleBlogRemove}>remove blog</button> : ''}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
