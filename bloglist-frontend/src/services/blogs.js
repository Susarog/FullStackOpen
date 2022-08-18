import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    console.log(response.data[0].user)
    return response.data
  })
}

const create = async (obj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, obj, config)
  return response
} 

const update = async (id,obj) => {
  const request = await axios.put(`${baseUrl}/${id}`, obj)
  return request
}

export default { getAll, setToken, create, update }