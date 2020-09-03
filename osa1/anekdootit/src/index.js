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

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={vote}/>
      <Button text="next anecdote" handleClick={next}/>
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
