import { useEffect, useState } from "react"
import projectService from "../services/projects.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

const ProjectDetailsPage = () => {
    const { id } = useParams()
    const [project, setProject] = useState()

    useEffect(() => {
        loadProject()
    }, [])

    const loadProject = () => {
        projectService
            .getOneProject(id)
            .then(({ data }) => setProject(data))
            .catch(err => console.log(err))
    }

    return (

        !project ? <h1>Cargando...</h1> :
            (< Container >

                <h1 className="mb-4">Detalles de {project.title}</h1>
                <hr />

                <Row>

                    <Col md={{ span: 6, offset: 1 }}>
                        <h3>Especificaciones</h3>
                        <p>{project.description}</p>
                        <hr />
                        <Link to="/" className="btn btn-dark">Volver</Link>
                    </Col>

                    <Col md={{ span: 4 }}>
                        <img src={project.imageUrl} style={{ width: '100%' }} />
                    </Col>

                </Row>

            </Container >))
}

export default ProjectDetailsPage