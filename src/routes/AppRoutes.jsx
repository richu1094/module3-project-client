import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import NewProjectPage from '../pages/NewProjectPage/NewProjectPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LogInPage from '../pages/LogInPage/LogInPage'
import CategoryPage from '../pages/CategoryPage/CategotyPage'
import NewCategoryPage from '../pages/NewCategoryPage/NewCategoryPage'
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />}></Route>
            <Route path={"/discover"} element={<DiscoverPage />}></Route>

            <Route path={"/sign-up"} element={<SignUpPage />}></Route>
            <Route path={"/log-in"} element={<LogInPage />}></Route>

            <Route path={"/project/:id"} element={<ProjectDetailsPage />}></Route>
            {/* <Route path={"/project/create"} element={<NewProjectPage />}></Route> */}

            <Route path={"/category"} element={<CategoryPage />}></Route>
            {/* <Route path={"/category/create"} element={<NewCategoryPage />}></Route> */}

            //TO-DO: revisar protected route
            <Route element={<ProtectedRoute />}>
                <Route path={"/project/create"} element={<NewProjectPage />}></Route>
                <Route path={"/category/create"} element={<NewCategoryPage />}></Route>
            </Route>

            <Route path={"*"} element={<p>ERROR 404</p>}></Route>
        </Routes>
    )
}

export default AppRoutes