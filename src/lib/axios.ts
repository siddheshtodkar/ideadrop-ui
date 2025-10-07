import axios from "axios";
import { getAccessToken } from "./accessToken";

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(req => {
  let accessToken = getAccessToken()
  if (accessToken)
    req.headers.Authorization = `Bearer ${accessToken}`
  return req
})

export default api