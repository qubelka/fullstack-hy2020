import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    <div className='blog'>
      <h2 className='blog-item'>{blog.title}</h2>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
      </div>
      <div className='blog-item' data-testid='likes'>
        {blog.likes}
      </div>
      <button onClick={handleLike}>like</button>
      <div>{blog.author}</div>
      {blog.user.username === user.username ? (
        <button onClick={handleBlogRemove}>remove blog</button>
      ) : (
        ''
      )}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type='text' name='commentField' />
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.slice(6)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
