import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (obj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, obj, config)
  return response
} 

export default { getAll, setToken, create }