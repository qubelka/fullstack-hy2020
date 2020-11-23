import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/action-types'

const initialState = {
  message: '',
  id: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      if (state.id) {
        clearTimeout(state.id)
      }
      return action.data
    case REMOVE_NOTIFICATION:
      return action.data
    default:
      return state
  }
}

export const setNotification = (content, timeout) => {
  return dispatch => {
    const timeoutId = setTimeout(() => dispatch(removeNotification()), timeout * 1000)
    dispatch({
        type: SET_NOTIFICATION,
        data: {
          message: content,
          id: timeoutId
        }
      })
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
    data: {
      message: '',
      id: null
    }
  }
}

export default notificationReducer