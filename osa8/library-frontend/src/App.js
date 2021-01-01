import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { ME } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getUser, result] = useLazyQuery(ME)
  const client = useApolloClient()

  const notify = msg => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    getUser()
    const libraryUserToken = window.localStorage.getItem('library-user-token')
    if (libraryUserToken) {
      setToken(libraryUserToken)
    }
  }, [])

  if (result.loading) {
    return <p>loading...</p>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

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
      <Notification msg={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} token={token} />
      <Books show={page === 'books'} setError={notify} />
      <NewBook show={page === 'add'} setError={notify} setPage={setPage} />
      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

      {result.data && result.data.me ? (
        <Recommendations user={result.data.me} setPage={setPage} />
      ) : null}
    </div>
  )
}

export default App
