import blogService from '../services/blogs'
import { setNotification } from './notification-actions'

export const INIT_BLOGS = 'INIT_BLOGS'
export const NEW_BLOG = 'NEW_BLOG'
export const UPDATE_BLOG = 'UPDATE_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'
export const ADD_COMMENT = 'ADD_COMMENT'

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

export const updateBlog = (id, blogToUpdate) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      if (updatedBlog) {
        dispatch(setNotification('Blog updated'))
        dispatch({
          type: UPDATE_BLOG,
          data: updatedBlog,
        })
      }
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = blogToDelete => {
  return async dispatch => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch({
        type: DELETE_BLOG,
        data: blogToDelete.id,
      })
      dispatch(setNotification('Blog successfully removed!'))
    } catch (exception) {
      dispatch({
        type: DELETE_BLOG,
        data: blogToDelete.id,
      })
      dispatch(
        setNotification(
          `The blog '${blogToDelete.title}' had already been removed!`,
          'error'
        )
      )
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(blog.id, { comment })
      dispatch({
        type: ADD_COMMENT,
        data: updatedBlog,
      })
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}
