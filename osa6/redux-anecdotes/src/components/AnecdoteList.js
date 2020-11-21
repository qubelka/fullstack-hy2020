import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

  return (
    <div>
      {anecdotes
        .sort((a,b) => {
          return b.votes - a.votes
        })
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(vote(anecdote))
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
            }}
          />
        )}
    </div>
  )
}

export default AnecdoteList