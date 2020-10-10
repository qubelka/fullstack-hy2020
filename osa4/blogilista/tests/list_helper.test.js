const listHelper = require('../utils/list_helper')
const input = require('./list_helper_input')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty returns 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog returns the likes of that blog', () => {
    const result = listHelper.totalLikes(input.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has two blogs returns the sum of likes of these two blogs', () => {
    const result = listHelper.totalLikes(input.listWithTwoBlogs)
    expect(result).toBe(14)
  })

  test('when list has multiple blogs, returns the correct number of likes', () => {
    const result = listHelper.totalLikes(input.listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, returns an empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has one blog, returns this blog', () => {
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.favoriteBlog(input.listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('when list has blogs with equal number of likes, returns one of them', () => {
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
    const result = listHelper.favoriteBlog(input.listWithTwoBlogs)
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs, returns the one with the most likes', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlog(input.listWithMultipleBlogs)
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('when list is empty returns an empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has one blog, returns the author of that blog with number 1', () => {
    const expected = { author: 'Edsger W. Dijkstra', blogs: 1 }
    const result = listHelper.mostBlogs(input.listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('when list has authors with equals number of blogs, returns one of them', () => {
    const expected = { author: 'Michael Chan', blogs: 1 }
    const result = listHelper.mostBlogs(input.listWithTwoBlogs)
    expect(result).toEqual(expected)
  })

  test('when list has multiple authors, returns the author with the most blogs', () => {
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    const result = listHelper.mostBlogs(input.listWithMultipleBlogs)
    expect(result).toEqual(expected)
  })
})

describe('most likes', () => {
  test('when list is empty returns an empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has one blog, returns the author of this blog', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 5 }
    const result = listHelper.mostLikes(input.listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('when list has authors with equal total number of blogs, returns one of them', () => {
    const expected = { author: 'Michael Chan', likes: 7 }
    const result = listHelper.mostLikes(input.listWithTwoBlogs)
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs, returns the author with the largest total likes number', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    const result = listHelper.mostLikes(input.listWithMultipleBlogs)
    expect(result).toEqual(expected)
  })
})