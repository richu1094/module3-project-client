import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projects.services"

const NewProjectForm = () => {

    const navigate = useNavigate();

    //TO-DO: Harcodeado de momento
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        image: "",
        goal: 0,
        date: "",
        category: ""
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

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" value={projectData.image} name="image" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="goal">
                            <Form.Label>Goal</Form.Label>
                            <Form.Control type="number" value={projectData.goal} name="goal" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Limit Date</Form.Label>
                            <Form.Control type="date" value={projectData.date} name="date" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={handleInputChange} name="category">
                                <option value="Prueba">Prueba</option>
                                <option value="Prueba">Prueba</option>
                                <option value="Prueba">Prueba</option>
                                <option value="Prueba">Prueba</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Create project</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewProjectForm