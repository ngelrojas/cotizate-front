import axios from 'axios' 

const URL_PROD = `http://127.0.0.1:8000/api/v1`
// const URL_PROD = `http://54.225.32.34:8000/api/v1`

export default axios.create({
    baseURL: URL_PROD 
})
