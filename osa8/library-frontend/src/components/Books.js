import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { getUniqueGenres } from '../helper'
import { ALL_BOOKS } from '../queries'
import Genres from './Genres'
import BookTable from './BookTable'

const Books = props => {
  const [genre, setGenre] = useState(null)
  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getFilteredBooks()
  }, []) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>loading...</p>
  }

  const getBooksByFilter = genre => {
    setGenre(genre)
    if (genre) {
      getFilteredBooks({
        variables: { genre },
      })
    } else {
      getFilteredBooks()
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      ) : (
        ''
      )}
      {result.data ? (
        <>
          <BookTable books={result.data.allBooks} />
          <Genres
            genres={genre ? [] : getUniqueGenres(result.data.allBooks)}
            getBooksByFilter={getBooksByFilter}
            setGenre={setGenre}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Books
