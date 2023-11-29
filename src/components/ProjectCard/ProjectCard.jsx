import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const ProjectCard = ({ eachProject }) => {
    {
        return (
            <Card className="text-center">
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>{eachProject.title}</Card.Title>
                    <Card.Text>
                        {eachProject.description}
                    </Card.Text>
                    <Link to={`/project/${eachProject._id}`} className='btn btn-dark'>Details</Link>
                </Card.Body>
                <Card.Footer className="text-muted">{eachProject.createdAt}</Card.Footer>
            </Card>
        )
    }
}

export default ProjectCard