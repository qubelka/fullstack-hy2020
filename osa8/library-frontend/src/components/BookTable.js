import React from 'react'
import Book from './Book'

const BookTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map(book => (
          <Book key={book.title} book={book} />
        ))}
      </tbody>
    </table>
  )
}

export default BookTable
