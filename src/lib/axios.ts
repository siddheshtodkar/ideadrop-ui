import axios from "axios";
import { getAccessToken, setOldAcccessToken } from "./accessToken";
import { refreshAccessToken } from "@/api/auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
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

api.interceptors.response.use(res => res, async (errRes) => {
  const originalRequest = errRes.config
  if (errRes.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
    originalRequest._retry = true
    try {
      const { accessToken } = await refreshAccessToken()
      setOldAcccessToken(accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (error) {
      console.log(error);
    }
  }
  return Promise.reject(errRes)
})

export default api