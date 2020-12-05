import { INIT_USER, LOGIN, LOGOUT } from '../actions/user-actions'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.data
    case LOGIN:
      return action.data
    case LOGOUT:
      return null
    default:
      return state
  }
}

export default userReducer
