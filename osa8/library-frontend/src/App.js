import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './queries'
import {
  updateBooksInCache,
  updateAuthorsInCache,
  updateRecommendationsInCache,
} from './helper'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState({})
  const client = useApolloClient()

  const setMessageWithTimeout = (text, type = 'info') => {
    setMessage({
      text,
      type,
    })
    setTimeout(() => {
      setMessage({})
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('authors')
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const addedAuthor = subscriptionData.data.bookAdded.author
      setMessageWithTimeout(`${addedBook.title} added`)
      updateBooksInCache(addedBook, client)
      updateAuthorsInCache(addedAuthor, client)
      updateRecommendationsInCache(addedBook, client)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>log in</button>
        )}
      </div>
      <Notification msg={message} />
      <Authors
        show={page === 'authors'}
        setError={setMessageWithTimeout}
        token={token}
      />
      <Books show={page === 'books'} setError={setMessageWithTimeout} />
      <NewBook
        show={page === 'add'}
        setError={setMessageWithTimeout}
        setPage={setPage}
        client={client}
      />
      <LoginForm
        show={page === 'login'}
        setError={setMessageWithTimeout}
        setToken={setToken}
        setPage={setPage}
        client={client}
      />
      {token ? (
        <Recommendations
          show={page === 'recommend'}
          setError={setMessageWithTimeout}
        />
      ) : null}
    </div>
  )
}

export default App
