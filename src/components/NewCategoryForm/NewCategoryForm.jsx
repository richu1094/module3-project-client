import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import categoryService from '../../services/category.services'
import { toast } from 'sonner'

const NewCategoryForm = ({ setShowModal, loadCategory }) => {
  const [categoryData, setCategoryData] = useState({
    title: '',
    description: ''
  })

  const handleInputChange = e => {
    const { value, name } = e.currentTarget
    setCategoryData({ ...categoryData, [name]: value })
  }

  const handleCategorySubmit = e => {
    e.preventDefault()

    const errors = []

    if (categoryData.title.length < 3) errors.push('Title must be at least 3 characters long')
    if (categoryData.description.length < 3) errors.push('Description must be at least 3 characters long')

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }
    
    categoryService
      .createCategory(categoryData)
      .then(() => {
        setShowModal(false)
        loadCategory()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='NewCategoryForm'>
      <Form onSubmit={handleCategorySubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={categoryData.title} name='title' onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' value={categoryData.description} name='description' onChange={handleInputChange} />
        </Form.Group>

        <div className='d-grid'>
          <Button variant='dark' type='submit'>Create category</Button>
        </div>
      </Form>
    </div>
  )
}

export default NewCategoryForm
