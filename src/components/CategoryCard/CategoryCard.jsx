import { Button, Card } from 'react-bootstrap'
import categoryService from '../../services/category.services'
import { useState } from 'react'
import CategoryModalForm from '../CategoryModalForm/CategoryModalForm'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const CategoryCard = ({ eachCategory, loadCategory }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteCategory = () => {
    categoryService
      .deleteCategory(eachCategory._id)
      .then(() => loadCategory())
      .catch(err => console.log(err))
  }

  {
    return (
      <div className='CategoryCard'>
        <Card className='text-center my-4'>
          <Card.Body>
            <Card.Title>{eachCategory.title}</Card.Title>
            <Card.Text>
              {eachCategory.description}
            </Card.Text>
            <div>
              <Button className='mx-2' variant='dark' onClick={() => setShowModal(true)}>Editar <FaEdit /></Button>
              {eachCategory.title != "Uncategorized" && <Button className='mx-2' variant='danger' onClick={deleteCategory}>Borrar <MdDeleteOutline /></Button>}
            </div>
          </Card.Body>
        </Card>
        <CategoryModalForm showModal={showModal} setShowModal={setShowModal} loadCategory={loadCategory} type='Edit' eachCategory={eachCategory} />
      </div >
    )
  }
}

export default CategoryCard
