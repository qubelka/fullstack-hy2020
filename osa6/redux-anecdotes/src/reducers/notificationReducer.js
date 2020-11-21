import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/action-types'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data.content
    case REMOVE_NOTIFICATION:
      return null
    default:
      return state
  }
}

export const setNotification = content => {
  return {
    type: SET_NOTIFICATION,
    data: {
      content
    }
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export default notificationReducer