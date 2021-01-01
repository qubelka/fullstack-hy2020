import React from 'react'
import Genre from './Genre'

const Genres = ({ genres, getBooksByFilter }) => {
  return (
    <div>
      {genres.map(genre => (
        <Genre key={genre} genre={genre} getBooksByFilter={getBooksByFilter} />
      ))}
      <button onClick={() => getBooksByFilter(null)}>all genres</button>
    </div>
  )
}

export default Genres
