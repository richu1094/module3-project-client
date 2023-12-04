import axios from 'axios'

class PlanService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/plan`
    })

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })
  }

  getPlan() {
    return this.api.get('/')
  }

  getPlansByProject(id) {
    return this.api.get(`/${id}/filter`)
  }

  getOnePlan(id) {
    return this.api.get(`/${id}`)
  }

  createPlan(planData) {
    return this.api.post('/', planData)
  }

  editPlan(id, planData) {
    return this.api.post(`/${id}/edit`, planData)
  }

  deletePlan(id) {
    return this.api.post(`/${id}/delete`)
  }
}

const planService = new PlanService()

export default planService
