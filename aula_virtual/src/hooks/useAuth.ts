import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'

const useAuth = (): AuthContextValue => {
  return useContext(AuthContext) as AuthContextValue
}

export default useAuth
