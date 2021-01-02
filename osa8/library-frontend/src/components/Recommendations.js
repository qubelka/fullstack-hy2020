import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ show, setError }) => {
  const { data: userData } = useQuery(ME)
  const favoriteGenre = userData?.me?.favoriteGenre
  const { data: booksData, loading, error } = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    if (error.graphQLErrors[0]) {
      setError(error.graphQLErrors[0].message)
    } else {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      {booksData ? <BookTable books={booksData.allBooks} /> : null}
    </div>
  )
}

export default Recommendations
