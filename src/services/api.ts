import { destroyUserLocalStorage } from '@contexts/Authorization/utils'
import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://localhost:8080'
})

Api.interceptors.response.use(responseSuccess, responseError)

function responseSuccess (responseData: any) {
  return responseData
}

function responseError (responseData: any) {
  if (responseData.response.status === 401 && window.location.href.includes('/app')) {
    destroyUserLocalStorage()
    window.location.href = '/?code=401'
  }
  return responseData.response
}
