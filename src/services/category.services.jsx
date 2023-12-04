import axios from 'axios'

class CategoryService {
  constructor () {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/category`
    })

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })
  }

  getCategories () {
    return this.api.get('/')
  }

  getOneCategories (id) {
    return this.api.get(`/${id}`)
  }

  createCategory (categoryData) {
    return this.api.post('/create', categoryData)
  }

  editCategory (id, categoryData) {
    return this.api.post(`/${id}/edit`, categoryData)
  }

  deleteCategory (id) {
    return this.api.post(`/${id}/delete`)
  }
}

const categoryService = new CategoryService()

export default categoryService
