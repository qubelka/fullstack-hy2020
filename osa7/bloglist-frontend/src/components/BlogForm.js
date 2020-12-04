import InputField from './InputField'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../actions/blog-actions'
import { toggleVisibility } from '../actions/togglable-actions'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({})

  const handleChange = ({ target }) => {
    const { name, value } = target
    setBlog(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const addBlog = event => {
    event.preventDefault()

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }

    dispatch(toggleVisibility())
    dispatch(createBlog(newBlog))
    setBlog({})
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog} data-testid='blog-form'>
        <InputField
          id='title'
          value={blog.title || ''}
          name='title'
          onChange={handleChange}
          placeholder='title'
        >
          title
        </InputField>
        <InputField
          id='author'
          value={blog.author || ''}
          name='author'
          onChange={handleChange}
          placeholder='author'
        >
          author
        </InputField>
        <InputField
          id='url'
          value={blog.url || ''}
          name='url'
          onChange={handleChange}
          placeholder='url'
        >
          url
        </InputField>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
