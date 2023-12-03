import { Button, Container } from "react-bootstrap"
import CategoryList from "../../components/CategoryList/CategoryList"
import categoryService from "../../services/category.services"
import { useEffect, useState } from "react"
import CategoryModalForm from "../../components/CategoryModalForm/CategoryModalForm"
import Loader from "../../components/Loader/Loader"

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
        <div className="NewCategoryPage">
            <Container>
                <h1>Category</h1>
                <hr />
                <Button className="btn btn-dark" onClick={() => setShowModal(true)}>Create Category</Button>
                {
                    !category ?
                        <Loader /> :
                        <CategoryList category={category} loadCategory={loadCategory} />
                }

                <CategoryModalForm showModal={showModal} setShowModal={setShowModal} loadCategory={loadCategory} type={"Create"} />

            </Container>
        </div>
    )
}

export default CategoryPage