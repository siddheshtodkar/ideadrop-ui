import api from "@/lib/axios"

export const registerUser = async (credentials: { name: string, email: string, password: string }) => {
  try {
    const res = await api.post('/auth/register', credentials)
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to register'
    throw new Error(message)
  }
}

export const loginUser = async (credentials: { email: string, password: string }) => {
  try {
    const res = await api.post('/auth/login', credentials)
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to login'
    throw new Error(message)
  }
}

export const logoutUser = async () => {
  try {
    const res = await api.post('/auth/logout')
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to logout'
    throw new Error(message)
  }
}

export const refreshAccessToken = async () => {
  try {
    const res = await api.post('/auth/refresh')
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to refresh access token'
    throw new Error(message)
  }
}