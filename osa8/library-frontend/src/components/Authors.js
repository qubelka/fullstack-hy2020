import React from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const Authors = props => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>error!</p>
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
    </div>
  )
}

export default Authors
