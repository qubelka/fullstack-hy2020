import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notification-actions'

const initialState = {
  message: '',
  id: null,
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

export default notificationReducer
