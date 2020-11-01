import InputField from './InputField'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({})

  const handleChange = ({ target }) => {
    const { name, value } = target
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    createBlog(newBlog)
    setBlog({})
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <InputField
          value={blog.title || ''}
          name='title'
          onChange={handleChange}
          placeholder='title'
        />
        <InputField
          value={blog.author || ''}
          name='author'
          onChange={handleChange}
          placeholder='author'
        />
        <InputField
          value={blog.url || ''}
          name='url'
          onChange={handleChange}
          placeholder='url'
        />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm