import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../actions/blog-actions'

const Blog = ({ match }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const blog = blogs.find(blog => blog.id === match.params.id)

  if (!blog) return null

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

  return (
    <div className='blog'>
      <h2 className='blog-item'>{blog.title}</h2>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
      </div>
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

export default Blog
