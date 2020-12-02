export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const setNotification = (text, type = 'info', timeout = 5) => {
  return dispatch => {
    const timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    )
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
    data: {
      type: 'info',
      text: '',
      id: null,
    },
  }
}
