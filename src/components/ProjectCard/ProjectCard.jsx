import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProjectCard = ({ eachProject }) => {
  {
    return (
      <Card className='text-center'>
        <Card.Header><h5>{eachProject.title}</h5></Card.Header>
        <Card.Body>
          <Card.Text>{eachProject.description}</Card.Text>
          <Link to={`/project/${eachProject._id}`} className='btn btn-dark'>Details</Link>
        </Card.Body>
        <Card.Footer className='text-muted'>{eachProject.createdAt.slice(0, 10)}</Card.Footer>
      </Card>
    )
  }
}

export default ProjectCard
