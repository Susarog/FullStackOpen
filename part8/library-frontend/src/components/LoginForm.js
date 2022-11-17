import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setPage, setError, setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    },
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }
  const submit = (event) => {
    event.preventDefault()
    setPage('authors')
    setUsername('')
    setPassword('')
    login({ variables: { username, password } })
  }
  return (
    <div>
      <h2>login</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            username{' '}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
