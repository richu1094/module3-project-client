import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const [loggedUser, setLoggedUser] = useState(null)

    const authenticateUser = () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                })
                .catch(err => console.log(err))
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }