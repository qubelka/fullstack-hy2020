import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthyearForm'

const Authors = props => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)
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

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm setError={props.setError} authors={authors} />
    </div>
  )
}

export default Authors
