import blogService from '../services/blogs'
import { setNotification } from './notification-actions'

export const INIT_BLOGS = 'INIT_BLOGS'
export const NEW_BLOG = 'NEW_BLOG'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: NEW_BLOG,
        data: newBlog,
      })
      dispatch(
        setNotification(
          `Added a new blog: ${newBlog.title} by ${newBlog.author}`
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}
