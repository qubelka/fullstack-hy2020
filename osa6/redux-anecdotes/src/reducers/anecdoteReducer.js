import { VOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../constants/action-types'

export const vote = id => {
  return {
    type: VOTE,
    data: { id }
  }
}

export const createAnecdote = data => {
  return {
    type: NEW_ANECDOTE,
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: INIT_ANECDOTES,
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_ANECDOTES:
      return action.data
    case VOTE:
      const id = action.data.id
      const anecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = Object.assign({}, anecdote, { votes: anecdote.votes + 1 })
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
    case NEW_ANECDOTE:
      return [...state, action.data]
    default:
      return state
  }
}

export default anecdoteReducer