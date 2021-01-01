import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const { data, loading, error } = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    if (error.graphQLErrors[0]) {
      props.setError(error.graphQLErrors[0].message)
    } else {
      props.setError(error.message)
    }
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
