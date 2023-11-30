import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projects.services"
import categoryService from "../../services/category.services";

const NewProjectForm = () => {

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        image: "",
        goal: 0,
        date: "",
        category: "",
        isFeatured: false
    })

    const handleInputChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setProjectData({ ...projectData, [name]: value })
    }

    const handleProjectSubmit = e => {

        e.preventDefault()

        projectService
            .createProject(projectData)
            .then(response => {
                console.log(response)
                return navigate("/discover")
            })
            .catch(err => console.log(err))
    }

    const [category, setCategory] = useState()

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
        <div className="NewProjectForm">
            <Form onSubmit={handleProjectSubmit}>
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
                                <option value="">Select a category</option>
                                {category && category.map((eachCategory, i) => <option key={i} value={eachCategory._id}>{eachCategory.title}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Check className="mb-3" type="checkbox" label="Featured?" name="isFeatured" checked={projectData.isFeatured} onChange={handleInputChange} />

                <div className="d-grid">
                    <Button variant="dark" type="submit">Create project</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewProjectForm