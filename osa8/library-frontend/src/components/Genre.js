import React from 'react'

const Genre = ({ genre, getBooksByFilter }) => {
  return <button onClick={() => getBooksByFilter(genre)}>{genre}</button>
}

export default Genre
