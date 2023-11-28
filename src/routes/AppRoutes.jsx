import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/indexPage'
const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />}></Route>
            <Route path={"/project/create"} element={<p>Crear</p>}></Route>

            <Route path={"*"} element={<p>ERROR 404</p>}></Route>
        </Routes>
    )
}

export default AppRoutes