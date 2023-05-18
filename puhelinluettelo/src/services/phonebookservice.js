import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newName => {
    const request = axios.post(baseUrl, newName)
    return request.then(response => response.data)
}

const update = (id, newName) => {
    const request = axios.put(`${baseUrl}/${id}`, newName)
    return request.then(response => response.data)
}

const deleteName = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data) 
}

export default { 
  getAll,
  create, 
  update,
  deleteName
}