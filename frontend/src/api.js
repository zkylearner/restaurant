import axios from 'axios'

var api = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://192.168.137.1:8080',
  baseURL: window.baseURL,
  // 携带证书
  withCredentials: true,
})

export default api
