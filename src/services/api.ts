import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://localhost:8080'
})

Api.interceptors.response.use(null, (error) => {
  if (error.response.status === 401 && window.location.href.includes('/app')) {
    window.location.href = '/?code=401'
  }
  return error.response
})
