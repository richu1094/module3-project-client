import axios from "axios"

class ProjectService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/projects`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getProjects() {
        return this.api.get('/')
    }

    getFeaturedProjects() {
        return this.api.get('/featured')
    }

    getOneProject(id) {
        return this.api.get(`/${id}`)
    }

    createProject(projectData) {
        return this.api.post('/', projectData)
    }

    editProject(id, projectData) {
        return this.api.post(`/${id}`, projectData)
    }

    deleteProject(id) {
        return this.api.post(`/${id}/delete`)
    }
}

const projectService = new ProjectService()

export default projectService
