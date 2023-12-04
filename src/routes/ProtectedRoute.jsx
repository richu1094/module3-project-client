import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'
import Loader from '../components/Loader/Loader'

const ProtectedRoute = () => {
  const { loggedUser, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }

  if (!loggedUser) {
    return <Navigate to='/log-in' />
  }
  return <Outlet />
}

export default ProtectedRoute
