import { Button, Container } from 'react-bootstrap'
import CategoryList from '../../components/CategoryList/CategoryList'
import categoryService from '../../services/category.services'
import { useEffect, useState } from 'react'
import CategoryModalForm from '../../components/CategoryModalForm/CategoryModalForm'
import Loader from '../../components/Loader/Loader'
import { IoIosAddCircle } from "react-icons/io";

const CategoryPage = () => {
  const [category, setCategory] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => {
    categoryService
      .getCategories()
      .then(({ data }) => setCategory(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='NewCategoryPage my-4'>
      <Container>
        <div className='d-flex justify-content-end mb-3'>
          <Button className='btn btn-dark' onClick={() => setShowModal(true)}>Create Category <IoIosAddCircle /></Button>
        </div>
        {
          !category
            ? <Loader />
            : <CategoryList category={category} loadCategory={loadCategory} />
        }
        <CategoryModalForm showModal={showModal} setShowModal={setShowModal} loadCategory={loadCategory} type='Create' />
      </Container>
    </div>
  )
}

export default CategoryPage
