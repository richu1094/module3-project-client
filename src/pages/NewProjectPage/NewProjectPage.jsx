import { Container } from "react-bootstrap"
import NewProjectForm from "../../components/NewProjectForm/NewProjectForm"


const NewProjectPage = () => {

    return (
        <div className="NewProjectPage">
            <Container>
                <h2>Create a new project</h2>
                <hr />
                <NewProjectForm />
            </Container>
        </div>
    )

}

export default NewProjectPage