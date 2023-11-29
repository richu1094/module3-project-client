import { Container } from "react-bootstrap"
import CategoryList from "../../components/CategoryList/CategoryList"
import categoryService from "../../services/category.services"
import { useEffect, useState } from "react"

const CategoryPage = () => {
    const [category, setCategory] = useState()

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        
        console.log("----------------")
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
                {
                    !category ?
                        <h1>Cargando</h1> :
                        <CategoryList category={category} refreshCategory={loadCategory} />
                }
            </Container>
        </div>
    )
}

export default CategoryPage