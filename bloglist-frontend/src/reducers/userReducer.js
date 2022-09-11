import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    user: null,
  },
  reducers: {
    setUsername: (state, action) => {
      return { ...state, username: action.payload }
    },
    setPassword: (state, action) => {
      return { ...state, password: action.payload }
    },
    handleLogin: (state, action) => {
      return { ...state, user: action.payload }
    },
    handleLogout: (state, action) => {
      return (state = action.payload)
    },
  },
})

export const { setUsername, setPassword, handleLogin, handleLogout } =
  userSlice.actions
export default userSlice.reducer

export const updateUsername = (text) => {
  return async (dispatch) => {
    dispatch(setUsername(text))
  }
}
export const updatePassword = (text) => {
  return async (dispatch) => {
    dispatch(setPassword(text))
  }
}
export const logout = () => {
  return async (dispatch) => {
    dispatch(handleLogout({ username: '', password: '', user: null }))
  }
}

export const login = (user) => {
  return async (dispatch) => {
    dispatch(handleLogin(user))
  }
}
