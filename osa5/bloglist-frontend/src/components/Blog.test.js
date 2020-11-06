import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  afterEach(cleanup)

  let test_user, test_blog, updateBlogMock, deleteBlogMock

  beforeEach(() => {
    test_user = {
      username: 'User123',
      password: 'strongPassword'
    }

    test_blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: test_user
    }

    updateBlogMock = jest.fn()
    deleteBlogMock = jest.fn()
  })

  test('renders by default only title and author', () => {
    const { container } = render(
      <Blog
        user={test_user}
        deleteBlog={deleteBlogMock}
        blog={test_blog}
        updateBlog={updateBlogMock} />
    )

    const blogNode = container.querySelector('.blog')

    expect(blogNode).toHaveTextContent('React patterns')
    expect(blogNode).toHaveTextContent('Michael Chan')
    expect(blogNode).not.toHaveTextContent('https://reactpatterns.com/')
    expect(blogNode).not.toHaveTextContent('7')
  })

  test('renders url and likes on button click', () => {
    const { container, getByText } = render(
      <Blog
        user={test_user}
        deleteBlog={deleteBlogMock}
        blog={test_blog}
        updateBlog={updateBlogMock} />
    )

    const blogNode = container.querySelector('.blog')
    const viewButton = getByText('view')

    fireEvent.click(viewButton)
    expect(blogNode).toHaveTextContent('React patterns')
    expect(blogNode).toHaveTextContent('Michael Chan')
    expect(blogNode).toHaveTextContent('https://reactpatterns.com/')
    expect(blogNode).toHaveTextContent('7')
  })

  test('calls updateHandler on like-button click', () => {
    const { getByText } = render(
      <Blog
        user={test_user}
        deleteBlog={deleteBlogMock}
        blog={test_blog}
        updateBlog={updateBlogMock} />
    )

    const viewButton = getByText('view')
    fireEvent.click(viewButton)
    const likeButton = getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlogMock).toHaveBeenCalledTimes(2)
  })
})