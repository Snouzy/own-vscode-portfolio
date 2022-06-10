/* eslint-disable max-len */
// @flow
import axios from 'axios'

/* ------ config authorization bearer ------ */
let authorizationBearer = null
export const setAuthorizationBearer = (ab) => {
  authorizationBearer = ab
}

/* ------ config base url ------ */
let baseURL = null
export const setBaseURL = (url) => {
  baseURL = url
}

/* ------ Request helper ------ */

function axiosRequest(
  method, url, params, headers, timeout
) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      timeout: timeout || 30000,
      ...params,
      headers: {
        'Content-type': 'application/json',
        'App-Client': 'WEB',
        ...headers
      }
    })
      .then(
        (payload) => {
          resolve(payload.data)
        },
        (payload) => {
          if (payload.response) {
            const { response } = payload
            if (response.status >= 400 && response.status < 500) {
              resolve(response.data)
            } else {
              reject(response)
            }
          } else {
            reject(payload)
          }
        }
      )
      .catch((e) => {
        throw e
      })
  })
}

/* ------ Prepare request ------ */

const prepareRequestSendToken = (params, headers) => {
  if (authorizationBearer && (params.sendToken === undefined || params.sendToken)) {
    return {
      ...headers,
      Authorization: `Bearer ${authorizationBearer}`
    }
  }
  return headers
}

/* ------ Request POST ------ */
export const axiosPost = (
  url, params = {}, timeout = null
) => {
  const reqParams = { data: params.data || {} }

  let headers = {}
  headers = prepareRequestSendToken(params, headers)
  return axiosRequest('POST', url, reqParams, headers, timeout)
}

/* ------ Request PUT ------ */
export const axiosPut = (
  url, params = {}, timeout = null
) => {
  const reqParams = { data: params.data || {} }
  let headers = {}
  headers = prepareRequestSendToken(params, headers)
  return axiosRequest('PUT', url, reqParams, headers, timeout)
}

/* ------ Request PATCH ------ */
export const axiosPatch = (
  url, params = {}, timeout = null
) => {
  const reqParams = { data: params.data || {} }
  let headers = {}
  headers = prepareRequestSendToken(params, headers)
  return axiosRequest('PATCH', url, reqParams, headers, timeout)
}

/* ------ Request GET ------ */
export const axiosGet = (
  url, params = {}, timeout = null
) => {
  const reqParams = { params: params.data || {} }
  let headers = {}
  headers = prepareRequestSendToken(params, headers)
  return axiosRequest('GET', url, reqParams, headers, timeout)
}

/* ------ Request DELETE ------ */
export const axiosDelete = (
  url, params = {}, timeout = null
) => {
  const reqParams = { params: params.data || {} }
  let headers = {}
  headers = prepareRequestSendToken(params, headers)
  return axiosRequest('DELETE', url, reqParams, headers, timeout)
}

/* ------ Request POST files ------ */
export const axiosPostFilesData = (
  url,
  params,
  timeout = 60000
) => {
  const reqParams = { data: params.data || {} }
  let headers = params.headers || {}
  headers = prepareRequestSendToken(params, headers)
  headers['Content-Type'] = 'multipart/form-data'
  return axiosRequest('POST', url, reqParams, headers, timeout, true)
}
