import { Button, Card } from 'react-bootstrap'
import categoryService from '../../services/category.services'
import { useState } from 'react'
import CategoryModalForm from '../CategoryModalForm/CategoryModalForm'

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
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>{eachCategory.title}</Card.Title>
                        <Card.Text>
                            {eachCategory.description}
                        </Card.Text>
                        <Button variant='dark' onClick={() => setShowModal(true)}>Editar</Button>
                        <Button variant='danger' onClick={deleteCategory}>Borrar</Button>
                    </Card.Body>
                </Card>
                <CategoryModalForm showModal={showModal} setShowModal={setShowModal} loadCategory={loadCategory} type={"Edit"} eachCategory={eachCategory} />
            </div>
        )
    }
}

export default CategoryCard