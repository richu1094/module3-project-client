import { Row, Col, ProgressBar } from "react-bootstrap"
import { Link } from "react-router-dom"


const ProjectDetails = ({ project }) => {
    return (
        <div>
            <div className="text-center">
                <h2 className="mb-4">Details of {project.title}</h2>
            </div>
            <Row>
                <Col className="col-md-6">
                    <img src={project.imageUrl} alt={project.title} className="img-fluid" />
                </Col>
                <Col className="col-md-6">
                    <ProgressBar now={50} label={`${50}%`} />
                    <p>{project.description}</p>
                    <p as={Link} to={`/profile/${project.owner._id}`}> Project owner: {project.owner.username}</p>
                    <p>Project created at: {project.createdAt.slice(0, 10)}</p>
                    <p>Finishing in : {project.endDate.slice(0, 10)}</p>

                    <Link to={`/project/${project._id}/edit`} className="btn btn-success">Edit</Link>
                </Col>
            </Row>

        </div>

    )
}

export default ProjectDetails