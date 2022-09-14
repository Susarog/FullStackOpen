import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { login } from '../reducers/userReducer'
import { newNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    loginService
      .login({ username, password })
      .then((user) => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user.data))
        blogService.setToken(user.data.token)
        dispatch(login(user.data))
      })
      .catch(() => {
        dispatch(newNotification('wrong username or password', 5000))
        setUsername('')
        setPassword('')
      })
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className='mb-3' controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          name='Username'
          onChange={handleUsername}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          name='Password'
          onChange={handlePassword}
        />
      </Form.Group>
      <Button id='login-button' type='submit'>
        login
      </Button>
    </Form>
  )
}

export default LoginForm
