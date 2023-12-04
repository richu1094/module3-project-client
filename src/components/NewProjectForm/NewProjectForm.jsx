import { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import projectService from '../../services/projects.services'
import categoryService from '../../services/category.services'
import uploadServices from '../../services/upload.services'
import { toast } from 'sonner'

const NewProjectForm = () => {
  const navigate = useNavigate()

  const [loadingImage, setLoadingImage] = useState(false)
  const [errors, setErrors] = useState([])

  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    image: '',
    goal: 0,
    endDate: '',
    category: '',
    isFeatured: false
  })

  const handleInputChange = e => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    setProjectData({ ...projectData, [name]: value })
  }

  const handleProjectSubmit = e => {
    e.preventDefault()

    const errors = []

    if (projectData.title.length < 3) errors.push('Title must be at least 3 characters long')
    if (projectData.description.length < 3) errors.push('Description must be at least 3 characters long')
    if (projectData.goal < 1) errors.push('Goal must be at least 1')
    if (projectData.endDate.length < 1) errors.push('Date must be selected')
    if (projectData.image.length < 1) errors.push('Image must be selected')
    if (projectData.category.length < 1) errors.push('Category must be selected')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    projectService
      .createProject(projectData)
      .then(() => navigate('/discover'))
      .catch(err => setErrors(err.response.data.errorMessages))
  }

  const [category, setCategory] = useState()

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => {
    categoryService
      .getCategories()
      .then(({ data }) => setCategory(data))
      .catch(err => console.log(err))
  }

  const handleFileUpload = e => {
    setLoadingImage(true)

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setProjectData({ ...projectData, image: res.data.cloudinary_url })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })
  }

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach(err => toast.error(err, 'error'))
    }
  }, [errors])

  return (
    <div className='NewProjectForm'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={projectData.title} name='title' onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={3} value={projectData.description} name='description' onChange={handleInputChange} />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type='file' onChange={handleFileUpload} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='goal'>
                  <Form.Label>Goal</Form.Label>
                  <Form.Control type='number' value={projectData.goal} name='goal' onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='date'>
                  <Form.Label>Limit Date</Form.Label>
                  <Form.Control type='date' value={projectData.endDate} name='endDate' onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className='mb-3' controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Select onChange={handleInputChange} name='category'>
                    <option value=''>Select a category</option>
                    {category && category.map((eachCategory, i) => <option key={i} value={eachCategory._id}>{eachCategory.title}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Check className='mb-3' type='checkbox' label='Featured?' name='isFeatured' checked={projectData.isFeatured} onChange={handleInputChange} />

            <div className='d-grid'>
              <Button variant='dark' type='submit' disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Create project'}</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default NewProjectForm
