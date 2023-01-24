import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'



const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
const deletePerson_with_id = (id) => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response.data)

}

const update = (id, newObject) => {
    console.log(newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  


  export default { getAll, create, deletePerson_with_id,update }