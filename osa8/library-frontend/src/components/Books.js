import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { getUniqueGenres } from '../helper'
import { ALL_BOOKS } from '../queries'
import Genres from './Genres'
import BookTable from './BookTable'

const Books = props => {
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState(null)
  const [genre, setGenre] = useState(null)
  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getFilteredBooks()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (!books && result.data) {
      const books = result.data.allBooks
      setBooks(books)
      setGenres(getUniqueGenres(books))
    } else if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>loading...</p>
  }

  const getBooksByFilter = genre => {
    setGenre(genre)
    getFilteredBooks({
      variables: { genre },
    })
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
      <BookTable books={books} />
      <Genres
        genres={genres}
        getBooksByFilter={getBooksByFilter}
        setGenre={setGenre}
      />
    </div>
  )
}

export default Books
