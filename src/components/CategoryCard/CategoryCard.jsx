import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import categoryService from '../../services/category.services'

const CategoryCard = ({ eachCategory, refreshCategory }) => {

    const deleteCategory = () => {
        categoryService
            .deleteCategory(eachCategory._id)
            .then(() => refreshCategory())
            .catch(err => console.log(err))
    }

    {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{eachCategory.title}</Card.Title>
                    <Card.Text>
                        {eachCategory.description}
                    </Card.Text>
                    <Link to={`/category/${eachCategory._id}`} className='btn btn-dark'>Details</Link>
                    <Link to={`/category/${eachCategory._id}`} className='btn btn-dark'>Editar</Link>
                    <Link onClick={deleteCategory} className='btn btn-dark'>Borrar</Link>
                </Card.Body>
                {/* <Card.Footer className="text-muted">{eachCategory.createdAt}</Card.Footer> */}
            </Card>
        )
    }
}

export default CategoryCard