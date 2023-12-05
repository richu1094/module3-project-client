import { useState } from 'react'
import { Form, Button, Card, InputGroup } from 'react-bootstrap'
import planService from '../../services/plan.services'
import uploadServices from '../../services/upload.services'
import { toast } from 'sonner'

const NewPlanForm = ({ project, setShowAddPlanModal, loadPlan }) => {
  const [loadingImage, setLoadingImage] = useState(false)

  const [planData, setPlanData] = useState({
    title: '',
    description: '',
    image: 'https://res.cloudinary.com/db6gxc2n0/image/upload/v1701775651/qsii7nqpzg16vyyg9n47.png',
    content: '',
    price: 0,
    project: project._id,
    isRecommended: false
  })

  const handleInputChange = e => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    setPlanData({ ...planData, [name]: value })
  }

  const handlePlanSubmit = e => {
    e.preventDefault()

    const errors = []

    if (planData.title.length < 3) errors.push('Title must be at least 3 characters long')
    if (planData.description.length < 10) errors.push('Description must be at least 10 characters long')
    if (planData.content.length < 10) errors.push('Content must be at least 10 characters long')
    if (planData.price <= 0) errors.push('Price must be greater than 0')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }
    planService
      .createPlan(planData)
      .then(() => {
        toast.success('Plan created successfully')
        setShowAddPlanModal(false)
        loadPlan()
      })
      .catch(err => console.log(err))
  }

  const handleFileUpload = e => {
    setLoadingImage(true)

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setPlanData({ ...planData, image: res.data.cloudinary_url })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })
  }

  return (
    <div className='NewPlanForm'>
      <Card>
        <Card.Body>
          <Form onSubmit={handlePlanSubmit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={planData.title} name='title' onChange={handleInputChange} placeholder='Title of the plan' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={3} value={planData.description} name='description' onChange={handleInputChange} placeholder='Description of the plan' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <span class='input-group-text'>€</span>
                <Form.Control type='number' value={planData.price} name='price' onChange={handleInputChange} />
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3' controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' rows={3} value={planData.content} name='content' onChange={handleInputChange} placeholder='What will be included in this plan' />
            </Form.Group>

            <Form.Check className='mb-3' type='checkbox' label='Is Recommended?' name='isRecommended' checked={planData.isRecommended} onChange={handleInputChange} />

            <div className='d-flex justify-content-center'>
              <Button variant='dark' type='submit' disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Create Plan'}</Button>
              <Button variant='dark' onClick={() => setShowAddPlanModal(false)}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default NewPlanForm
