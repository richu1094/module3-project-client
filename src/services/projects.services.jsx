import axios from "axios"

class ProjectService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/projects`
        })
    }
    getProjects() {
        return this.api.get('/')
    }

    getOneProject(id) {
        return this.api.get(`/${id}`)
    }

    createProject(projectData) {
        return this.api.post('/', projectData)
    }
}

const projectService = new ProjectService()

export default projectService
