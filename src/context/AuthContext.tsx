import { refreshAccessToken } from "@/api/auth"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
  accessToken: string | null,
  setAccessToken: (token: AuthContextType['accessToken']) => void,
  user: { id: string, email: string, name: string } | null,
  setUser: (user: AuthContextType['user']) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthContextType['user'] | null>(null)
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken, user } = await refreshAccessToken()
        setAccessToken(accessToken)
        setUser(user)
      } catch (error) {
        console.log(error)
      }
    }
    loadAuth()
  }, [])
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuth must be used within a provider')
  return context
}