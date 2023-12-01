import axios from "axios"

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getUsers() {
        return this.api.get('/')
    }

    getMyProfile() {
        return this.api.get('/myprofile')
    }

    getOneUser(id) {
        return this.api.get(`/${id}`)
    }

    addFunds(funds) {
        return this.api.post('/addfunds', funds)
    }
}

const userService = new UserService()

export default userService
