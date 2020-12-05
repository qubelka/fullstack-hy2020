import { INIT_USERS } from '../actions/users-actions'

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case INIT_USERS:
      return action.data
    default:
      return users
  }
}

export default usersReducer
