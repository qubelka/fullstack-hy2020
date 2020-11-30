import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('calls createBlog with correct props on form submit', () => {
    const createBlogMock = jest.fn()
    const { getByLabelText, getByTestId } = render(<BlogForm createBlog={createBlogMock} />)

    const form = getByTestId('blog-form')
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    }

    const titleNode = getByLabelText('title')
    const authorNode = getByLabelText('author')
    const urlNode = getByLabelText('url')

    fireEvent.change(titleNode, { target: { value: newBlog.title } })
    fireEvent.change(authorNode, { target: { value: newBlog.author } })
    fireEvent.change(urlNode, { target: { value: newBlog.url } })

    fireEvent.submit(form)
    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock).toHaveBeenCalledWith(newBlog)
  })
})