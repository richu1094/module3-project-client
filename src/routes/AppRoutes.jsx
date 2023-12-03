import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import NewProjectPage from '../pages/NewProjectPage/NewProjectPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LogInPage from '../pages/LogInPage/LogInPage'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />}></Route>
            <Route path={"/community"} element={<CommunityPage />}></Route>

            <Route path={"/discover"} element={<DiscoverPage />}></Route>
            <Route path={"/project/:id"} element={<ProjectDetailsPage />}></Route>

            <Route path={"/sign-up"} element={<SignUpPage />}></Route>
            <Route path={"/log-in"} element={<LogInPage />}></Route>

            <Route element={<ProtectedRoute />}>
                <Route path={"/profile/:id"} element={<ProfilePage />}></Route>
                <Route path={"/category"} element={<CategoryPage />}></Route>
                <Route path={"/project/create"} element={<NewProjectPage />}></Route>
            </Route>

            <Route path={"*"} element={<img src='https://i.emezeta.com/weblog/meme-la-cosa/cosa-no-pinta-nada-bien.jpg'></img>}></Route>
        </Routes>
    )
}

export default AppRoutes