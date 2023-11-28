import { Button, Card } from 'react-bootstrap'

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
                    <Button variant="primary">Details</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{eachProject.createdAt}</Card.Footer>
            </Card>
        )
    }
}

export default ProjectCard