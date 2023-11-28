import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/indexPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage'
import NewProjectPage from '../pages/NewProjectPage/NewProjectPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LogInPage from '../pages/LogInPage/LogInPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />}></Route>
            <Route path={"/project/create"} element={<NewProjectPage />}></Route>
            <Route path={"/project/:id"} element={<ProjectDetailsPage />}></Route>
            <Route path={"/sign-up"} element={<SignUpPage />}></Route>
            <Route path={"/log-in"} element={<LogInPage />}></Route>
            {/* <Route path={"/log-out"} element={<SignUpPage />}></Route> */}

            <Route path={"*"} element={<p>ERROR 404</p>}></Route>
        </Routes>
    )
}

export default AppRoutes