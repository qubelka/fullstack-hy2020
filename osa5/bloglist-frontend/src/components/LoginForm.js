import React from "react";
import InputField from "./InputField";

const LoginForm = ({handleLogin, handleChange, credentials}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <InputField
            value={credentials.username || ''}
            name='username'
            onChange={handleChange}
            placeholder='username'
          />
        </div>
        <div>
          <InputField
            type='password'
            value={credentials.password || ''}
            name='password'
            onChange={handleChange}
            placeholder='password'
          />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </>
  )
}

export default LoginForm