import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ user, setPage }) => {
  const [books, setBooks] = useState(null)
  const [getBooksByGenre, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    setPage('authors')
    getBooksByGenre({
      variables: { genre: user.favoriteGenre },
    })
  }, []) //eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result]) //eslint-disable-line

  if (result.loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      {books ? <BookTable books={books} /> : null}
    </div>
  )
}

export default Recommendations
