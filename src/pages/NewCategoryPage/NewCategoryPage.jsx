import { Container } from "react-bootstrap"
import NewCategoryForm from "../../components/NewCategoryForm/NewCategoryForm"

const NewCategoryPage = () => {

    return (
        <div className="NewProjectPage">
            <Container>
                <h1>New Category</h1>
                <hr />
                <NewCategoryForm />
            </Container>
        </div >
    )

}

export default NewCategoryPage