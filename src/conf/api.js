import axios from 'axios'

const URL_DEV = `http://127.0.0.1:8000/api/v1`
const URL_PROD = `http://www.cotizate.com:8000/api/v1`

export default axios.create({
    baseURL: URL_DEV 
})
