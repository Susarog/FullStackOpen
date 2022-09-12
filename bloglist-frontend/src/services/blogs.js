import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response
}

const create = async (obj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, obj, config)
  return response
}

const update = async (id,obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj)
  return response
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, setToken, create, update, deleteBlog }