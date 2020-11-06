import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'

const LoginForm = ({ handleLogin, doNotShowLoggingMsg }) => {
  const [credentials, setCredentials] = useState({})

  const handleChange = ({ target }) => {
    const value = target.value
    setCredentials({
      ...credentials,
      [target.name]: value
    })
  }

  const login = (event) => {
    event.preventDefault()

    const credentialsInfo = {
      username: credentials.username,
      password: credentials.password
    }

    handleLogin(credentialsInfo)
    setCredentials({})
  }

  return (
    <>
      {doNotShowLoggingMsg ?
        <h2>Log in to application</h2> :
        <h2>Trying to log in...</h2>}
      <form onSubmit={login}>
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  doNotShowLoggingMsg: PropTypes.bool.isRequired
}

export default LoginForm