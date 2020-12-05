import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notification-actions'

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case REMOVE_NOTIFICATION:
      return null
    default:
      return state
  }
}

export default notificationReducer
