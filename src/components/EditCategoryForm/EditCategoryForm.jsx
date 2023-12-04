import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import categoryService from '../../services/category.services'

const EditCategoryForm = ({ setShowModal, loadCategory, eachCategory }) => {
  const [categoryData, setCategoryData] = useState({
    title: eachCategory.title,
    description: eachCategory.description
  })

  const handleInputChange = e => {
    const { value, name } = e.currentTarget
    setCategoryData({ ...categoryData, [name]: value })
  }

  const handleCategorySubmit = e => {
    e.preventDefault()
    categoryService
      .editCategory(eachCategory._id, categoryData)
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
          <Button variant='dark' type='submit'>Edit category</Button>
        </div>
      </Form>
    </div>
  )
}

export default EditCategoryForm
