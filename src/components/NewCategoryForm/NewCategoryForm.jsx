import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import categoryService from "../../services/category.services";

const NewCategoryForm = () => {

    const navigate = useNavigate();
    //TO-DO: Falta proteger
    const { loggedUser } = useContext(AuthContext)

    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setCategoryData({ ...categoryData, [name]: value })
    }

    const handleCategorySubmit = e => {
        e.preventDefault()
        categoryService.
            createCategory(categoryData)
            .then(response => {
                console.log(response)
                return navigate("/category")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="NewCategoryForm">
            <Form onSubmit={handleCategorySubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={categoryData.title} name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={categoryData.description} name="description" onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Create category</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewCategoryForm