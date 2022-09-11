import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateUsername } from '../reducers/userReducer'
const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch()
  const handleUsername = (event) => {
    dispatch(updateUsername(event.target.value))
  }
  const handlePassword = (event) => {
    dispatch(updatePassword(event.target.value))
  }
  const testUsername = useSelector((state) => state.user.username)
  const testPassword = useSelector((state) => state.user.password)
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={testUsername}
          name='Username'
          onChange={handleUsername}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={testPassword}
          name='Password'
          onChange={handlePassword}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
export default LoginForm
