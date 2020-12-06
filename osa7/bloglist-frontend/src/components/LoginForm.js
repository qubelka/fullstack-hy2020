import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputField from './InputField'
import { login } from '../actions/user-actions'
import { Button, Row, Col } from 'react-bootstrap'

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
      <Row>
        <Col>
          <h2>Log in to application</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <form onSubmit={handleLogin} data-testid='login-form'>
            <Row>
              <Col>
                <InputField
                  id='username'
                  value={credentials.username || ''}
                  name='username'
                  onChange={handleChange}
                  placeholder='username'
                >
                  username:
                </InputField>
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Button variant='info' size='sm' type='submit'>
                  Log in
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  )
}

export default LoginForm
