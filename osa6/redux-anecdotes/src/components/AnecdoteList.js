import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes
        .sort((a,b) => {
          return b.votes - a.votes
        })
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              props.vote(anecdote)
              props.setNotification(`you voted '${anecdote.content}'`, 5)
            }}
          />
        )}
    </div>
  )
}

const mapStateToProps = ({ anecdotes, filter }) => {
  return {
    anecdotes: anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)