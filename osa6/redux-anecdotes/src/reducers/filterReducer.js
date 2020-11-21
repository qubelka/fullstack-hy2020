import { SET_FILTER } from '../constants/action-types'

const filterReducer = (state= '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.data.input
    default:
      return state
  }
}

export const filterAnecdotes = input => {
  return {
    type: SET_FILTER,
    data: { input }
  }
}

export default filterReducer