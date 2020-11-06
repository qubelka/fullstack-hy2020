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
        {blog.title} {blog.author}
        <button onClick={() => setDetailedView(true)}>view</button>
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title}
        <button onClick={() => setDetailedView(false)}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes} <br />
        <button onClick={handleBlogUpdate}>like</button> <br/>
        {blog.author} <br/>
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
