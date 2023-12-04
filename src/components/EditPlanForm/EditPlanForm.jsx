import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import planService from '../../services/plan.services'
import uploadServices from '../../services/upload.services'

const EditPlanForm = ({ eachPlan, setShowEditPlanModal, loadPlan }) => {
  const [loadingImage, setLoadingImage] = useState(false)

  const [planData, setPlanData] = useState({
    title: eachPlan.title,
    description: eachPlan.description,
    image: eachPlan.image,
    content: eachPlan.content,
    price: eachPlan.price,
    isRecommended: eachPlan.isRecommended
  })

  const handleInputChange = e => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    setPlanData({ ...planData, [name]: value })
  }

  const handlePlanSubmit = e => {
    e.preventDefault()

    planService
      .editPlan(eachPlan._id, planData)
      .then(() => {
        setShowEditPlanModal(false)
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
              <Form.Control type='text' value={planData.title} name='title' onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={3} value={planData.description} name='description' onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' value={planData.price} name='price' onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' rows={3} value={planData.content} name='content' onChange={handleInputChange} />
            </Form.Group>

            <Form.Check className='mb-3' type='checkbox' label='Is Recommended?' name='isRecommended' checked={planData.isRecommended} onChange={handleInputChange} />

            <div className='d-flex justify-content-center'>
              <Button variant='dark' type='submit' disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Edit Plan'}</Button>
              <Button variant='dark' onClick={() => setShowEditPlanModal(false)}>Cancel</Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditPlanForm
