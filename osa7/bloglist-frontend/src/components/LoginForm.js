import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputField from './InputField'
import { login } from '../actions/user-actions'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({})

  const handleChange = ({ target }) => {
    const value = target.value
    setCredentials({
      ...credentials,
      [target.name]: value,
    })
  }

  const handleLogin = event => {
    event.preventDefault()

    const credentialsInfo = {
      username: credentials.username,
      password: credentials.password,
    }

    dispatch(login(credentialsInfo))
    setCredentials({})
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} data-testid='login-form'>
        <div>
          <InputField
            id='username'
            value={credentials.username || ''}
            name='username'
            onChange={handleChange}
            placeholder='username'
          >
            username:
          </InputField>
        </div>
        <div>
          <InputField
            id='password'
            type='password'
            value={credentials.password || ''}
            name='password'
            onChange={handleChange}
            placeholder='password'
          >
            password:
          </InputField>
        </div>
        <button type='submit'>Log in</button>
      </form>
    </>
  )
}

export default LoginForm
