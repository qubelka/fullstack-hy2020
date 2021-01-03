import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'
import {
  updateBooksInCache,
  updateAuthorsInCache,
  updateRecommendationsInCache,
} from '../helper'

const NewBook = props => {
  const [title, setTitle] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: error => {
      if (error.graphQLErrors[0]) {
        props.setError(error.graphQLErrors[0].message, 'error')
      } else {
        props.setError(error.message, 'error')
      }
    },
    update: (cache, { data: { addBook } }) => {
      updateBooksInCache(addBook, cache)
      updateAuthorsInCache(addBook.author, cache)
      updateRecommendationsInCache(addBook, cache)
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        authorName,
        authorBorn: parseInt(authorBorn),
        published: parseInt(published),
        genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuthorName('')
    setAuthorBorn('')
    setGenres([])
    setGenre('')
    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          author born
          <input
            type='number'
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
