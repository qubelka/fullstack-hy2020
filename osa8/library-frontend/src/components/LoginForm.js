import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setError, setToken, setPage, client }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError(error) {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0].message, 'error')
      } else {
        setError(error.message, 'error')
      }
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('library-user-token', token)
      client.resetStore()
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  if (result.loading) {
    return <p>loading...</p>
  }

  const submit = e => {
    e.preventDefault()

    login({
      variables: { username, password },
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default LoginForm
