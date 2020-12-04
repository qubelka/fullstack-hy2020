import { INIT_BLOGS, NEW_BLOG } from '../actions/blog-actions'

const blogReducer = (blogs = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      return [...blogs, action.data]
    default:
      return blogs
  }
}

export default blogReducer
