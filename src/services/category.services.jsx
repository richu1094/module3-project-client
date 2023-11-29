import axios from "axios"

class CategoryService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/category`
        })
    }
    getCategories() {
        return this.api.get('/')
    }

    getOneCategories(id) {
        return this.api.get(`/${id}`)
    }

    createCategory(categoryData) {
        return this.api.post('/create', categoryData)
    }

    deleteCategory(id) {
        return this.api.post(`/${id}/delete`)
    }
}

const categoryService = new CategoryService()

export default categoryService
