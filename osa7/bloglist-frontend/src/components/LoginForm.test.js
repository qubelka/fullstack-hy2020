import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  afterEach(cleanup)

  it('submits the form on login-button click', () => {
    let doNotShowLoggingMessage = true
    const handleLoginMock = jest.fn()
    const { getByText, getByLabelText } = render(
      <LoginForm doNotShowLoggingMsg={doNotShowLoggingMessage} handleLogin={handleLoginMock} />
    )

    const test_user = {
      username: '(ᵔᴥᵔ)',
      password: '╚(ಠ_ಠ)=┐'
    }

    const usernameNode = getByLabelText(/username/)
    const passwordNode = getByLabelText(/password/)

    fireEvent.change(usernameNode, { target: { value: test_user.username } })
    fireEvent.change(passwordNode, { target: { value: test_user.password } })

    getByText('Log in').click()

    expect(handleLoginMock).toHaveBeenCalledTimes(1)
    expect(handleLoginMock).toHaveBeenCalledWith(test_user)

  })

  it('shows correct logging title on render', () => {
    let doNotShowLoggingMessage = true
    const handleLoginMock = jest.fn()
    const { container } = render(
      <LoginForm doNotShowLoggingMsg={doNotShowLoggingMessage} handleLogin={handleLoginMock} />
    )

    expect(container.innerHTML).toMatch('Log in to application')
  })

  it('shows correct logging title on log in', () => {
    let doNotShowLoggingMessage = false
    const handleLoginMock = jest.fn()
    const { container } = render(
      <LoginForm doNotShowLoggingMsg={doNotShowLoggingMessage} handleLogin={handleLoginMock} />
    )

    expect(container.innerHTML).toMatch('Trying to log in...')
  })
})
