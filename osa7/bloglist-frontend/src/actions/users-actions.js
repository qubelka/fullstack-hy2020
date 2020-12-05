import userService from '../services/users'
export const INIT_USERS = 'INIT_USERS'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: INIT_USERS,
      data: users,
    })
  }
}
