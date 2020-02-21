import axios from 'axios'

// const URL_PROD = `http://127.0.0.1:8000/api/v1`
const URL_PROD = `http://3.87.72.66:8000/api/v1`

export default axios.create({
  baseURL: URL_PROD,
})
