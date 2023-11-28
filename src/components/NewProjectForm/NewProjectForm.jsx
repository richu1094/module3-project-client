import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projects.services"
import { AuthContext } from "../../contexts/auth.context";

const NewProjectForm = () => {

    const navigate = useNavigate();
    const { loggedUser } = useContext(AuthContext)


    //TO-DO: Harcodeado de momento
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        owner: loggedUser._id,
        goal: 0
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setProjectData({ ...projectData, [name]: value })
    }

    const handleCoasterSubmit = e => {

        e.preventDefault()

        projectService
            .createProject(projectData)
            .then(response => {
                console.log(response)
                return navigate("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="NewCoasterForm">
            <Form onSubmit={handleCoasterSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={projectData.title} name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={projectData.description} name="description" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="goal">
                    <Form.Label>Goal</Form.Label>
                    <Form.Control type="number" value={projectData.goal} name="goal" onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Create project</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewProjectForm