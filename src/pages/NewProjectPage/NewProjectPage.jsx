import { Container } from "react-bootstrap"
import NewProjectForm from "../../components/NewProjectForm/NewProjectForm"


const NewProjectPage = () => {

    return (
        <div className="NewProjectPage">
            <Container>
                <h1>Nuevo Proyecto</h1>
                <hr />
                <NewProjectForm />
            </Container>
        </div>
    )

}

export default NewProjectPage