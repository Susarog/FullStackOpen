import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getUsers = () => {
  const response = axios.get(baseUrl)
  return response
}

export default { getUsers }
