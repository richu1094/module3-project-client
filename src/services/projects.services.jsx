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
}

const projectService = new ProjectService()

export default projectService
