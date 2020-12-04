import { TOGGLE_VISIBILITY } from '../actions/togglable-actions'

const togglableReducer = (visible = false, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return !visible
    default:
      return visible
  }
}

export default togglableReducer
