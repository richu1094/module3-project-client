import { Container } from "react-bootstrap"
import NewPlanForm from "../../components/NewPlanForm/NewPlanForm"

const NewPlanPage = () => {
    return (
        <div className="NewPlanPage">
            <Container>
                <h1>New Plan</h1>
                <hr />
                <NewPlanForm />
            </Container>
        </div >
    )
}

export default NewPlanPage