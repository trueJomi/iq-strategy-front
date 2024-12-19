import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Auth.hook'
import Loading from '../components/Loading'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState } = useContext(AuthContext)

  if (authState === undefined) {
    return <Loading/>
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
  if (authState === false) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
