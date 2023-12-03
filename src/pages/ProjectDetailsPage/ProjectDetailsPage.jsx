import { useEffect, useState } from "react"
import projectService from "../../services/projects.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import planService from "../../services/plan.services"
import PlanList from "../../components/PlanList/PlanList"
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails"

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
                    <ProjectDetails project={project} />
                }
                <hr />
                {!plans ?
                    <Loader /> :
                    <PlanList plans={plans} />
                }
            </Container>
        </div>
    )
}


export default ProjectDetailsPage