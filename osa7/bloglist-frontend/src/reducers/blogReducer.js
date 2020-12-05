import {
  INIT_BLOGS,
  NEW_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../actions/blog-actions'

const blogReducer = (blogs = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      return [...blogs, action.data]
    case UPDATE_BLOG:
      const updatedBlog = action.data
      const filteredList = blogs.filter(blog => blog.id !== updatedBlog.id)
      return [...filteredList, updatedBlog]
    case DELETE_BLOG:
      return blogs.filter(blog => blog.id !== action.data)
    default:
      return blogs
  }
}

export default blogReducer
