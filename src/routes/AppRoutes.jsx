import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import NewProjectPage from '../pages/NewProjectPage/NewProjectPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LogInPage from '../pages/LogInPage/LogInPage'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage'
import ProtectedRoute from './ProtectedRoute'
import DiscoverExtendedPage from '../pages/DiscoverExtendedPage/DiscoverExtendedPage'
import NewPlanPage from '../pages/NewPlanPage/NewPlanPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />}></Route>
            <Route path={"/community"} element={<CommunityPage />}></Route>

            <Route path={"/discover"} element={<DiscoverExtendedPage />}></Route>
            
            <Route path={"/sign-up"} element={<SignUpPage />}></Route>
            <Route path={"/log-in"} element={<LogInPage />}></Route>

            <Route path={"/project/:id"} element={<ProjectDetailsPage />}></Route>

            <Route element={<ProtectedRoute />}>
                <Route path={"/profile/:id"} element={<ProfilePage />}></Route>
                <Route path={"/category"} element={<CategoryPage />}></Route>
                <Route path={"/project/create"} element={<NewProjectPage />}></Route>
                <Route path={"/project/:id/plan"} element={<NewPlanPage />}></Route>
            </Route>

            <Route path={"*"} element={<p>ERROR 404</p>}></Route>
        </Routes>
    )
}

export default AppRoutes