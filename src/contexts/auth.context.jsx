import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const [loggedUser, setLoggedUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const logout = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsAdmin(false)
        setIsLoading(false)
    }

    const authenticateUser = () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                    setIsAdmin(data.loggedUser.role === 'ADMIN')
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
        else {
            logout()
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout, isLoading, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }