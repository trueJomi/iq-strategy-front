import React from 'react'
import { auth } from '../services/AuthService'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = React.createContext<{ authState: boolean | undefined }>({ authState: undefined })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<boolean | undefined >(undefined)
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthState(Boolean(user))
    })
  }, [])

  return (
    <AuthContext.Provider
        value={{
          authState
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}
