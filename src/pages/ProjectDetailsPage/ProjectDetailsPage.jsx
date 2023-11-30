import { useEffect, useState } from "react"
import projectService from "../../services/projects.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import planService from "../../services/plan.services"
import PlanList from "../../components/PlanList/PlanList"

const ProjectDetailsPage = () => {
    const { id } = useParams()
    const [project, setProject] = useState()
    const [plans, setPlans] = useState()

    useEffect(() => {
        loadProject()
        loadPlan()
    }, [])

    const loadProject = () => {
        projectService
            .getOneProject(id)
            .then(({ data }) => setProject(data))
            .catch(err => console.log(err))
    }

    const loadPlan = () => {
        planService
            .getPlansByProject(id)
            .then(({ data }) => setPlans(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="ProjectDetailsPage">
            <Container>
                {!project ?
                    <Loader /> :
                    (
                        <div>
                            <h2 className="mb-4">Detalles de {project.title}</h2>
                            <hr />
                            <Row>
                                <Col md={{ span: 6, offset: 1 }}>
                                    <h3>Especificaciones</h3>
                                    <p>{project.description}</p>
                                    <hr />
                                    <Link to={`/project/${project._id}/plan`} className="btn btn-dark">Create Plan</Link>
                                    <Link to="/" className="btn btn-dark">Back</Link>
                                </Col>

                                <Col md={{ span: 4 }}>
                                    <img src={project.imageUrl} style={{ width: '100%' }} />
                                </Col>
                            </Row>
                        </div>

                    )
                }
                <hr />
                {!plans ?
                    <Loader /> :
                    (
                        <PlanList plans={plans} />
                    )
                }
            </Container>
        </div>
    )
}


export default ProjectDetailsPage