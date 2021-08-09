import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL.slice(0, -1) + process.env.REACT_APP_PATH_NAME
})
export default instance