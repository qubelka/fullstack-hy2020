import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notification-actions'

export const INIT_USER = 'INIT_USER'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: LOGIN,
        data: user,
      })
      blogService.setToken(user.token)
    }
  }
}

export const login = credentialsInfo => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentialsInfo)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch({
        type: LOGIN,
        data: user,
      })
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(
        setNotification(
          exception.response.data.error || 'Wrong username or password',
          'danger'
        )
      )
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: LOGOUT })
    window.localStorage.removeItem('loggedBlogappUser')
  }
}
