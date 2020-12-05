export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

let timeoutId = null

export const setNotification = (text, type = 'info', timeout = 5) => {
  return dispatch => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => dispatch(removeNotification()), timeout * 1000)

    dispatch({
      type: SET_NOTIFICATION,
      data: {
        type,
        text,
        id: timeoutId,
      },
    })
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
  }
}
