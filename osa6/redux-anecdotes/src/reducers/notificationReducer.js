import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/action-types'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case REMOVE_NOTIFICATION:
      return null
    default:
      return state
  }
}

export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch({ type: SET_NOTIFICATION, data: content })
    setTimeout(() => dispatch(removeNotification()), timeout * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export default notificationReducer