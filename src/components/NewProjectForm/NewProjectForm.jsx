import { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap'
import projectService from '../../services/projects.services'
import categoryService from '../../services/category.services'
import uploadServices from '../../services/upload.services'
import { toast } from 'sonner'

const NewProjectForm = ({ setShowModal, loadProject }) => {

  const [loadingImage, setLoadingImage] = useState(false)
  const [category, setCategory] = useState()

  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    image: 'https://res.cloudinary.com/db6gxc2n0/image/upload/v1701775651/qsii7nqpzg16vyyg9n47.png',
    goal: null,
    endDate: '',
    category: '',
    isFeatured: false
  })

  const handleInputChange = ({ target }) => {
    const { name, type, checked, value } = target
    const data = type === 'checkbox' ? checked : value

    setProjectData({ ...projectData, [name]: data })
  }

  const handleProjectSubmit = e => {
    e.preventDefault()

    const errors = []

    if (projectData.title.length < 3) errors.push('Title must be at least 3 characters long')
    if (projectData.description.length < 3) errors.push('Description must be at least 3 characters long')
    if (projectData.goal < 1) errors.push('Goal must be at least 1')
    if (projectData.endDate.length < 1) errors.push('Date must be selected')
    if (projectData.endDate <= new Date().toISOString().slice(0, 10)) errors.push('Date must be in the future')
    if (projectData.category.length < 1) errors.push('Category must be selected')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    projectService
      .createProject(projectData)
      .then(() => {
        setShowModal(false)
        loadProject()
        toast.success('Project created')
      })
      .catch(err => console.log(err))
  }

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

  return (
    <div className='NewProjectForm'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={projectData.title} name='title' onChange={handleInputChange} placeholder='Title of the project' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={3} value={projectData.description} name='description' onChange={handleInputChange} placeholder='Description of the project' />
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
                  <InputGroup>
                    <span className='input-group-text'>€</span>
                    <input className='form-control' type='number' id='goal' name='goal' value={projectData.goal} onChange={handleInputChange} />
                  </InputGroup>
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

            <Form.Group className='mb-3' controlId='isFeatured'>
              <Form.Check className='mb-3' type='checkbox' label='Featured?' name='isFeatured' checked={projectData.isFeatured} onChange={handleInputChange} />
              <span className='text-muted'>*Featured projects will be shown on the home page</span>
            </Form.Group>

            <div className='text-center'>
              <Button className='mx-2' variant='dark' type='submit' disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Create project'}</Button>
              <Button className='mx-2' variant='dark' type='button' onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default NewProjectForm
