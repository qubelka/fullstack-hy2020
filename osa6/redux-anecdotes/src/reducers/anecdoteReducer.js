import { VOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../constants/action-types'
import anecdoteService from '../services/anecdotes'

export const vote = anecdote => {
  return async dispatch => {
    const anecdoteToUpdate = Object.assign({}, anecdote, { votes: anecdote.votes + 1 })
    await anecdoteService.update(anecdote.id, anecdoteToUpdate)
    dispatch({ type: VOTE, data: anecdote.id })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: NEW_ANECDOTE, data: newAnecdote })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: INIT_ANECDOTES, data: anecdotes })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_ANECDOTES:
      return action.data
    case VOTE:
      const id = action.data
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