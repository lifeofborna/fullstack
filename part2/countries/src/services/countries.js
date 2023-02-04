import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'



const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const get_with_name = (name) => {
    console.log(`https://restcountries.com/v3.1/name/${name}`)
    const request = axios.get((`https://restcountries.com/v3.1/name/${name}`))
    return request.then(response => response.data)
  }



  export default { getAll, get_with_name }