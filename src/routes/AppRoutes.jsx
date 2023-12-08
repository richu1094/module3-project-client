import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LogInPage from '../pages/LogInPage/LogInPage'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/community' element={<CommunityPage />} />

      <Route path='/discover' element={<DiscoverPage />} />
      <Route path='/project/:id' element={<ProjectDetailsPage />} />

      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/log-in' element={<LogInPage />} />

      <Route path='/project/undefined' element={<DiscoverPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/category' element={<CategoryPage />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
