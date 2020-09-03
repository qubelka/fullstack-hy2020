import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) =>
  <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})

  const next = () => {
    let randomNumber = Math.floor(Math.random()*props.anecdotes.length)
    setSelected(randomNumber)
  }

  const vote = () => {
    let pointsCopy = {...points}
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const anecdoteWithMostVotes = Object.entries(points)
      .sort((a,b) =>
        b[1] - a[1])
      .shift()

  return (
    <div>
      <p style={{fontSize: "26px", fontWeight: "bold"}}>Anecdote of the day</p>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={vote}/>
      <Button text="next anecdote" handleClick={next}/>

      <p style={{fontSize: "26px", fontWeight: "bold"}}>Anecdote with most votes</p>
      {anecdoteWithMostVotes[1] > 0 ? (
          <>
              <p>{props.anecdotes[anecdoteWithMostVotes[0]]}</p>
              <p>has {points[anecdoteWithMostVotes[0]]} votes</p>
          </>
      ) : (
          <p>No votes yet</p>
          )
       }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
